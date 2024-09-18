import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Routes } from "@/constants/Routes";
import useEvents, { filterEventsWithDate } from "@/hooks/useEvents";
import { router } from "expo-router";
import { useState } from "react";
import { ExpandableCalendar } from "react-native-calendars";
import { Card, AnimatedFAB, Appbar } from "react-native-paper";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { SheetManager } from "react-native-actions-sheet";

export default function EventsPage() {
  const { events } = useEvents();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);

  const selectedDateEvents = events.filter(filterEventsWithDate(selectedDate));

  const handleEventsScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsFABExpanded(currentScrollPosition <= 0);
  };

  return (
    <ThemedView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Events" />
        <Appbar.Action
          icon="account"
          onPress={() => router.push(Routes.profile)}
        />
      </Appbar.Header>
      <ExpandableCalendar
        date={selectedDate}
        onDayPress={(date) => {
          setSelectedDate(new Date(date.timestamp).toISOString());
        }}
        animateScroll
      />
      <ScrollView
        onScroll={handleEventsScroll}
        contentContainerStyle={styles.eventsScrollView}
      >
        {selectedDateEvents.length ? (
          selectedDateEvents.map(({ id, title, startTime }) => (
            <ThemedView key={id} style={styles.eventContainer}>
              <ThemedText style={styles.eventTitle}>{title}</ThemedText>
              <ThemedText style={styles.eventDate}>{startTime}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.noEventsContainer}>
            <ThemedText type="default">No events for selected date</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
      <AnimatedFAB
        icon="plus"
        style={styles.fab}
        color={Colors.light.background}
        extended={isFABExpanded}
        label={"New event"}
        animateFrom="right"
        elevation={5}
        onPress={() => {
          SheetManager.show("createEvent");
        }}
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
    zIndex: 99,
  },
  eventsScrollView: {
    flexGrow: 1,
    height: "100%",
  },
  eventContainer: {
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
  noEventsContainer: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
