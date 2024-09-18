import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { CalendarProvider } from "react-native-calendars";
import "react-native-reanimated";

export default function EventsLayout() {
  return (
    <CalendarProvider date={Date()}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
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
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    shadowColor: "transparent",
  },
});
