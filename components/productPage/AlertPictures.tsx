"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

interface AlertPicturesProps {
  showPicture: boolean;
  handleShowPicture: () => void;
  productName: string;
}

interface Picture {
  image: [string];
}

const baseURL = "https://fake-json-server-in.vercel.app/api/";

const AlertPictures: React.FC<AlertPicturesProps> = ({
  showPicture,
  handleShowPicture,
  productName,
}) => {
  const [pictures, setPictures] = useState<Picture[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}products?code=${productName}`)
      .then((response) => {
        setPictures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productName]);

  return (
    <>
      {/* Loader */}
      {!pictures && <div>در حال بارگذاری داده‌ها...</div>}

      {pictures && (
        <>
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
              {pictures[0].image.map((picture, index) => {
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
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default AlertPictures;
