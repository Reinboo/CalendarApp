import { Alert, StyleSheet } from "react-native";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { t } from "@/constants/strings";
import { ThemedTextInput } from "./ThemedTextInput";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Routes } from "@/constants/Routes";
import useAuth from "@/hooks/useAuth";

export default function Authentication(props: SheetProps<"authentication">) {
  const { title, message, label, button } = t.en.translation;
  const { isRegistering } = props.payload!;
  const { signIn, createAccount } = useAuth();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleAuthentication = async () => {
    try {
      if (isRegistering) {
        if (password !== repeatPassword) {
          throw new Error(message.passwordsMissmatch);
        }

        await createAccount(email, password);
      } else {
        await signIn(email, password);
      }

      router.replace(Routes.profile);
      actionSheetRef.current?.hide();
    } catch (error: any) {
      Alert.alert(message.loginFailed, error.message);
    }
  };

  return (
    <ActionSheet
      headerAlwaysVisible
      containerStyle={styles.sheetContainer}
      ref={actionSheetRef}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {isRegistering ? title.createAccount : title.welcomeBack}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <ThemedTextInput
            placeholder={label.email}
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />
          <ThemedTextInput
            placeholder={label.password}
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
          />
          {isRegistering ? (
            <ThemedTextInput
              placeholder={label.repeatPassword}
              secureTextEntry
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
          ) : (
            <ThemedButton type="link" text={button.forgotPassword} />
          )}
          <ThemedButton text={button.signIn} onPress={handleAuthentication} />
        </ThemedView>
        {/* <ThemedView style={styles.separatorContainer}>
          <ThemedText>Separator</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>Social</ThemedText>
        </ThemedView> */}
      </ThemedView>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: "60%",
    paddingHorizontal: 16,
  },
  container: {
    width: "100%",
    height: 100,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  formContainer: {
    display: "flex",
    gap: 16,
  },
  separatorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
