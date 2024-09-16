import { t } from "@/constants/strings";
import * as LocalAuthentication from "expo-local-authentication";

const { message } = t.en.translation;

export async function authorizeBiometrics() {
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

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: message.biometricsPrompt,
  });

  return result;
}
