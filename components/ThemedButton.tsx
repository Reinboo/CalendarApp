import { StyleSheet, ViewStyle } from "react-native";

import { Colors } from "@/constants/Colors";
import { Button, ButtonProps } from "react-native-paper";

export type ThemedButtonProps = ButtonProps & {
  type?: "contained" | "text" | "link";
};

export function ThemedButton({
  style,
  type = "contained",
  labelStyle,
  contentStyle,
  children,
  ...rest
}: ThemedButtonProps) {
  return (
    <Button
      style={styles.shared}
      contentStyle={
        [
          type === "contained" ? styles.contained : undefined,
          type === "text" ? styles.text : undefined,
          type === "link" ? styles.link : undefined,
          contentStyle,
        ] as ViewStyle[]
      }
      labelStyle={
        [
          type === "contained" ? styles.containedLabel : undefined,
          type === "text" ? styles.textLabel : undefined,
          type === "link" ? styles.linkLabel : undefined,
          labelStyle,
        ] as ViewStyle[]
      }
      {...rest}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  shared: {
    fontFamily: "Inter",
    width: "100%",
  },
  contained: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    borderRadius: 12,
    backgroundColor: Colors.light.text,
  },
  text: {
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
  containedLabel: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: "InterBold",
    color: Colors.light.background,
  },
  textLabel: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: Colors.light.text,
  },
  linkLabel: {
    lineHeight: 30,
    fontSize: 18,
    color: Colors.light.highlight,
  },
});
