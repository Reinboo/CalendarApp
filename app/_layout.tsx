import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Inter_900Black,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@react-native-firebase/app";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/hooks/useUser";
import { registerSheet, SheetProvider } from "react-native-actions-sheet";
import Authentication from "@/components/Authentication";
import { useFonts } from "expo-font";
import EditProfile from "@/components/profile/EditProfile";
import ChangePassword from "@/components/profile/ChangePassword";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

registerSheet("authentication", Authentication, "global");
registerSheet("editProfile", EditProfile, "global");
registerSheet("changePassword", ChangePassword, "global");

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    InterBolder: Inter_900Black,
    InterBold: Inter_600SemiBold,
    Inter: Inter_400Regular,
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
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SheetProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="events" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SheetProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
