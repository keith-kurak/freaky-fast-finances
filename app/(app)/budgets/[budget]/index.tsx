import { StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { Text, View } from "../../../../components/Themed";

export default function BudgetItemsList() {
  const { budget }: { budget: string } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: budget }} />
      <Text style={styles.title}>Put budget items here</Text>
      <Link href={`/budgets/${budget}/new`}>
        <Text>Add new item</Text>
      </Link>
    </View>
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
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
