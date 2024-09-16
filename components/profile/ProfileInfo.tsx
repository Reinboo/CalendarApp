import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

interface ProfileInfoProps {
  label: string;
  text: string;
  icon: ReactNode;
}

export default function ProfileInfo({ label, text, icon }: ProfileInfoProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.iconContainer}>{icon}</ThemedView>
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText style={styles.text}>{text}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 32,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  label: {
    color: Colors.light.subText,
    fontFamily: "InterBold",
    fontSize: 16,
  },
  text: {
    color: Colors.light.text,
    fontSize: 20,
  },
});
