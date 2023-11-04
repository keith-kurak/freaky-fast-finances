import { StyleSheet, FlatList, Pressable } from "react-native";
import { Text, View, useTheme } from "../../../components/Themed";
import { Link } from "expo-router";

const mockBudgets = ["Groceries", "Restaurants", "Household", "Fun", "Gas"];

const Budget = ({ name }: { name: string }) => (
  <Link href={`/budgets/${name}`} asChild>
    <Pressable>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          height: 50,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.title}>{name}</Text>
      </View>
    </Pressable>
  </Link>
);

export default function BudgetsTab() {
  const { text } = useTheme();
  return (
    <FlatList
      data={mockBudgets}
      renderItem={({ item }) => <Budget name={item} />}
      keyExtractor={(item) => item}
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
