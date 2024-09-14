import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Alert } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Input, Button } from "react-native-elements";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as LocalAuthentication from "expo-local-authentication";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        handleBiometricAuth();
      }
    };

    // checkBiometrics();
  }, []);

  const handleLogin = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Registration successful");
      router.push("/");
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with biometrics",
      });

      if (result.success) {
        // setIsAuthenticated(true);
        Alert.alert("Biometric auth successful");
      } else {
        Alert.alert("Biometric auth failed");
      }
    } catch (error: any) {
      Alert.alert("Error ", error.message);
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        {isAuthenticated ? (
          <Button title="Biometrics" onPress={handleBiometricAuth} />
        ) : (
          <ThemedView style={styles.authFormContainer}>
            <ThemedText>Sign In</ThemedText>
            <Input
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  authFormContainer: {
    display: "flex",
    width: 100,
  },
});
