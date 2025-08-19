"use client";

import { useEffect } from "react";

interface DarkModeProps {
  darkMode: boolean;
}

const DarkMode: React.FC<DarkModeProps> = ({ darkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return null;
};

export default DarkMode;
