"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

// components
import Clock from "../common/Clock";

interface Product {
  code: string;
  image: string[];
  discountPercent: number;
  productName: string;
  price: string;
  discount: number;
  star: number;
  clock: string;
}

const baseURL = "https://fake-json-server-in.vercel.app/api/";

const BestSelling = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}products?discountPercent_ne=0`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {/* Loader */}
      {!products && <div>در حال بارگذاری داده‌ها...</div>}

      {products && (
        <>
          <svg className="hidden">
            <symbol
              id="chevron-down-mini"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </symbol>
            <symbol
              id="star"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </symbol>
            <symbol
              id="clock"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </symbol>
          </svg>

          <section className="best-selling mb-9 md:mb-20">
            <div className="container">
              {/* <!-- Section Head --> */}
              <div className="flex items-end justify-between mb-5 md:mb-12">
                <div>
                  <h2 className="section-title">محصولات پرفروش</h2>
                  <span className="section-subtitle">پیشنهادات ویژه ...</span>
                </div>

                <div className="flex gap-x-3 md:gap-x-4">
                  <div className="swiper-button-prev-custom flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors -rotate-90">
                    <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                      <use href="#chevron-down-mini"></use>
                    </svg>
                  </div>
                  <div className="swiper-button-next-custom flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors rotate-90">
                    <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                      <use href="#chevron-down-mini"></use>
                    </svg>
                  </div>
                </div>
              </div>

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                rewind={true}
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper"
              >
                {/* <!-- Slides --> */}
                {products.map((cart, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link
                        href={`/product/${cart.code}`}
                        key={index}
                        className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-zinc-700 rounded-2xl"
                      >
                        <div className="relative mb-2 md:mb-5">
                          <Image
                            className="mx-auto md:w-auto"
                            src={cart.image[0].replaceAll("/utils", "")}
                            alt={`product ${index + 1}`}
                            width={128}
                            height={128}
                            sizes="(min-width: 768px)"
                            loading="lazy"
                          />

                          {/* <!-- discount percent  --> */}
                          {cart.discountPercent !== 0 && (
                            <span className="absolute top-1 right-1 flex items-center justify-center w-10 lg:w-[3.375rem] h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaBold bg-orange-300 text-white dark:text-zinc-700 rounded-3xl pt-1">
                              {cart.discountPercent}%
                            </span>
                          )}
                        </div>

                        {/* <!-- Cart Title --> */}
                        <h5 className="font-DanaMedium text-sm/7 lg:text-xl/7 min-h-14 text-zinc-700 dark:text-white line-clamp-2">
                          {cart.productName}
                        </h5>

                        {/* <!-- Cart Price --> */}
                        <div className="flex items-center justify-start gap-x-1.5 md:gap-x-2 mt-1.5 md:mt-2.5">
                          <div className="text-teal-600 dark:text-emerald-500">
                            <span className="font-DanaBold text-base lg:text-xl">
                              {Number(cart.price).toLocaleString()}
                            </span>
                            <span className="pr-1 text-xs md:text-sm tracking-tighter">
                              تومان
                            </span>
                          </div>
                          {cart.discount !== 0 && (
                            <div className="mr-2 text-xs md:text-sm text-gray-400 line-through lg:text-base decoration-red-500 decoration-1">
                              <span className="">
                                {Number(cart.discount).toLocaleString()}
                              </span>
                              <span className="hidden lg:inline">تومان</span>
                            </div>
                          )}
                        </div>

                        {/* <!-- Cart Footer --> */}
                        <div className="flex items-center justify-between gap-x-1 mt-1.5 md:mt-2.5">
                          {/* <!-- Star --> */}
                          <div className="flex text-gray-300 dark:text-gray-400">
                            {Array.from({ length: 5 }, (_, index) => (
                              <svg
                                key={index}
                                className={`mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
                                  index < cart.star && "text-yellow-400"
                                }`}
                              >
                                <use href="#star"></use>
                              </svg>
                            ))}
                          </div>
                          {/* <!-- Timer --> */}
                          {cart.discount !== 0 && (
                            <Clock clock={cart.clock} showClock={true} />
                          )}
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default BestSelling;
