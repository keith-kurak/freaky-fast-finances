import { StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View } from '../../../../components/Themed';

export default function NewBudgetTransaction() {
  const { budget } : { budget: string } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `New Transaction for ${budget}` }} />
      <Text style={styles.title}>Enter new transaction here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
