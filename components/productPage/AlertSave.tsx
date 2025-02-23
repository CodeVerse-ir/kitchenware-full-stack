"use client";

import { SetStateAction, useEffect } from "react";

interface AlertSaveProps {
  textAlert: string;
  showAlert: boolean;
  setShowAlert: (value: SetStateAction<boolean>) => void;
}

const AlertSave: React.FC<AlertSaveProps> = ({
  textAlert,
  showAlert,
  setShowAlert,
}) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    <>
      <div
        className={`alert-save ${
          showAlert
            ? "visible opacity-100 bottom-2.5"
            : "invisible opacity-0 -bottom-14"
        }`}
      >
        {textAlert}
      </div>
    </>
  );
};

export default AlertSave;
