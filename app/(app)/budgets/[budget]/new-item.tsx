import { StyleSheet, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, Stack, useNavigation } from "expo-router";
import { View, RoundButton, InputItem, LoadingShade } from "../../../../components/Themed";
import { useState } from "react";
import {
  getFirestore,
  collection,
  serverTimestamp,
  runTransaction,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function NewBudgetTransaction() {
  const { budget }: { budget: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0");
  const [sign, setSign] = useState("-");

  const navigation = useNavigation();

  const onPressAddBudget = async () => {
    // transaction so we can update total on budget and add the line item at the same time
    // summing all the lines could be an option, but then it's more difficult to get the
    // nice total on the budgets screen.
    try {
      setLoading(true);
      const db = getFirestore();
      await runTransaction(getFirestore(), async (transaction) => {
        const budgetRef = doc(
          db,
          `users/${getAuth().currentUser?.uid}/budgets/${budget}`
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
              `users/${getAuth().currentUser?.uid}/budgets/${budget}/items`
            )
          );
          transaction.set(newItemRef, {
            description,
            amount: amountToAdd,
            date: serverTimestamp(),
          });
        }
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error adding item!");
    } finally {
      setLoading(false);
    }
  };

  const onToggleExpenseOrIncome = () => {
    if (sign === "-") {
      setSign("+");
    } else {
      setSign("-");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Transaction" }} />
      <InputItem
        value={new Date().toLocaleDateString()}
        label="Date"
        textInputProps={{ editable: false }}
      />
      <InputItem
        value={description}
        onChangeText={setDescription}
        label="Description"
        textInputProps={{ autoFocus: true }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <InputItem
          containerStyle={{ flex: 1 }}
          value={amount}
          onChangeText={setAmount}
          label="Amount"
        />
        <RoundButton
          style={[
            styles.plusMinusButton,
            { backgroundColor: sign === "-" ? "red" : "green" },
          ]}
          title={sign}
          onPress={onToggleExpenseOrIncome}
        />
      </View>
      <RoundButton
        style={styles.button}
        onPress={onPressAddBudget}
        title="Add Transaction"
      />
      <LoadingShade isLoading={loading} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginTop: 10,
  },
  plusMinusButton: {
    marginVertical: 10,
    height: 37,
    width: 37,
    paddingHorizontal: 0,
    marginRight: 20,
  },
});
