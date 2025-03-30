"use client";

import { useState, useEffect } from "react";

interface Discount {
  percent: number;
  start_time: string;
  end_time: string;
}

interface ClockProps {
  discount: Discount;
  showClock?: boolean;
}

const Clock: React.FC<ClockProps> = ({ discount, showClock = true }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(discount.end_time);
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      };
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [discount.end_time]);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <div
      className={`flex items-center justify-center ${
        showClock ? "text-gray-400" : "text-orange-400 dark:text-orange-600"
      }`}
    >
      {!timeLeft.expired ? (
        <>
          <div className="ml-1 text-sm lg:text-base">
            {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
            {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </div>
          {showClock && (
            <svg className="hidden md:inline-block mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
              <use href="#clock"></use>
            </svg>
          )}
        </>
      ) : (
        <div className="text-sm lg:text-base">تخفیف به پایان رسید</div>
      )}
    </div>
  );
};

export default Clock;
