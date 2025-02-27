"use client";

import { useSession } from "@/utils/useSession";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerComponent = () => {
  const { darkMode } = useSession();

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={darkMode ? "light" : "dark"}
      transition={Bounce}
    />
  );
};

export default ToastContainerComponent;
