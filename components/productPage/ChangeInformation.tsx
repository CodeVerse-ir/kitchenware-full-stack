"use client";

import { useState } from "react";

// components
import Description from "./Description";
import Comments from "./Comments";

interface SubText {
  paragraph: string;
}

interface SubDescription {
  title: string;
  text: SubText[];
}

interface Comment {
  name: string;
  title: string;
  text: string;
  date: string;
}

interface ChangeInformationProps {
  description: SubDescription[];
  comments: Comment[];
}

const ChangeInformation: React.FC<ChangeInformationProps> = ({
  description,
  comments,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex items-center justify-start w-full mt-5 md:mt-10 p-5 md:p-10 gap-x-10 font-MorabbaMedium text-lg md:text-xl lg:text-2xl text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl select-none">
        {/* description */}
        <button
          className={`flex items-center justify-start gap-x-2 ${
            !toggle && "text-orange-300"
          }`}
          onClick={handleToggle}
          disabled={!toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <span>توضیحات</span>
        </button>
        {/* comments */}
        <button
          className={`flex items-center justify-start gap-x-2 ${
            toggle && "text-orange-300"
          }`}
          onClick={handleToggle}
          disabled={toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>

          <span>نظرات</span>
        </button>
      </div>

      {toggle ? (
        <Comments comments={comments} />
      ) : (
        <Description description={description} />
      )}
    </>
  );
};

export default ChangeInformation;
