// useEvents.js
import { useState, useEffect, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";

export interface EventData {
  title: string;
  startDateTime: string;
  endDateTime: string;
}

export interface FirebaseEventData extends EventData {
  id: string;
}

export interface AgendaData {
  hour: string;
  duration: string;
  title: string;
}

export default function useEvents() {
  const [events, setEvents] = useState<FirebaseEventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await firestore().collection("events").get();

      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirebaseEventData[];

      setEvents(eventsList);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createEvent = async (event: EventData) => {
    try {
      const docRef = await firestore().collection("events").add(event);
      fetchEvents(); // Refresh the events list
    } catch (err: any) {
      setError(err);
    }
  };

  const updateEvent = async (
    eventId: string,
    updatedData: Partial<EventData>
  ) => {
    try {
      await firestore().collection("events").doc(eventId).update(updatedData);
      console.log("Event updated");
      fetchEvents(); // Refresh the events list
    } catch (err: any) {
      setError(err);
    }
  };

  // Delete an event
  const deleteEvent = async (eventId: string) => {
    try {
      await firestore().collection("events").doc(eventId).delete();
      console.log("Event deleted");
      fetchEvents(); // Refresh the events list
    } catch (err: any) {
      setError(err);
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
