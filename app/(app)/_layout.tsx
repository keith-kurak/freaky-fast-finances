import { Stack, Redirect, router } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  if (!getAuth().currentUser) {
    return <Redirect href="/sign-in" />;
  }

  useEffect(() => {
    // this will listen for auth changes whenever the user is logged in
    // it will handle sign out but also a sudden sesssion expiration
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        router.replace("/sign-in");
      }
    });
  }, []);

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
