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
import { useEffect, useRef, useState } from "react";
import { Routes } from "@/constants/Routes";
import useAuth from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Authentication(props: SheetProps<"authentication">) {
  const { title, message, label, button } = t.en.translation;
  const { isRegistering } = props.payload!;
  const { signIn, createAccount, forgotPassword, isLoading } = useAuth();
  const { showSnackbar } = useSnackbar();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

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

      router.replace(Routes.events);
      actionSheetRef.current?.hide();
    } catch (error: any) {
      setIsInvalid(true);
      showSnackbar(`${message.loginFailed}: ${error.message}`);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
    } catch (error: any) {
      setIsInvalid(true);
      showSnackbar(error?.message);
    }
  };

  useEffect(() => {
    setIsInvalid(false);
  }, [email, password, repeatPassword]);

  const insets = useSafeAreaInsets();
  return (
    <ActionSheet
      headerAlwaysVisible
      containerStyle={styles.sheetContainer}
      ref={actionSheetRef}
      isModal={false}
      useBottomSafeAreaPadding
      safeAreaInsets={insets}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {isRegistering ? title.createAccount : title.welcomeBack}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <ThemedTextInput
            label={label.email}
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            error={isInvalid}
          />
          <ThemedTextInput
            label={label.password}
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
            error={isInvalid}
          />
          {isRegistering ? (
            <ThemedTextInput
              placeholder={label.repeatPassword}
              secureTextEntry
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              error={isInvalid}
            />
          ) : (
            <ThemedButton
              type="link"
              contentStyle={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              {button.forgotPassword}
            </ThemedButton>
          )}
          <ThemedButton onPress={handleAuthentication} loading={isLoading}>
            {isRegistering ? button.register : button.signIn}
          </ThemedButton>
        </ThemedView>
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
    gap: 32,
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
  forgotPassword: {
    alignSelf: "flex-start",
  },
});
