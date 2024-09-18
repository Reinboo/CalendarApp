import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedView } from "./ThemedView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

interface ThemedDateTimeFieldProps {
  onChange: (date: Date) => void;
  label: string;
  value: Date;
  containerStyle?: ViewStyle;
}

export default function ThemedDateTimeField({
  onChange,
  value,
  label,
  containerStyle,
}: ThemedDateTimeFieldProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleConfirmDate = (date: Date) => {
    onChange(date);
    setIsDatePickerOpen(false);
  };

  const handleCloseDatePicker = () => setIsDatePickerOpen(false);

  const formattedDate = " ";

  return (
    <ThemedView style={[styles.infoContainer, containerStyle]}>
      <ThemedView style={styles.iconContainer}>
        <Ionicons
          size={36}
          name={"calendar-outline"}
          color={Colors.light.highlight}
        />
      </ThemedView>
      <ThemedTextInput
        editable={false}
        label={label}
        value={formattedDate}
        style={{ flexGrow: 1 }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerOpen}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={handleCloseDatePicker}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexGrow: 1,
    flexDirection: "row",
    gap: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
