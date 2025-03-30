"use client";

import { useState } from "react";

const Bookmark = () => {
  const [bootmark, setBootmark] = useState(false);

  const handleBootmark = () => setBootmark(!bootmark);

  return (
    <div
      className={`group flex items-center justify-center size-8 md:size-10 lg:size-12 rounded-xl ${
        bootmark ? "text-red-500" : "text-orange-300"
      } border border-gray-300`}
      onClick={handleBootmark}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4 md:size-5 lg:size-6 group-hover:scale-125 transition-all"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Bookmark;
