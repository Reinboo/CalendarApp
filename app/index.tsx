import { ImageBackground, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { useLayoutEffect } from "react";
import auth from "@react-native-firebase/auth";
import { router, useRootNavigationState } from "expo-router";
import { Routes } from "@/constants/Routes";

const WelcomeBackground = require("@/assets/images/background.png");

export default function WelcomePage() {
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
          <ThemedText style={styles.titleText}>Welcome</ThemedText>
        </ThemedView>
        <ThemedView style={styles.buttonsContainer}>
          <ThemedButton text="Sign in" onPress={handlePressSignInSheet} />
          <ThemedButton
            text="Create an account"
            type="subtitle"
            onPress={handlePressRegisterSheet}
          />
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
