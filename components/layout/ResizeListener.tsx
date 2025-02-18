"use client";
import { useEffect, useState } from "react";

interface ResizeListenerProps {
  navbar: boolean;
}

const ResizeListener: React.FC<ResizeListenerProps> = ({ navbar }) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navbar]);

  useEffect(() => {
    const overlay = document.querySelector(".overlay");

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleResizeEffect = () => {
      if (windowWidth && windowWidth > 768) {
        document.body.style.overflow = "auto";
      } else if (overlay && overlay.classList.contains("visible")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("resize", handleResize);

    handleResizeEffect();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return null;
};

export default ResizeListener;
