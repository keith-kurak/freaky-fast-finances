import { StyleSheet, FlatList, Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Text, View, useTheme } from "../../../../components/Themed";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Colors from "../../../../constants/Colors";

function BudgetItem({
  item,
}: {
  item: { id: string; description: string; date: Timestamp; amount: number };
}) {
  const { description, date, amount } = item;

  const myDate = date ? date.toDate() : new Date();
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ textAlign: "right", marginTop: 4 }}>
          {myDate.toLocaleDateString().slice(0, -5)}
        </Text>
        <Text style={styles.title}>{description}</Text>
        <Text
          style={[styles.title, { color: amount >= 0 ? "green" : "red" }]}
        >{`${amount >= 0 ? "+" : "-"}$${Math.abs(amount)}`}</Text>
      </View>
    </View>
  );
}

export default function BudgetItemsList() {
  const { budget }: { budget: string } = useLocalSearchParams();
  const { text } = useTheme();
  const [budgetItems, setBudgetItems] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState({ amount: 0, name: budget });

  const colorScheme = useColorScheme();

  useEffect(() => {
    const db = getFirestore();
    const budgetDoc = doc(db, `users/testuser/budgets/${budget}`);
    const unsubscribeFromDoc = onSnapshot(budgetDoc, (snapshot: any) => {
      setBudgetInfo(snapshot.data());
    });
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

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: budgetInfo.name,
          headerRight: () => (
            <Link href={`/budgets/${budget}/new`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <FlatList
        data={budgetItems}
        renderItem={({ item }: { item: any }) => <BudgetItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: text }]} />
        )}
        ListHeaderComponent={
          <View
            style={{
              marginHorizontal: 20,
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={styles.subheading}>Balance</Text>
            <Text style={styles.amount}>${budgetInfo.amount}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 3,
    height: 1,
    marginHorizontal: 20,
  },
});
