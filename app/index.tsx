import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { Routes } from "@/constants/Routes";

const WelcomePage = () => {
  return (
    <ThemedView>
      <ThemedText>WELCOME</ThemedText>
      <Link href={Routes.signIn}>Sign in</Link>
    </ThemedView>
  );
};

export default WelcomePage;
