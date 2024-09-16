import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import "react-native-reanimated";

const ProfileBackground = require("@/assets/images/background.png");

export default function ProfileLayout() {
  return (
    <ImageBackground
      source={ProfileBackground}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            contentStyle: { backgroundColor: "transparent" },
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            title: "",
          }}
        />
      </Stack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    shadowColor: "transparent",
  },
});
