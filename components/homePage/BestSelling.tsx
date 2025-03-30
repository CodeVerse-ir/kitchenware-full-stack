"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { checkDiscountStatus } from "@/utils/helper";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

// components
import CardProduct from "../common/CardProduct";

interface Product {
  code: string;
  image: string[];
  product_name: string;
  price: number;
  discount: {
    percent: number;
    start_time: string;
    end_time: string;
  };
  star: number;
  clock: string;
}

const baseURL = process.env.BASE_URL;

const BestSelling = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}products?number=20&filter=discount`)
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
                    <svg
                      id="chevron-down-mini"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 md:w-[26px] md:h-[26px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="swiper-button-next-custom flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white hover:bg-gray-300 dark:hover:text-zinc-700 dark:hover:bg-white shadow-normal rounded-full transition-colors rotate-90">
                    <svg
                      id="chevron-down-mini"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 md:w-[26px] md:h-[26px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
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
                  const finalPrice = checkDiscountStatus(cart.discount)
                    ? cart.price - cart.price * (cart.discount.percent / 100)
                    : cart.price;
                  return (
                    <SwiperSlide key={index} className="py-2.5 px-2">
                      <CardProduct
                        code={cart.code}
                        image={cart.image}
                        product_name={cart.product_name}
                        finalPrice={finalPrice}
                        price={cart.price}
                        discount={cart.discount}
                        star={cart.star}
                      />
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
