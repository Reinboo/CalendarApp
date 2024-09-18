import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ThemedView } from "../ThemedView";
import { Text } from "react-native-paper";
import { ThemedTextInput } from "../ThemedTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ThemedDateTimeField from "../ThemedDateTimeField";
import { ThemedButton } from "../ThemedButton";
import useEvents from "@/hooks/useEvents";

export default function CreateEvent() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { createEvent } = useEvents();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());

  return (
    <ActionSheet
      headerAlwaysVisible
      containerStyle={styles.sheetContainer}
      ref={actionSheetRef}
      isModal={false}
      useBottomSafeAreaPadding
    >
      <ThemedView>
        <Text variant="titleLarge">Add new event</Text>
      </ThemedView>
      <ThemedView>
        <ThemedTextInput label="Title" />
        <ThemedDateTimeField
          value={startDate}
          label={"Date"}
          onChange={setStartDate}
        />
        <ThemedDateTimeField
          value={startTime}
          label={"Time"}
          onChange={setStartTime}
        />
      </ThemedView>
      <ThemedButton
        onPress={() => createEvent({ title, startTime, startDate })}
      >
        Create
      </ThemedButton>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: "60%",
    paddingHorizontal: 16,
  },
});
