import { Ionicons } from "@expo/vector-icons";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedView } from "../ThemedView";
import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface EditProfileFieldProps {
  iconName: string;
  onChange: (text: string) => void;
  placeholder: string;
  value: string;
  containerStyle?: ViewStyle;
}

export default function EditProfileField({
  iconName,
  onChange,
  value,
  placeholder,
  containerStyle,
}: EditProfileFieldProps) {
  return (
    <ThemedView style={[styles.infoContainer, containerStyle]}>
      <ThemedView style={styles.iconContainer}>
        <Ionicons size={36} name={iconName} color={Colors.light.highlight} />
      </ThemedView>
      <ThemedTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    gap: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
