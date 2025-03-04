"use client";

import { me } from "@/actions/auth/login";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const data = await me();
      setUser(data.user);
    };

    checkUserLoggedIn();
  }, []);

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
