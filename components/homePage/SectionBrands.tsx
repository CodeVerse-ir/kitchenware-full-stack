"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

interface Brand {
  name: string;
  image: string;
}

const baseURL = "https://fake-json-server-in.vercel.app/api/";

const SectionBrands = () => {
  const [brands, setBrands] = useState<Brand[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}brands`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {/* Loader */}
      {!brands && <div>در حال بارگذاری داده‌ها...</div>}

      {brands && (
        <>
          <section className="brands mb-8 md:mb-20">
            <div className="container">
              {/* <!-- Section Head --> */}
              <div className="flex items-center justify-between mb-5 md:mb-12">
                <h2 className="section-title">برند ها</h2>

                <Link href="/brands" className="section-link">
                  <span className="hidden md:inline-block">
                    مشاهده همه برند ها
                  </span>
                  <span className="inline-block md:hidden">مشاهده همه</span>
                  <svg className="w-4 h-4 lg:w-5 lg:h-5">
                    <use href="#chevron-left"></use>
                  </svg>
                </Link>
              </div>

              {/* <!-- Section Body --> */}
              <div className="flex items-center justify-between md:gap-x-2">
                <div className="swiper-button-prev-custom-sec hidden md:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors -rotate-90">
                  <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                    <use href="#chevron-down-mini"></use>
                  </svg>
                </div>

                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    nextEl: ".swiper-button-next-custom-sec",
                    prevEl: ".swiper-button-prev-custom-sec",
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  rewind={true}
                  slidesPerView={5}
                  spaceBetween={20}
                  breakpoints={{
                    640: {
                      slidesPerView: 6,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 6,
                      spaceBetween: 50,
                    },
                    1280: {
                      slidesPerView: 8,
                      spaceBetween: 35,
                    },
                  }}
                  className="mySwiper md:w-[90%]"
                >
                  {brands.map((brand, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          key={index}
                          className="max-w-[6.25rem] lg:max-w-25"
                          href={`/products/brand/${encodeURIComponent(
                            brand.name
                          )}`}
                        >
                          <Image
                            className="w-14 h-14 lg:w-25 lg:h-25"
                            src={brand.image.replaceAll("/utils", "")}
                            alt={`product ${index + 1}`}
                            width={56}
                            height={56}
                            // sizes="(min-width: 768px)"
                            loading="lazy"
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <div className="swiper-button-next-custom-sec hidden md:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors rotate-90">
                  <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                    <use href="#chevron-down-mini"></use>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SectionBrands;
