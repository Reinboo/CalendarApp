import {
  Pressable,
  Text,
  type PressableProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  text: string;
  type?: "default" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  text,
  type = "default",
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) =>
        [
          { opacity: pressed ? 0.8 : 1 },
          type === "default" ? styles.default : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ] as ViewStyle[]
      }
      {...rest}
    >
      <Text
        style={[
          styles.shared,
          [
            type === "default" ? styles.defaultText : undefined,
            type === "subtitle" ? styles.subtitleText : undefined,
            type === "link" ? styles.linkText : undefined,
            style,
          ] as ViewStyle[],
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shared: {
    fontFamily: "Inter",
  },
  default: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    borderRadius: 12,
    backgroundColor: Colors.light.text,
  },
  subtitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    borderRadius: 12,
  },
  link: {
    lineHeight: 24,
  },
  defaultText: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: "InterBold",
    color: Colors.light.background,
  },
  subtitleText: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: Colors.light.text,
  },
  linkText: {
    lineHeight: 30,
    fontSize: 18,
    color: Colors.light.highlight,
  },
});
