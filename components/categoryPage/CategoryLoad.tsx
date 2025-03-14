"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

// components
import LoadingAnimation from "../common/LoadingAnimation";

interface Category {
  title: string;
  body: [
    {
      name: string;
      image: string;
    }
  ];
}

const baseURL = process.env.BASE_URL;

export default function CategoryLoad() {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {/* icons */}
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

      {categories ? (
        <>
          <section className="title pt-8 md:pt-40 lg:pt-44">
            <div className="container">
              {/* <!-- Section Head --> */}
              <div className="flex items-center justify-between mb-5 md:mb-12">
                <h2 className="section-title">دسته بندی محصولات</h2>
              </div>
            </div>
          </section>

          {categories.map((category, index) => {
            return (
              <section key={index} className="category-1 pb-9 md:pb-20">
                <div className="container">
                  {/* <!-- Section Head --> */}
                  <div className="flex items-center justify-between mb-5 md:mb-4">
                    <span className="section-subtitle">{category.title}</span>

                    <div className="flex gap-x-3 md:gap-x-4">
                      <div
                        className={`swiper-button-prev-${
                          index + 1
                        } hidden md:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors -rotate-90`}
                      >
                        <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                          <use href="#chevron-down-mini"></use>
                        </svg>
                      </div>
                      <div
                        className={`swiper-button-next-${
                          index + 1
                        } hidden md:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors rotate-90`}
                      >
                        <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                          <use href="#chevron-down-mini"></use>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Slider main container --> */}
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      nextEl: `.swiper-button-next-${index + 1}`,
                      prevEl: `.swiper-button-prev-${index + 1}`,
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    rewind={true}
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                      640: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                      },
                      1280: {
                        slidesPerView: 8,
                        spaceBetween: 20,
                      },
                    }}
                    className={`Swiper${index + 1}`}
                  >
                    {category.body.map((information, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Link
                            href={`/products?search=${encodeURIComponent(
                              information.name
                            )}`}
                            className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-zinc-700 rounded-2xl max-w-36 max-h-36 select-none"
                          >
                            <Image
                              className="w-16 mx-auto md:w-20"
                              src={information.image}
                              alt={`category ${information.name}`}
                              width={128}
                              height={128}
                              sizes="(min-width: 768px)"
                              loading="lazy"
                            />

                            {/* <!-- Cart Title --> */}
                            <h5 className="font-DanaMedium text-center text-sm/7 lg:text-md/7 text-zinc-700 dark:text-white line-clamp-1">
                              {information.name}
                            </h5>
                          </Link>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </section>
            );
          })}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
}
