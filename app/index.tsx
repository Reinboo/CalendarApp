import { ImageBackground, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { useLayoutEffect } from "react";
import auth from "@react-native-firebase/auth";
import { router, useRootNavigationState } from "expo-router";
import { Routes } from "@/constants/Routes";
import { Text } from "react-native-paper";
import { t } from "@/constants/strings";

const WelcomeBackground = require("@/assets/images/background.png");

export default function WelcomePage() {
  const { button, title } = t.en.translation;
  const rootNavigationState = useRootNavigationState();

  useLayoutEffect(() => {
    const user = auth().currentUser;

    if (
      user !== null &&
      rootNavigationState?.routeNames?.includes(Routes.profile.substring(1))
    ) {
      router.replace(Routes.events);
    }
  }, [rootNavigationState]);

  const handlePressSignInSheet = async () => {
    SheetManager.show("authentication", { payload: { isRegistering: false } });
  };

  const handlePressRegisterSheet = () => {
    SheetManager.show("authentication", { payload: { isRegistering: true } });
  };

  return (
    <ImageBackground
      source={WelcomeBackground}
      resizeMode="cover"
      style={styles.background}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.titleText} variant="bodyMedium">
            {title.welcome}
          </Text>
        </ThemedView>
        <ThemedView style={styles.buttonsContainer}>
          <ThemedButton onPress={handlePressSignInSheet}>
            {button.signIn}
          </ThemedButton>
          <ThemedButton type="text" onPress={handlePressRegisterSheet}>
            {button.createAccount}
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {},
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 16,
  },
  titleContainer: {
    flex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 160,
  },
  titleText: {
    color: Colors.light.text,
    fontSize: 48,
    lineHeight: 52,
    fontFamily: "InterBold",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    gap: 5,
  },
});
