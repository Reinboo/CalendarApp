import useEvents, {
  filterEventsWithDate,
  FirebaseEventData,
} from "@/hooks/useEvents";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import EventsListItem from "./EventsListItem";
import NoEvents from "./NoEvents";

interface EventsListProps {
  onEventsScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onEdit: (event: FirebaseEventData) => void;
  date: string;
}

export default function EventsList({
  onEventsScroll,
  onEdit,
  date,
}: EventsListProps) {
  const { events } = useEvents();

  const selectedDateEvents = events.filter(filterEventsWithDate(date));

  return (
    <ScrollView
      onScroll={onEventsScroll}
      contentContainerStyle={styles.eventsScrollView}
    >
      {selectedDateEvents.length > 0 ? (
        selectedDateEvents.map(
          ({ id, title, startDateTime }: FirebaseEventData) => (
            <EventsListItem
              key={id}
              title={title}
              startDateTime={startDateTime}
              id={id}
              onPress={onEdit}
            />
          )
        )
      ) : (
        <NoEvents />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  eventsScrollView: {
    flexGrow: 1,
    height: "100%",
  },
});
