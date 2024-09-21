import { FirebaseEventData } from "@/hooks/useEvents";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { getTime } from "@/helpers/dateUtils";

interface EventListItemProps extends FirebaseEventData {
  onPress: (eventData: FirebaseEventData) => void;
}

export default function EventsListItem({
  title,
  startDateTime,
  id,
  onPress,
}: EventListItemProps) {
  const handleItemPress = () => {
    onPress({ title, startDateTime, id });
  };

  return (
    <TouchableRipple
      rippleColor={Colors.light.highlight}
      onPress={handleItemPress}
      style={{ borderRadius: 16 }}
    >
      <ThemedView style={styles.eventContainer}>
        <ThemedText style={styles.eventTitle}>{title}</ThemedText>
        <ThemedText style={styles.eventDate}>
          {getTime(startDateTime)}
        </ThemedText>
      </ThemedView>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
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
});
