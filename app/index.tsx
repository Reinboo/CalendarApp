import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";

export default function WelcomePage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>Welcome</ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonsContainer}>
        <ThemedButton text="Sign in" />
        <ThemedButton text="Create an account" type="subtitle" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  },
  titleText: {
    color: Colors.light.text,
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "bold",
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
