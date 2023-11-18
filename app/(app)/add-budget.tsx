import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import slugify from "slugify";
import { useNavigation } from "expo-router";

import { View, RoundButton, InputItem } from "../../components/Themed";

export default function ModalScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("0");
  const navigation = useNavigation();

  const onPressAddBudget = async () => {
    // simple set document
    // but use a predefined ID based on slugified name so we have pretty URL's
    await setDoc(
      doc(
        getFirestore(),
        `users/${getAuth().currentUser?.uid}/budgets`,
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
  button: {
    marginTop: 10,
  },
});
