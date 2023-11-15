import { Stack, Redirect } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  // just manually toggling login for now
  // We could use context provider to do this for real
  // But firebase might make this easier, so why worry about it now?
  const session = true;

  if (!session) {
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
