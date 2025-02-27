"use client";

import { useSession } from "@/utils/useSession";

// components
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Header = () => {
  const { darkMode, toggleDarkMode } = useSession();

  return (
    <>
      {/* Header Desktop */}
      <NavDesktop darkMode={darkMode} handleDarkMode={toggleDarkMode} />

      {/* Header Moble */}
      <NavMobile handleDarkMode={toggleDarkMode} />
    </>
  );
};

export default Header;
