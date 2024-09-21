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

interface UserContextType {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handle user being logged in/out
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user !== null) {
        setUser(user);
        setIsAuthenticated(true);

        router.replace(Routes.events);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        router.replace(Routes.welcome);
      }
    });

    return unsubscribe;
  }, []);

  // Handle profile edits
  useEffect(() => {
    const unsubscribe = auth().onUserChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
}
