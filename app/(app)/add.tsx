import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { useNavigation } from "expo-router";

import { View, TextInput, RoundButton } from "../../components/Themed";

export default function ModalScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("0");
  const navigation = useNavigation();

  const onPressAddBudget = async () => {
    await addDoc(collection(getFirestore(), "users/testuser/budgets"), {
      name: budgetName,
      amount: budgetAmount,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={budgetName}
        onChangeText={setBudgetName}
        placeholder="Budget name"
        style={styles.textInput}
      />
      <TextInput
        value={budgetAmount}
        onChangeText={setBudgetAmount}
        placeholder="Starting amount"
        style={styles.textInput}
      />
      <RoundButton
        style={styles.button}
        onPress={onPressAddBudget}
        title="Add Budget"
      />
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
  textInput: {
    marginVertical: 10,
    width: 200,
  },
  button: {
    marginTop: 10,
  },
});
