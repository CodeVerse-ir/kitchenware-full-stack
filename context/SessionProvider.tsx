"use client";

import { createContext, useState } from "react";

export const SessionContext = createContext<
  { darkMode: boolean; toggleDarkMode: () => void } | undefined
>(undefined);

export const SessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <SessionContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </SessionContext.Provider>
  );
};

// صادرات کامپوننت
export default SessionProvider;
