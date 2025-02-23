"use client";

import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(1);

  const handleStarClick = (value: number) => {
    if (value >= 1) {
      setRating(value);
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            className={`w-5 h-5 lg:w-6 lg:h-6 cursor-pointer ${
              starValue <= rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-400"
            }`}
            onClick={() => handleStarClick(starValue)}
          >
            <use href="#star-solid"></use>
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
