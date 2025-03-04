"use client";

import { createContext, useState } from "react";

interface User {
  first_name: string;
  last_name: string;
  mobile_number: string;
  username: string;
}

interface SessionContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  loginContext: (user: User) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const loginContext = (user: User) => {
    if (user) {
      setUser(user);
    }
  };

  return (
    <SessionContext.Provider
      value={{ darkMode, toggleDarkMode, user, loginContext }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
