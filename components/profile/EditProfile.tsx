import { Alert, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { ThemedButton } from "@/components/ThemedButton";
import { t } from "@/constants/strings";
import { useRef, useState } from "react";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from "react-native-actions-sheet";
import EditProfileField from "./EditProfileField";
import useAuth from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";

export default function EditProfile() {
  const { title, label, message, button } = t.en.translation;
  const userContext = useUser();
  const { showSnackbar } = useSnackbar();
  const { updateName, updateEmail, isLoading } = useAuth();

  const currentName = userContext?.user?.displayName;
  const currentEmail = userContext?.user?.email;

  const [name, setName] = useState<string>(currentName || "");
  const [email, setEmail] = useState<string>(currentEmail || "");

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleUpdateProfile = async () => {
    try {
      if (currentEmail !== email) {
        await updateEmail(email);
      }
      if (currentName !== name) {
        await updateName(name);
      }

      actionSheetRef.current?.hide();
    } catch (error: any) {
      showSnackbar(`${message.profileUpdateFailed}: ${error?.message}`);
    }
  };

  return (
    <ActionSheet
      headerAlwaysVisible
      containerStyle={styles.sheetContainer}
      ref={actionSheetRef}
      isModal={false}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{title.editProfile}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoContainer}>
          <EditProfileField
            iconName="person-outline"
            placeholder={label.name}
            value={name}
            onChange={setName}
          />
          <EditProfileField
            iconName="mail-outline"
            placeholder={label.email}
            value={email}
            onChange={setEmail}
          />
          <ThemedButton
            onPress={() => {
              SheetManager.show("changePassword");
            }}
            type="link"
          >
            {button.changePassword}
          </ThemedButton>
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton onPress={handleUpdateProfile} loading={isLoading}>
            {button.save}
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    height: "50%",
  },
  container: {
    justifyContent: "space-between",
    height: "100%",
    borderRadius: 16,
    paddingHorizontal: 18,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
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
    paddingHorizontal: 32,
    gap: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
});
