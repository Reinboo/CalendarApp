import { ThemedView } from "@/components/ThemedView";
import { Routes } from "@/constants/Routes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ExpandableCalendar } from "react-native-calendars";
import { AnimatedFAB, Appbar, Portal, Modal } from "react-native-paper";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import EventDetails from "@/components/Events/EventDetails";
import EventsList from "@/components/Events/EventsList";
import { EventData, FirebaseEventData } from "@/hooks/useEvents";
import { t } from "@/constants/strings";

export default function EventsPage() {
  const { title, label } = t.en.translation;
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [isFABExpanded, setIsFABExpanded] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editEventDetails, setEditEventDetails] =
    useState<FirebaseEventData | null>(null);

  // Collapse/expand FAB on scroll
  const handleEventsScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsFABExpanded(currentScrollPosition <= 0);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date: { timestamp: number }) => {
    setSelectedDate(new Date(date.timestamp).toISOString());
  };

  const handleEditEvent = (eventData: FirebaseEventData) => {
    setEditEventDetails(eventData);
  };

  const handleSubmitEventChange = (eventData: EventData) => {
    setEditEventDetails(null);
    hideModal();
  };

  useEffect(() => {
    if (editEventDetails) {
      setIsModalVisible(true);
    }
  }, [editEventDetails]);

  return (
    <ThemedView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={title.events} />
        <Appbar.Action
          icon="account"
          onPress={() => router.push(Routes.profile)}
        />
      </Appbar.Header>
      <ExpandableCalendar
        date={selectedDate}
        onDayPress={handleDateChange}
        animateScroll
      />
      <EventsList
        onEventsScroll={handleEventsScroll}
        onEdit={handleEditEvent}
        date={selectedDate}
      />
      <AnimatedFAB
        icon="plus"
        style={styles.fab}
        color={Colors.light.background}
        extended={isFABExpanded}
        label={label.newEvent}
        animateFrom="right"
        elevation={5}
        onPress={() => {
          setIsModalVisible(true);
        }}
      />
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <EventDetails
            onSubmit={handleSubmitEventChange}
            eventData={editEventDetails}
          />
        </Modal>
      </Portal>
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
  modal: { padding: 16 },
});
