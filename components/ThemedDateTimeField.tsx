import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "./ThemedView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { IconButton, Text, TouchableRipple } from "react-native-paper";

interface ThemedDateTimeFieldProps {
  onChange: (date: Date) => void;
  label: string;
  mode?: "date" | "time";
  value: Date;
  containerStyle?: ViewStyle;
}

export default function ThemedDateTimeField({
  onChange,
  value,
  mode = "date",
  label,
  containerStyle,
}: ThemedDateTimeFieldProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(value || new Date());

  const handleConfirmDate = (date: Date) => {
    onChange(date);
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleCloseDatePicker = () => setIsDatePickerOpen(false);

  const dateFormat: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDate =
    mode === "date"
      ? date.toLocaleDateString("en-GB", dateFormat)
      : date.toLocaleTimeString("en-GB", timeFormat);

  return (
    <TouchableRipple
      rippleColor={Colors.light.highlight}
      onPress={() => setIsDatePickerOpen(true)}
      style={{ borderRadius: 16 }}
    >
      <ThemedView style={[styles.infoContainer, containerStyle]}>
        <ThemedView style={styles.iconContainer}>
          <IconButton
            size={32}
            icon={mode === "date" ? "calendar-edit" : "clock-edit-outline"}
            iconColor={Colors.light.highlight}
          />
        </ThemedView>
        <ThemedView style={styles.valueContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {formattedDate || `Press to enter ${mode}`}
          </Text>
        </ThemedView>
        <DateTimePickerModal
          isVisible={isDatePickerOpen}
          mode={mode}
          onConfirm={handleConfirmDate}
          onCancel={handleCloseDatePicker}
          accentColor={Colors.light.text}
          textColor={Colors.light.text}
          date={date}
        />
      </ThemedView>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexGrow: 1,
    flexDirection: "row",
    gap: 16,
    borderRadius: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 70,
  },
  valueContainer: {
    justifyContent: "center",
    gap: 5,
  },
  label: {
    color: "lightgrey",
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    color: Colors.light.text,
  },
});
