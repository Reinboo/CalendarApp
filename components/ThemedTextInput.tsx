import { Colors } from "@/constants/Colors";
import { TextInput, type TextInputProps, StyleSheet } from "react-native";

export type ThemedTextInputProps = TextInputProps & {};

export function ThemedTextInput({ style, ...rest }: ThemedTextInputProps) {
  return <TextInput style={[styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    height: 70,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 12,
    padding: 12,
    fontSize: 20,
    fontFamily: "Inter",
  },
});
