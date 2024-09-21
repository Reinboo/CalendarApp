import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export type ThemedTextInputProps = TextInputProps & {};

export function ThemedTextInput({
  style,
  contentStyle,
  outlineStyle,
  ...rest
}: ThemedTextInputProps) {
  return (
    <TextInput
      mode="outlined"
      contentStyle={[styles.defaultWrapper, style]}
      outlineStyle={styles.outlineStyle}
      outlineColor={Colors.light.text}
      activeOutlineColor={Colors.light.text}
      selectionColor={Colors.light.text}
      textColor={Colors.light.text}
      style={[styles.default, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  defaultWrapper: {
    height: 70,
    flexGrow: 1,
    paddingHorizontal: 12,
    fontSize: 20,
    fontFamily: "Inter",
  },
  default: {
    height: 70,
    lineHeight: 24,
    backgroundColor: "white",
  },
  outlineStyle: {
    borderRadius: 16,
    borderColor: Colors.light.subText,
  },
});
