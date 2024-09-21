import React, { ReactNode, useState, useContext, createContext } from "react";
import { Snackbar } from "react-native-paper";

interface SnackbarContextType {
  message: string;
  showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  message: "",
  showSnackbar: () => {},
});

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hideSnackbar = () => {
    setMessage("");
    setIsVisible(false);
  };

  const showSnackbar = (message: string) => {
    setMessage(message);
    setIsVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ message, showSnackbar }}>
      {children}
      <Snackbar elevation={5} visible={!!message} onDismiss={hideSnackbar}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within an SnackbarProvider");
  }

  return context;
}
