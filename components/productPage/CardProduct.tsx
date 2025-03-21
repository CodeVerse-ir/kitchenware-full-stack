"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import Clock from "../common/Clock";
import NoScroll from "../common/NoScroll";
import AlertPictures from "./AlertPictures";
import AlertComment from "./AlertComment";
import AlertSave from "./AlertSave";

const baseURL = process.env.BASE_URL;

interface CartProductProps {
  product_code: string;
}

interface Product {
  discount: number;
  clock: string;
  image: [string];
  brand: string;
  category: string;
  productName: string;
  code: number;
  attributes: [string];
  colors: [];
  price: number;
  star: number;
  like: number;
  bootmark: number;
}

const CartProduct: React.FC<CartProductProps> = ({ product_code }) => {
  // const [star, setStar] = useState(product.star);
  const [like, setLike] = useState(false);
  const [bootmark, setBootmark] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [saveComment, setSaveComment] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleStar = () => setLike(!like);
  const handleBootmark = () => setBootmark(!bootmark);
  const handleShowPicture = () => setShowPicture(!showPicture);
  const handleShowComment = () => {
    if (!saveComment) {
      setShowComment(!showComment);
    }
  };
  const closeAlert = () => {
    if (showPicture) {
      setShowPicture(false);
    }
    if (showComment) {
      setShowComment(false);
    }
  };
  const handleSaveComment = () => {
    handleShowComment();
    setSaveComment(true);
    setShowAlert(true);
  };

  const [product, setProduct] = useState<Product | null>(null);

  const finalPrice =
    product &&
    (product.discount === 0
      ? product.price
      : product.price - product.price * (product.discount / 100));

  useEffect(() => {
    axios
      .get(`${baseURL}products?code=${product_code}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [product_code]);

  return (
    <>
      <svg className="hidden">
        <symbol
          id="heart-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </symbol>
        <symbol
          id="bookmark-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
            clipRule="evenodd"
          />
        </symbol>
        <symbol
          id="star-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </symbol>
        <symbol
          id="heart"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </symbol>
        <symbol
          id="bookmark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
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
        <symbol
          id="exclamation-circle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </symbol>
      </svg>

      {/* Loader */}
      {!product && <div>در حال بارگذاری داده‌ها...</div>}

      {product && (
        <>
          {/* <!-- Cart Body --> */}
          <div className="flex flex-col lg:flex-row w-full p-5 md:p-10 shadow-normal rounded-2xl bg-white dark:bg-zinc-700">
            {/* <!-- Right Image Save  --> */}
            <div className="flex flex-col gap-y-10 mb-10 md:mb-0">
              {/* <!-- Proposal --> */}
              {product.discount !== 0 && (
                <div className="flex items-center justify-between px-5 py-3 text-sm md:text-base lg:text-lg text-orange-400 dark:text-orange-600 bg-orange-200/60 dark:bg-orange-300 rounded-xl">
                  <div className="flex items-center justify-between gap-x-1.5">
                    <svg className="w-5 h-5">
                      <use href="#clock"></use>
                    </svg>
                    <span>پیشنهاد ویژه</span>
                  </div>

                  <Clock clock={product.clock} showClock={false} />
                </div>
              )}

              {/* <!-- Picture --> */}
              <div className="flex items-start justify-center gap-x-2">
                <div className="flex flex-col gap-y-2">
                  {/* <!-- Star --> */}
                  <div
                    className={`group flex items-center justify-center w-12 h-12 rounded-xl ${
                      saveComment ? "text-red-500" : "text-orange-300"
                    } border border-gray-300`}
                    onClick={handleShowComment}
                  >
                    <svg className="w-5 h-5 group-hover:scale-125 transition-all">
                      <use href="#star-solid"></use>
                    </svg>
                  </div>
                  <div
                    className={`group flex items-center justify-center w-12 h-12 rounded-xl ${
                      like ? "text-red-500" : "text-orange-300"
                    } border border-gray-300`}
                    onClick={handleStar}
                  >
                    <svg className="w-5 h-5 group-hover:scale-125 transition-all">
                      <use href="#heart-solid"></use>
                    </svg>
                  </div>
                  <div
                    className={`group flex items-center justify-center w-12 h-12 rounded-xl ${
                      bootmark ? "text-red-500" : "text-orange-300"
                    } border border-gray-300`}
                    onClick={handleBootmark}
                  >
                    <svg className="w-5 h-5 group-hover:scale-125 transition-all">
                      <use href="#bookmark-solid"></use>
                    </svg>
                  </div>
                </div>
                <Image
                  className="md:w-72 md:h-72 rounded-xl object-cover"
                  src={product.image[0].replaceAll("/utils", "")}
                  alt="product"
                  width={240}
                  height={240}
                  loading="lazy"
                />
              </div>

              {/* <!-- Pictures --> */}
              <div className="flex items-center justify-center gap-x-2">
                <div className="flex items-center justify-center gap-x-2 text-gray-300 dark:text-gray-400">
                  {Array.from(
                    {
                      length:
                        product.image.length <= 4
                          ? product.image.length - 1
                          : 4,
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
                          src={product.image[index + 1].replaceAll(
                            "/utils",
                            ""
                          )}
                          alt="product"
                          width={64}
                          height={64}
                          loading="lazy"
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
              </div>
            </div>

            {/* <!-- Left Description Discount Star --> */}
            <div className="w-full md:mt-10 lg:mt-0 lg:pl-6 lg:pr-16">
              {/* <!-- Left Header --> */}
              <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between">
                <div className="space-y-5">
                  <div className="w-full flex flex-col xl:flex-row items-start xl:items-center justify-start gap-x-6 text-sm md:text-base lg:text-lg">
                    <div className="flex gap-x-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        برند:
                      </span>
                      <Link
                        className="text-orange-300"
                        href={`/products/brand/${product.brand}`}
                      >
                        {product.brand}
                      </Link>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        دسته بندی:
                      </span>
                      <Link
                        className="text-orange-300 line-clamp-1"
                        href={`/products/category/${product.category}`}
                      >
                        {product.category}
                      </Link>
                    </div>
                  </div>

                  <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl text-black dark:text-white line-clamp-2">
                    {product.productName}
                  </h4>
                </div>

                <div className="flex gap-x-2 text-gray-700 dark:text-gray-300 order-first xl:order-none text-sm md:text-base lg:text-lg">
                  <span>شناسه کالا:</span>
                  <span>{product.code}</span>
                </div>
              </div>

              {/* <!-- Line --> */}
              <div className="w-full h-px my-5 bg-gray-300"></div>

              {/* <!-- Left Body --> */}
              <div className="flex flex-col xl:flex-row items-start justify-between">
                {/* <!-- Right Description --> */}
                <div className="text-black dark:text-white">
                  <h4 className="font-DanaBold mb-4 text-base md:text-lg lg:text-xl">
                    مشخصات
                  </h4>

                  <div className="flex flex-col gap-y-2.5 gap-x-2.5 text-sm md:text-base lg:text-lg">
                    {product.attributes.map((property, index) => {
                      return <span key={index}>{property}</span>;
                    })}
                    {product.colors && (
                      <div className="flex flex-col">
                        <span className="mb-1">رنگ :</span>
                        <div className="flex items-center justify-center gap-x-1 gap-y-1 text-xs md:text-sm lg:text-base flex-wrap">
                          {product.colors.map((color, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-center w-25 h-15 gap-x-2 py-1 px-1.5 rounded-xl border border-gray-300"
                              >
                                <span
                                  className="w-4 h-4 rounded"
                                  style={{ backgroundColor: `#${color[1]}` }}
                                ></span>
                                {color[0]}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <!-- Left Discount Star --> */}
                <div className="w-full xl:w-auto flex flex-col md:flex-row xl:flex-col md:items-start md:justify-between">
                  <div className="mt-10 xl:mt-0 flex flex-col items-start justify-center text-black dark:text-white">
                    <h4 className="mb-4 font-DanaBold text-base md:text-lg lg:text-xl">
                      قیمت
                    </h4>

                    <div className="space-y-2.5 text-sm md:text-base lg:text-lg">
                      <div className="flex items-center justify-start gap-x-2 py-1 px-2.5 rounded-xl border border-gray-300">
                        <span>تخفیف :</span>

                        <div className="text-gray-500 dark:text-gray-300 line-through decoration-red-400 decoration-[1.5px]">
                          {product.discount === 0
                            ? 0
                            : Number(product.price).toLocaleString()}
                          <span className="pr-1">تومان</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-start gap-x-2 py-1 px-2.5 rounded-xl border border-gray-300">
                        <span>قیمت :</span>
                        <div className="font-DanaBold">
                          {Number(finalPrice).toLocaleString()}
                          <span className="font-Dana pr-1">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 xl:mt-16 flex flex-col items-start justify-center">
                    <h4 className="font-DanaBold mb-4 text-base md:text-lg lg:text-xl text-black dark:text-white">
                      امتیازات
                    </h4>

                    <div className="space-y-2.5 text-sm md:text-base lg:text-lg">
                      <div className="flex items-center justify-between w-24 md:w-30 lg:w-36 gap-x-2 py-1 px-4 rounded-xl border border-gray-300">
                        {/* <!-- Star --> */}
                        <div className="flex text-gray-300 dark:text-gray-400">
                          <svg className="mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-yellow-400">
                            <use href="#star"></use>
                          </svg>
                        </div>

                        <span className="pt-1 text-gray-700 dark:text-white">
                          {product.star}
                        </span>
                      </div>

                      <div className="flex items-center justify-between w-24 md:w-30 lg:w-36 gap-x-2 py-1 px-4 rounded-xl border border-gray-300">
                        {/* <!-- heart --> */}
                        <div className="flex text-red-500">
                          <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                            <use href="#heart"></use>
                          </svg>
                        </div>

                        <div
                          className="flex pt-1 gap-x-1.5 text-gray-700 dark:text-white"
                          style={{ direction: "ltr" }}
                        >
                          {product.like > 1000
                            ? `${(product.like / 1000)
                                .toFixed(1)
                                .replace(/\.0$/, "")} k`
                            : product.like}
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-24 md:w-30 lg:w-36 gap-x-2 py-1 px-4 rounded-xl border border-gray-300">
                        {/* <!-- bookmark --> */}
                        <div className="flex text-green-900 dark:text-green-700">
                          <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                            <use href="#bookmark"></use>
                          </svg>
                        </div>

                        <div
                          className="flex pt-1 gap-x-1.5 text-gray-700 dark:text-white"
                          style={{ direction: "ltr" }}
                        >
                          {product.bootmark > 1000
                            ? `${(product.bootmark / 1000)
                                .toFixed(1)
                                .replace(/\.0$/, "")} k`
                            : product.bootmark}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AlertPictures
            showPicture={showPicture}
            handleShowPicture={handleShowPicture}
            product_code={product_code}
          />
          <NoScroll noScroll={showPicture} />

          <AlertComment
            showComment={showComment}
            handleShowComment={handleShowComment}
            handleSaveComment={handleSaveComment}
          />
          <NoScroll noScroll={showComment} />

          <AlertSave
            textAlert="نظر شما ثبت شد !"
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />

          <div
            className={`${
              showPicture || showComment
                ? "visible opacity-100"
                : "invisible opacity-0"
            } overlay-alert`}
            onClick={closeAlert}
          ></div>
        </>
      )}
    </>
  );
};

export default CartProduct;
