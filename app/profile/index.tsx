import { Alert, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar } from "@rneui/themed";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { ThemedButton } from "@/components/ThemedButton";
import { t } from "@/constants/strings";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Colors } from "@/constants/Colors";
import { SheetManager } from "react-native-actions-sheet";
import * as LocalAuthentication from "expo-local-authentication";

export default function ProfilePage() {
  const { title, label, message, button } = t.en.translation;
  const userContext = useUser();

  const handleEditProfile = async () => {
    try {
      const hasSecureHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasSecureHardware) {
        throw new Error(message.deviceNotSecure);
      }

      const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (
        [
          LocalAuthentication.SecurityLevel.NONE,
          LocalAuthentication.SecurityLevel.BIOMETRIC_WEAK,
        ].includes(securityLevel)
      ) {
        throw new Error(message.weakSecurity);
      }
      console.log(securityLevel);
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: message.biometricsPrompt,
      });

      if (result.success) {
        SheetManager.show("editProfile");
      } else {
        Alert.alert(result.error || message.authorizationFailed);
      }
    } catch (error: any) {
      Alert.alert(error?.message || message.authorizationFailed);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title.profile}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.avatarContainer}>
        <Avatar
          size={170}
          rounded
          containerStyle={{ backgroundColor: "purple" }}
          title="TD"
          source={undefined}
        />
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
        <ThemedButton onPress={handleEditProfile} text={button.editProfile} />
        <ThemedButton
          onPress={() => {
            auth().signOut();
          }}
          text={button.signOut}
          type="link"
        />
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
