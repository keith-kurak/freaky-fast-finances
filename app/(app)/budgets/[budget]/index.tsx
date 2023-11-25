import { StyleSheet, Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Text, View, FlatList, useTheme } from "../../../../components/Themed";
import {
  Timestamp,
} from "firebase/firestore";
import Colors from "../../../../constants/Colors";
import { formatUSDollar } from '../../../../util/format'
import { useBudget } from "../../../../data";

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
        >{formatUSDollar(amount)}</Text>
      </View>
    </View>
  );
}

export default function BudgetItemsList() {
  const { budget }: { budget: string } = useLocalSearchParams();
  const { text } = useTheme();

  const colorScheme = useColorScheme();

  const { budgetItems, budgetInfo } = useBudget(budget);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: budgetInfo.name,
          headerRight: () => (
            <Link href={`/budgets/${budget}/new-item`} asChild>
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
            <Text style={styles.amount}>{formatUSDollar(budgetInfo.amount)}</Text>
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
