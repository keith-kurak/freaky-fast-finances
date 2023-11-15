import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import slugify from "slugify";
import { useNavigation } from "expo-router";

import { View, TextInput, RoundButton } from "../../components/Themed";

export default function ModalScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("0");
  const navigation = useNavigation();

  const onPressAddBudget = async () => {
    await setDoc(
      doc(
        getFirestore(),
        "users/testuser/budgets",
        slugify(budgetName, { lower: true })
      ),
      {
        name: budgetName,
        amount: budgetAmount,
      }
    );
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
    width: '90%',
  },
  button: {
    marginTop: 10,
  },
});
