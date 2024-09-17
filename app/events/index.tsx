import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Routes } from "@/constants/Routes";
import { filterEventsWithDate, getHoursRange } from "@/helpers/dateUtils";
import useEvents from "@/hooks/useEvents";
import { router } from "expo-router";
import { useState } from "react";
import { ExpandableCalendar } from "react-native-calendars";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function EventsPage() {
  const { createEvent, events } = useEvents();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );

  const selectedDateEvents = events.filter(filterEventsWithDate(selectedDate));

  return (
    <ThemedView style={styles.container}>
      <ExpandableCalendar
        date={selectedDate}
        onDayPress={(date) => {
          setSelectedDate(new Date(date.timestamp).toISOString());
        }}
        animateScroll
      />
      {selectedDateEvents.length ? (
        selectedDateEvents.map(({ id, title, startDateTime, endDateTime }) => (
          <ThemedView key={id} style={styles.eventContainer}>
            <ThemedText style={styles.eventTitle}>{title}</ThemedText>
            <ThemedText style={styles.eventDate}>
              {getHoursRange(startDateTime, endDateTime)}
            </ThemedText>
          </ThemedView>
        ))
      ) : (
        <ThemedText>No events. Press '+' button to add new</ThemedText>
      )}
      <FAB icon="plus" style={styles.fab} color={Colors.light.background} />
      <ThemedButton
        onPress={() => router.push(Routes.profile)}
        text="Profile"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.text,
  },
  eventContainer: {
    height: 100,
    backgroundColor: "white",
    borderLeftWidth: 3,
    borderLeftColor: "darkgrey",
    padding: 12,
    marginVertical: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: "InterBold",
  },
  eventDate: {
    color: "darkgrey",
  },
});
