import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { ThemedView } from "../ThemedView";
import { Text } from "react-native-paper";
import { ThemedTextInput } from "../ThemedTextInput";
import ThemedDateTimeField from "../ThemedDateTimeField";
import { ThemedButton } from "../ThemedButton";
import useEvents, { EventData, FirebaseEventData } from "@/hooks/useEvents";
import { useSnackbar } from "@/hooks/useSnackbar";
import { t } from "@/constants/strings";

interface EventDetailsProps {
  onSubmit: (eventData: EventData) => void;
  eventData: FirebaseEventData | null;
}

export default function EventDetails({
  onSubmit,
  eventData,
}: EventDetailsProps) {
  const { title, label, button, message } = t.en.translation;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { createEvent, updateEvent, deleteEvent, isLoading, error } =
    useEvents();
  const { showSnackbar } = useSnackbar();

  const isEditing = !!eventData;
  const defaultDate = isEditing
    ? new Date(eventData?.startDateTime)
    : new Date();

  const [eventTitle, setEventTitle] = useState<string>(eventData?.title || "");
  const [startDateTime, setStartDateTime] = useState<Date>(defaultDate);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);

  useEffect(() => {
    if (error?.message) showSnackbar(error?.message);
  }, [error, showSnackbar]);

  const cleanUp = () => {
    setEventTitle("");
    setStartDateTime(defaultDate);
    setIsTitleError(false);
  };

  const handleSubmitEvent = async () => {
    try {
      if (!eventTitle) {
        setIsTitleError(true);
        throw new Error(message.titleEmpty);
      }

      // TODO: Handle errors
      if (!createEvent || !updateEvent) return;

      if (isEditing && eventData) {
        await updateEvent(eventData.id, { title: eventTitle, startDateTime });
      } else {
        await createEvent({ title: eventTitle, startDateTime });
      }

      onSubmit({ title: eventTitle, startDateTime });
      showSnackbar(
        isEditing ? message.eventUpdateSuccess : message.eventCreateSuccess
      );
      actionSheetRef.current?.hide();
    } catch (error: any) {
      showSnackbar(error.message);
    } finally {
      cleanUp();
    }
  };

  const handleChangeTitle = (eventTitle: string) => {
    setIsTitleError(false);
    setEventTitle(eventTitle);
  };

  const handleDeleteEvent = async () => {
    try {
      if (!deleteEvent || !eventData) return;

      await deleteEvent(eventData?.id);

      onSubmit({ title: eventTitle, startDateTime });
    } catch (error: any) {
      showSnackbar(error.message);
    } finally {
      cleanUp();
    }
  };

  return (
    <ThemedView style={styles.sheetContainer}>
      <ThemedView style={styles.titleContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          {isEditing ? title.updateEvent : title.createEvent}
        </Text>
      </ThemedView>
      <ThemedView style={styles.eventInfoContainer}>
        <ThemedTextInput
          label={label.title}
          placeholder={label.title}
          onChangeText={handleChangeTitle}
          value={eventTitle}
          error={isTitleError}
        />
        <ThemedDateTimeField
          value={startDateTime}
          label={label.date}
          onChange={setStartDateTime}
          mode="date"
        />
        <ThemedDateTimeField
          value={startDateTime}
          label={label.time}
          onChange={setStartDateTime}
          mode="time"
        />
      </ThemedView>
      <ThemedButton onPress={handleSubmitEvent} loading={isLoading}>
        {isEditing ? button.update : button.create}
      </ThemedButton>
      <ThemedButton type="link" onPress={handleDeleteEvent} loading={isLoading}>
        {button.deleteEvent}
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: "80%",
    padding: 16,
    gap: 6,
    backgroundColor: "white",
    borderRadius: 16,
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    fontFamily: "InterBold",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    paddingVertical: 24,
  },
  eventInfoContainer: {
    gap: 12,
    paddingBottom: 12,
    marginBottom: 12,
  },
});
