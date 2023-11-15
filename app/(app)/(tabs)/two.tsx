import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Text, View, RoundButton } from '../../../components/Themed';
import { signOut, getAuth } from "firebase/auth"

export default function TabTwoScreen() {
  function logout() {
    signOut(getAuth())
    router.replace("/sign-in")
  }

  return (
    <View style={styles.container}>
      <RoundButton onPress={logout} title="Logout" />
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
