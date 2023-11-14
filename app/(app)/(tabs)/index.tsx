import { StyleSheet, FlatList, Pressable } from "react-native";
import { Text, View, useTheme } from "../../../components/Themed";
import { Link } from "expo-router";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Budget = ({ name, amount }: { name: string; amount: number }) => (
  <Link href={`/budgets/${name}`} asChild>
    <Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{amount}</Text>
      </View>
    </Pressable>
  </Link>
);

export default function BudgetsTab() {
  const { text } = useTheme();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const budgetsCollection = query(
      collection(db, `users/testuser/budgets`),
      orderBy("name")
    );
    const unsubscribe = onSnapshot(budgetsCollection, (snapshot) => {
      const budgets: any = [];
      snapshot.forEach((s) => {
        budgets.push(s.data());
      });
      setBudgets(budgets);
    });
    return unsubscribe;
  }, []);

  return (
    <FlatList
      data={budgets}
      renderItem={({ item }: { item: any }) => (
        <Budget name={item.name} amount={item.amount} />
      )}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={() => (
        <View style={[styles.separator, { backgroundColor: text }]} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
  },
});
