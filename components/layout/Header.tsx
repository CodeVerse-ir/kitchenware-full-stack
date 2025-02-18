"use client";

import { useState } from "react";

// components
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      {/* Header Desktop */}
      <NavDesktop darkMode={darkMode} handleDarkMode={handleDarkMode} />

      {/* Header Moble */}
      <NavMobile handleDarkMode={handleDarkMode} />
    </>
  );
};

export default Header;
