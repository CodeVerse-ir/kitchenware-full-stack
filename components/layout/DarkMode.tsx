"use client";

import { useEffect } from "react";

interface DarkModeProps {
  darkMode: boolean;
}

const DarkMode: React.FC<DarkModeProps> = ({ darkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [darkMode]);

  return null;
};

export default DarkMode;
