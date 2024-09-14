import React, {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { router } from "expo-router";
import { Routes } from "@/constants/Routes";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";

interface UserContextType {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
  isAuthorized: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  // TODO: Biometrics
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user !== null) {
        setUser(user);
        setIsAuthenticated(true);

        if (isAuthorized) router.push(Routes.profile); // TODO: Change to calendar

        try {
          // TODO: Check hardware
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate w biometrics",
          });

          if (result.success) {
            setIsAuthorized(true);
            router.push(Routes.profile); // TODO: Change to calendar
          } else {
            // TODO: Error
            setIsAuthorized(false);
          }
        } catch (error: any) {}
      } else {
        setUser(null);
        setIsAuthenticated(false);
        router.push(Routes.welcome);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isAuthorized }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
