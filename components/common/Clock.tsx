"use client";

import { useState, useEffect } from "react";

interface ClockProps {
  clock: string;
  showClock: boolean;
}

const Clock: React.FC<ClockProps> = ({ clock, showClock }) => {
  const initialSeconds = () => {
    const timeArray = clock.split(":");
    return (
      +timeArray[0] * 216000 +
      +timeArray[1] * 3600 +
      +timeArray[2] * 60 +
      +timeArray[3]
    );
  };

  const existSeconds = (timer: number) => {
    const time = Number(timer);
    const d = Math.floor(time / 216000);
    const h = Math.floor((time % 216000) / 3600);
    const m = Math.floor(((time % 216000) % 3600) / 60);
    const s = Math.floor(((time % 216000) % 3600) % 60);

    const dDisplay = d < 10 ? "0" + d : d;
    const hDisplay = h < 10 ? "0" + h : h;
    const mDisplay = m < 10 ? "0" + m : m;
    const sDisplay = s < 10 ? "0" + s : s;

    return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
  };

  const [timer, setTimer] = useState(initialSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${
        showClock ? "text-gray-400" : "text-orange-400 dark:text-orange-600"
      } `}
    >
      <div className="ml-1 text-sm lg:text-base">{existSeconds(timer)}</div>
      {showClock && (
        <svg className="hidden md:inline-block mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
          <use href="#clock"></use>
        </svg>
      )}
    </div>
  );
};

export default Clock;
