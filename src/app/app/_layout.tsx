import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import { Provider as PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="index"
                options={{
                  title: "Feed",
                }}
              />
              <Stack.Screen
                name="post/[slug]"
                options={{
                  title: "Post",
                  headerBackButtonMenuEnabled: true,
                }}
              />
              <Stack.Screen
                name="comments/[slug]"
                options={{
                  title: "Comentários",
                }}
              />
              <Stack.Screen
                name="login"
                options={{
                  title: "Login",
                }}
              />
              <Stack.Screen
                name="registerUser"
                options={{
                  title: "Cadastrar-se",
                }}
              />
              <Stack.Screen
                name="registerInstitution"
                options={{
                  title: "Cadastrar-se (Instituição)",
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
