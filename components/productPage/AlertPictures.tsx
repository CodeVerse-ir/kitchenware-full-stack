"use client";

import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";
import { getBlurDataURL } from "@/utils/helper";

interface AlertPicturesProps {
  image: string[];
  showPicture: boolean;
  handleShowPicture: () => void;
}

const AlertPictures: React.FC<AlertPicturesProps> = ({
  image,
  showPicture,
  handleShowPicture,
}) => {
  return (
    <div
      className={`${
        showPicture ? "visible opacity-100" : "invisible opacity-0"
      } alert-picture`}
    >
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between">
        <span>تصاویر کالا</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-orange-300 transition-colors"
          onClick={handleShowPicture}
        >
          <use href="#x-mark"></use>
        </svg>
      </div>
      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>
      {/* <!-- Body --> */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fdba74",
          } as React.CSSProperties
        }
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        className="swiperPicture w-[100%] h-[90%] mx-auto my-auto"
      >
        {/* <!-- Slides --> */}
        {image.map((picture, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                className="w-[250px] lg:w-[350px] mx-auto"
                src={picture.replaceAll("/utils", "")}
                alt={`product ${index + 1}`}
                width={250}
                height={250}
                sizes="(min-width: 1024px)"
                loading="lazy"
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AlertPictures;
