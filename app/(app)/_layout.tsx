import { Stack, Redirect } from "expo-router";
import { getAuth } from "firebase/auth"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {

  if (!getAuth().currentUser) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="add-budget" options={{ presentation: "modal", title: "Add New Budget" }} />
    </Stack>
  );
}
