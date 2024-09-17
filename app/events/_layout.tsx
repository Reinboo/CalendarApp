import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import "react-native-reanimated";

const ProfileBackground = require("@/assets/images/background.png");

export default function EventsLayout() {
  return (
    <ImageBackground
      source={ProfileBackground}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <CalendarProvider date={Date()}>
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
      </CalendarProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    shadowColor: "transparent",
  },
});
