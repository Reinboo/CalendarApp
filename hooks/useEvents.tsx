import {
  useState,
  useEffect,
  useCallback,
  createContext,
  ReactNode,
  useContext,
} from "react";
import firestore from "@react-native-firebase/firestore";
import { t } from "@/constants/strings";

export interface EventData {
  title: string;
  startDateTime: Date;
}

export interface FirebaseEventData {
  id: string;
  title: string;
  startDateTime: string;
}

export interface AgendaData {
  hour: string;
  duration: string;
  title: string;
}

export function filterEventsWithDate(date: string) {
  // TODO: Validate date
  const shorthandDate = new Date(date).toISOString().split("T")[0];

  return function (event: FirebaseEventData) {
    if (!event.startDateTime) return false;

    return event.startDateTime.startsWith(shorthandDate);
  };
}

interface EventsContextType {
  events: FirebaseEventData[];
  isLoading: boolean;
  error: { message: string } | null;
  createEvent: (eventData: EventData) => Promise<void>;
  updateEvent: (eventId: string, updatedData: EventData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const { message } = t.en.translation;
  const [events, setEvents] = useState<FirebaseEventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  const handleError = (err: any) => {
    setError({ message: err.message || message.error });
  };

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);

    try {
      const snapshot = await firestore().collection("events").get();

      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirebaseEventData[];

      setEvents(() => [...eventsList]);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const formatEvent = (event: EventData) => ({
    ...event,
    startDateTime: event.startDateTime.toISOString(),
  });

  const createEvent = async (event: EventData) => {
    try {
      const formattedEvent = formatEvent(event);

      await firestore().collection("events").add(formattedEvent);

      fetchEvents(); // Refresh the events list
    } catch (error: any) {
      handleError(error);
    }
  };

  const updateEvent = async (eventId: string, updatedData: EventData) => {
    try {
      const formattedEvent = formatEvent(updatedData);

      await firestore()
        .collection("events")
        .doc(eventId)
        .update(formattedEvent);

      fetchEvents(); // Refresh the events list
    } catch (error: any) {
      handleError(error);
    }
  };

  // Delete an event
  const deleteEvent = async (eventId: string) => {
    try {
      await firestore().collection("events").doc(eventId).delete();
      fetchEvents(); // Refresh the events list
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export default function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return context;
}
