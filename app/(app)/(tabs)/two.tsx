import { StyleSheet } from 'react-native';
import { View, RoundButton } from '../../../components/Themed';
import { signOut, getAuth } from "firebase/auth"

export default function TabTwoScreen() {
  function logout() {
    // the _layout listener will pick this up and handle the redirect
    signOut(getAuth())
    // this technically works, as well
    //router.replace("/sign-in")
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
