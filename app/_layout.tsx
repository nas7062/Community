import { AuthProvider } from "@/context/AuthContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import * as Notifications from "expo-notifications";
import { LogBox } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

const queryClient = new QueryClient();
export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  LogBox.ignoreAllLogs(false);
  return (
    <>
      <ActionSheetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="post" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen name="image" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ActionSheetProvider>
      <Toast />
    </>
  );
}
