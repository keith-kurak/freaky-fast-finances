import { StyleSheet, Pressable } from "react-native";
import { Text, View, FlatList, useTheme } from "../../../components/Themed";
import { Link } from "expo-router";
import { useBudgets } from "../../../data";
import { formatUSDollar } from '../../../util/format';

const Budget = ({
  id,
  name,
  amount,
}: {
  id: string;
  name: string;
  amount: string;
}) => (
  <Link href={`/budgets/${id}`} asChild>
    <Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
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

  const { budgets } = useBudgets();

  return (
    <FlatList
      data={budgets}
      renderItem={({ item }: { item: any }) => (
        <Budget id={item.id} name={item.name} amount={formatUSDollar(item.amount)} />
      )}
      keyExtractor={(item) => item.id}
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
