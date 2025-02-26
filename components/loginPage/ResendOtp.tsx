import React, { useEffect, useState } from "react";

const ResendOtp = () => {
  const [seconds, setSeconds] = useState(120); // 2 دقیقه به ثانیه
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (seconds > 0 && isTimerActive) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (seconds === 0) {
      setIsTimerActive(false);
    }
  }, [seconds, isTimerActive]);

  const handleResendCode = () => {
    // منطق ارسال کد جدید
    console.log("کد جدید ارسال شد!");
    setSeconds(120); // بازنشانی تایمر
    setIsTimerActive(true); // فعال کردن دوباره تایمر
  };

  return (
    <div className="flex flex-nowrap items-center justify-center gap-x-0.5 text-sm text-zinc-700 dark:text-gray-300">
      <div className="flex items-center justify-center gap-x-0.5"></div>

      {!isTimerActive ? (
        <button onClick={handleResendCode} className="text-green-500">
          ارسال مجدد کد
        </button>
      ) : (
        <div className="flex items-center justify-center gap-x-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 mb-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div>{`0${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(
            2,
            "0"
          )}`}</div>
          <div>تا دریافت مجدد کد</div>
        </div>
      )}
    </div>
  );
};

export default ResendOtp;
