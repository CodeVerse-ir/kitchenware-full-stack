"use client";

import Image from "next/image";
import { useState } from "react";

// components
import AlertPictures from "./AlertPictures";
import NoScroll from "../common/NoScroll";
import { getBlurDataURL } from "@/utils/helper";

interface PicturesProps {
  image: string[];
}

const Pictures: React.FC<PicturesProps> = ({ image }) => {
  const [showPicture, setShowPicture] = useState(false);

  const handleShowPicture = () => setShowPicture(!showPicture);

  const closeAlert = () => {
    if (showPicture) {
      setShowPicture(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-2 text-gray-300 dark:text-gray-400">
        {Array.from(
          {
            length: image.length <= 4 ? image.length - 1 : 4,
          },
          (_, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-1 rounded-xl border border-gray-300 cursor-pointer"
              onClick={handleShowPicture}
            >
              <Image
                className={`w-12 h-12 md:w-16 md:h-16 object-cover ${
                  index === 3 && "blur-sm"
                }`}
                src={image[index + 1].replaceAll("/utils", "")}
                alt="product"
                width={64}
                height={64}
                loading="lazy"
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
              />
              {index === 3 && (
                <div className="absolute child:inset-0 mx-auto flex gap-x-1 child:w-2 child:h-2 child:rounded-full child:border-2 child:border-gray-700 group-hover:gap-x-2 group-hover:child:bg-gray-700 child:transition-all transition-all">
                  <div className=""></div>
                  <div className=""></div>
                  <div className=""></div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <AlertPictures
        showPicture={showPicture}
        handleShowPicture={handleShowPicture}
        image={image}
      />
      <NoScroll noScroll={showPicture} />

      <div
        className={`${
          showPicture ? "visible opacity-100" : "invisible opacity-0"
        } overlay-alert`}
        onClick={closeAlert}
      ></div>
    </>
  );
};

export default Pictures;
