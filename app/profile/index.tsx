import { Alert, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { ThemedButton } from "@/components/ThemedButton";
import { t } from "@/constants/strings";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Colors } from "@/constants/Colors";
import { SheetManager } from "react-native-actions-sheet";
import { authorizeBiometrics } from "@/helpers/biometricUtils";
import { Avatar } from "react-native-paper";
import { useSnackbar } from "@/hooks/useSnackbar";

export default function ProfilePage() {
  const { title, label, message, button } = t.en.translation;
  const userContext = useUser();
  const { showSnackbar } = useSnackbar();

  const handleEditProfile = async () => {
    try {
      const result = await authorizeBiometrics();

      if (result.success) {
        SheetManager.show("editProfile");
      } else {
        showSnackbar(`${message.authorizationFailed}: ${result.error}`);
      }
    } catch (error: any) {
      showSnackbar(`${message.authorizationFailed}: ${error?.message}`);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title.profile}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.avatarContainer}>
        <Avatar.Icon size={170} icon="account" />
      </ThemedView>
      <ThemedView style={styles.infoContainer}>
        <ProfileInfo
          label={label.name}
          text={userContext?.user?.displayName || "-"}
          icon={
            <Ionicons
              size={36}
              name="person-outline"
              color={Colors.light.highlight}
            />
          }
        />
        <ProfileInfo
          label={label.email}
          text={userContext?.user?.email || ""}
          icon={
            <Ionicons
              size={36}
              name="mail-outline"
              color={Colors.light.highlight}
            />
          }
        />
        <ProfileInfo
          label={label.password}
          text={label.hiddenPassword}
          icon={
            <Ionicons
              size={36}
              name="lock-closed-outline"
              color={Colors.light.highlight}
            />
          }
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton onPress={handleEditProfile}>
          {button.editProfile}
        </ThemedButton>
        <ThemedButton
          onPress={() => {
            auth().signOut();
          }}
          type="link"
        >
          {button.signOut}
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginTop: "25%",
    height: "90%",
    borderRadius: 16,
    // gap: 16,
    padding: 18,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
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
  avatarContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
});
