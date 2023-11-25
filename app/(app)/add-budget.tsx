import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { useAddBudget } from "../../data";

import { View, RoundButton, InputItem, LoadingShade } from "../../components/Themed";

export default function ModalScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("0");
  const navigation = useNavigation();

  const { onAddBudget, loading } = useAddBudget({
    budgetName, budgetAmount, onAddBudgetComplete: () => {
      navigation.goBack();
    },
    onAddBudgetFailed: (error) => {
      Alert.alert(error.message)
    }
  });

  return (
    <View style={styles.container}>
      <InputItem
        value={budgetName}
        onChangeText={setBudgetName}
        label="Budget name"
        textInputProps={{ autoFocus: true }}
      />
      <InputItem
        value={budgetAmount}
        onChangeText={setBudgetAmount}
        label="Starting amount"
      />
      <RoundButton
        style={styles.button}
        onPress={onAddBudget}
        title="Add Budget"
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
});
