import { useEffect, useState, useCallback } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import slugify from "slugify";

let username;

export function setUsername(myUsername: string) {
  username = myUsername;
}

export function useBudgets() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // load the budgets, pretty straightforward
    const db = getFirestore();
    const budgetsCollection = query(
      collection(db, `users/${username!}/budgets`),
      orderBy("name")
    );
    const unsubscribe = onSnapshot(budgetsCollection, (snapshot) => {
      const budgets: any = [];
      snapshot.forEach((s) => {
        budgets.push({ id: s.id, ...s.data() });
      });
      setBudgets(budgets);
    });
    return unsubscribe;
  }, []);

  return { budgets };
}

export function useBudget(budget: string) {
  const [budgetItems, setBudgetItems] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState({ amount: 0, name: budget });

  useEffect(() => {
    const db = getFirestore();
    // load the running total and name from the budget
    const budgetDoc = doc(
      db,
      `users/${username!}/budgets/${budget}`
    );
    const unsubscribeFromDoc = onSnapshot(budgetDoc, (snapshot: any) => {
      setBudgetInfo(snapshot.data());
    });
    // load the budget lines
    // might be a case for using an array on the budget document so we can load it all at once.
    // Probably depends on how long the list would get.
    const budgetItems = query(collection(budgetDoc, "items"), orderBy("date"));
    const unsubscribeFromItems = onSnapshot(budgetItems, (snapshot) => {
      const items: any = [];
      snapshot.forEach((s) => {
        items.push({ id: s.id, ...s.data() });
      });
      setBudgetItems(items);
    });
    return () => {
      unsubscribeFromDoc();
      unsubscribeFromItems();
    };
  }, []);

  return { budgetItems, budgetInfo };
}

export function useAddBudget({
  budgetName,
  budgetAmount,
  onAddBudgetComplete,
  onAddBudgetFailed,
}: {
  budgetName: string;
  budgetAmount: string;
  onAddBudgetComplete: () => void;
  onAddBudgetFailed: (error: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const onAddBudget = useCallback(() => {
    (async function doAsync() {
      try {
        setLoading(true);
        if (Number.isNaN(budgetAmount)) throw new Error("Not a number!");

        await setDoc(
          doc(
            getFirestore(),
            `users/${username!}/budgets`,
            slugify(budgetName, { lower: true })
          ),
          {
            name: budgetName,
            amount: Number(budgetAmount),
          }
        );
        onAddBudgetComplete();
      } catch (error: any) {
        onAddBudgetFailed(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [budgetName, budgetAmount, onAddBudgetComplete, onAddBudgetFailed]);

  return { loading, onAddBudget };
}

export function useAddBudgetItem({
  budget,
  amount,
  description,
  sign,
  onAddBudgetItemComplete,
  onAddBudgetItemFailed,
}: {
  budget: string;
  description: string;
  amount: string;
  sign: string;
  onAddBudgetItemComplete: () => void;
  onAddBudgetItemFailed: (error: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const onAddBudgetItem = useCallback(() => {
    (async function doAsync() {
      // transaction so we can update total on budget and add the line item at the same time
      // summing all the lines could be an option, but then it's more difficult to get the
      // nice total on the budgets screen.
      try {
        setLoading(true);

        if (Number.isNaN(amount)) throw new Error("Not a number!");

        const db = getFirestore();
        await runTransaction(getFirestore(), async (transaction) => {
          const budgetRef = doc(
            db,
            `users/${username!}/budgets/${budget}`
          );
          const budgetDoc = await transaction.get(budgetRef);
          if (budgetDoc.exists()) {
            // update budget total
            const amountToAdd =
              sign === "-" ? -1 * Number(amount) : Number(amount);
            const newAmount = Number(budgetDoc.data().amount) + amountToAdd;
            transaction.update(budgetRef, { amount: newAmount });
            // add new budget line
            const newItemRef = doc(
              collection(
                db,
                `users/${username!}/budgets/${budget}/items`
              )
            );
            transaction.set(newItemRef, {
              description,
              amount: amountToAdd,
              date: serverTimestamp(),
            });
          }
        });
        onAddBudgetItemComplete();
      } catch (error: any) {
        onAddBudgetItemFailed(error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [ budget, amount, description, sign, onAddBudgetItemComplete, onAddBudgetItemFailed]);

  return { loading, onAddBudgetItem };
}
