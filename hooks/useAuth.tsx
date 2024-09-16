import auth from "@react-native-firebase/auth";
import { useState } from "react";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateName = async (newName: string) => {
    setIsLoading(true);

    await auth().currentUser?.updateProfile({
      displayName: newName,
    });

    setIsLoading(false);
  };

  const updateEmail = async (email: string) => {
    setIsLoading(true);

    await auth().currentUser?.updateEmail(email);

    setIsLoading(false);
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setIsLoading(true);

    const currentUser = await auth().currentUser;

    if (!currentUser) return;

    const credential = await auth.EmailAuthProvider.credential(
      currentUser?.email!,
      currentPassword
    );
    // Reauthenticate to make sure that logged in user's credentials are still valid
    await auth().currentUser?.reauthenticateWithCredential(credential);

    await auth().currentUser?.updatePassword(newPassword);

    setIsLoading(false);
  };

  const createAccount = async (email: string, password: string) => {
    setIsLoading(true);

    await auth().createUserWithEmailAndPassword(email, password);

    setIsLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    await auth().signInWithEmailAndPassword(email, password);

    setIsLoading(false);
  };

  return {
    isLoading,
    updateName,
    updateEmail,
    updatePassword,
    createAccount,
    signIn,
  };
}
