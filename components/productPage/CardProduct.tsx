import Image from "next/image";
import Link from "next/link";
import { checkDiscountStatus, getBlurDataURL } from "@/utils/helper";

// components
import Clock from "../common/Clock";
import Star from "./Star";
import Like from "./Like";
import Bookmark from "./Bookmark";
import Pictures from "./Pictures";
import ShoppingCart from "./ShoppingCart";

interface CartProductProps {
  product: {
    discount: {
      percent: number;
      start_time: string;
      end_time: string;
    };
    image: string[];
    brand: string;
    category: string;
    productName: string;
    code: string;
    attributes: string[];
    colors: [];
    price: number;
    star: number;
    like: number;
    bootmark: number;
    quantity_in_stock: number;
  };
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const finalPrice =
    product &&
    (checkDiscountStatus(product.discount)
      ? product.price - product.price * (product.discount.percent / 100)
      : product.price);

  return (
    <div className="flex flex-col lg:flex-row w-full p-5 md:p-10 shadow-normal rounded-2xl bg-white dark:bg-zinc-700">
      {/* <!-- Right Image Save  --> */}
      <div className="flex flex-col gap-y-10 mb-10 md:mb-0">
        {/* <!-- Proposal --> */}
        {checkDiscountStatus(product.discount) && (
          <div className="flex items-center justify-between px-5 py-3 text-sm md:text-base lg:text-lg text-orange-400 dark:text-orange-600 bg-orange-200/60 dark:bg-orange-300 rounded-xl">
            <div className="flex items-center justify-between gap-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>پیشنهاد ویژه</span>
            </div>

            <Clock discount={product.discount} showClock={false} />
          </div>
        )}

        {/* <!--  Star & like & bookmark --> */}
        <div className="flex items-start justify-center gap-x-2">
          <div className="flex flex-col gap-y-2">
            <Star />
            <Like />
            <Bookmark />
          </div>
          <Image
            className="md:w-72 md:h-72 rounded-xl object-cover"
            src={product.image[0]}
            alt="product"
            width={240}
            height={240}
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
        </div>

        {/* <!-- Pictures --> */}
        <Pictures image={product.image} />
      </div>

      {/* <!-- Left Description Discount Star --> */}
      <div className="w-full md:mt-10 lg:mt-0 lg:pl-6 lg:pr-16">
        {/* <!-- Left Header --> */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between">
          <div className="space-y-5">
            <div className="w-full flex flex-col xl:flex-row items-start xl:items-center justify-start gap-x-6 text-sm md:text-base lg:text-lg">
              <div className="flex gap-x-2">
                <span className="text-gray-700 dark:text-gray-300">برند:</span>
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
          <div className="flex flex-col items-start justify-start gap-y-10 text-black dark:text-white">
            <div>
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

            <div>
              <h4 className="font-DanaBold mb-4 text-base md:text-lg lg:text-xl">
                سبد خرید
              </h4>
              <ShoppingCart product={product} />
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
                    {checkDiscountStatus(product.discount)
                      ? Number(product.price).toLocaleString()
                      : 0}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-1 size-4 md:size-5 lg:size-6 text-yellow-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>

                  <span className="pt-1 text-gray-700 dark:text-white">
                    {product.star}
                  </span>
                </div>

                <div className="flex items-center justify-between w-24 md:w-30 lg:w-36 gap-x-2 py-1 px-4 rounded-xl border border-gray-300">
                  {/* <!-- heart --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-5 lg:size-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-5 lg:size-6 text-green-900 dark:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>

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
  );
};

export default CartProduct;
