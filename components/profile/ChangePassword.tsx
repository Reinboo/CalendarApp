import { Alert, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { t } from "@/constants/strings";
import { useRef, useState } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { ThemedTextInput } from "../ThemedTextInput";
import useAuth from "@/hooks/useAuth";

export default function ChangePassword() {
  const { title, label, message, button } = t.en.translation;
  const { updatePassword } = useAuth();

  const [currentPassword, setCurrentPasswolrd] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState<string>("");

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleUpdateProfile = async () => {
    try {
      if (newPassword !== repeatedNewPassword) {
        throw new Error(message.passwordsMissmatch);
      }

      await updatePassword(currentPassword, newPassword);

      actionSheetRef.current?.hide();
    } catch (error: any) {
      Alert.alert(error?.message || message.passwordChangeFailed);
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
          <ThemedText type="title">{title.changePassword}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.currentPasswordContainer}>
            <ThemedTextInput
              placeholder={label.currentPassword}
              value={currentPassword}
              onChangeText={setCurrentPasswolrd}
              autoComplete="password"
              secureTextEntry
            />
            <ThemedButton
              onPress={() => {}}
              text={button.forgotPassword}
              type="link"
            />
          </ThemedView>
          <ThemedView style={styles.newPasswordContainer}>
            <ThemedTextInput
              placeholder={label.newPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <ThemedTextInput
              placeholder={label.repeatNewPassword}
              value={repeatedNewPassword}
              onChangeText={setRepeatedNewPassword}
              secureTextEntry
            />
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedButton
            onPress={handleUpdateProfile}
            text={button.save}
            disabled={!currentPassword || !newPassword || !repeatedNewPassword}
          />
        </ThemedView>
      </ThemedView>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: "60%",
  },
  container: {
    justifyContent: "space-between",
    height: "100%",
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  titleContainer: {
    height: 56,
    lineHeight: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  currentPasswordContainer: {
    width: "100%",
  },
  forgotPasswordButton: {
    fontStyle: "italic",
  },
  newPasswordContainer: {
    width: "100%",
    gap: 12,
  },
});
