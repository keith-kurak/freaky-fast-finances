import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  RoundButton,
  InputItem,
  LoadingShade,
  Text,
} from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import slugify from "slugify";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onPressLogin() {
    setIsLoading(true);
    //const auth = getAuth()
    try {
      await AsyncStorage.setItem("username", slugify(email));
      //await signInWithEmailAndPassword(auth, email, password)
      setSession(true);
    } catch (e) {
      console.error(e);
      Alert.alert("Error logging in");
    } finally {
      setIsLoading(false);
    }
  }

  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        Not a real login, just put in whatever!
      </Text>
      <InputItem
        value={email}
        onChangeText={setEmail}
        label="Username"
        textInputProps={{ autoFocus: true, autoCapitalize: "none" }}
      />
      <InputItem
        value={password}
        onChangeText={setPassword}
        label="Password"
        textInputProps={{ secureTextEntry: true, editable: false }}
      />
      <RoundButton style={styles.button} onPress={onPressLogin} title="Login" />
      <LoadingShade isLoading={isLoading} />
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
  button: {
    marginTop: 10,
  },
});
