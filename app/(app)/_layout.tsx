import { useState } from "react";
import { Stack, router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { View, LoadingShade } from "../../components/Themed";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  // useEffect executes after first render
  // onAuthStateChanged executes sometime after useEffect
  // So loading is an intermediate state until we can determine if we're logged in
  useEffect(() => {
    // this will listen for auth changes whenever the user is logged in
    // it will handle sign out but also a sudden sesssion expiration
    onAuthStateChanged(getAuth(), (user) => {
      setLoading(false);
      if (!user) {
        router.replace("/sign-in");
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <LoadingShade isLoading={true} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="add-budget"
        options={{ presentation: "modal", title: "Add New Budget" }}
      />
    </Stack>
  );
}
