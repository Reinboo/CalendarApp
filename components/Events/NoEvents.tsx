import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";
import { t } from "@/constants/strings";

export default function NoEvents() {
  const { label } = t.en.translation;

  return (
    <ThemedView style={styles.noEventsContainer}>
      <ThemedText type="default">{label.noEvents}</ThemedText>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  noEventsContainer: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
