import Image from "next/image";
import Link from "next/link";
import { getBlurDataURL } from "@/utils/helper";

// components
import Clock from "./Clock";

interface CardProductProps {
  code: string;
  image: string[];
  product_name: string;
  finalPrice: number;
  price: number;
  discount: number;
  star: number;
  clock: string;
}

const CardProduct: React.FC<CardProductProps> = ({
  code,
  image,
  product_name,
  finalPrice,
  price,
  discount,
  star,
  clock,
}) => {
  return (
    <>
      {/* icons */}
      <svg className="hidden">
        <symbol
          id="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
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

      <Link
        href={`/products/${code}`}
        key={code}
        className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
      >
        <div className="relative mb-2 md:mb-5">
          <Image
            className="mx-auto md:w-auto"
            src={image[0]}
            alt={`product ${code}`}
            width={128}
            height={128}
            sizes="(min-width: 768px)"
            loading="lazy"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          {discount !== 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center w-10 lg:w-[3.375rem] h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaBold bg-orange-300 text-white dark:text-zinc-700 rounded-3xl pt-1">
              {discount}%
            </span>
          )}
        </div>

        {/* Cart Title */}
        <h5 className="font-DanaMedium text-sm/7 lg:text-xl/7 min-h-14 text-zinc-700 dark:text-white line-clamp-2">
          {product_name}
        </h5>

        {/* Cart Price */}
        <div className="flex items-center justify-start gap-x-1.5 md:gap-x-2 mt-1.5 md:mt-2.5">
          <div className="text-teal-600 dark:text-emerald-500">
            <span className="font-DanaBold text-base lg:text-xl">
              {Number(finalPrice).toLocaleString()}
            </span>
            <span className="pr-1 text-xs md:text-sm tracking-tighter">
              تومان
            </span>
          </div>
          {discount !== 0 && (
            <div className="mr-2 text-xs md:text-sm text-gray-400 line-through lg:text-base decoration-red-500 decoration-1">
              <span className="">{Number(price).toLocaleString()}</span>
              <span className="hidden lg:inline">تومان</span>
            </div>
          )}
        </div>

        {/* Cart Footer */}
        <div className="flex items-center justify-between gap-x-1 mt-1.5 md:mt-2.5">
          {/* Star */}
          <div className="flex text-gray-300 dark:text-gray-400">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
                  index < star ? "text-yellow-400" : ""
                }`}
              >
                <use href="#star"></use>
              </svg>
            ))}
          </div>

          {/* Timer */}
          {discount !== 0 && <Clock clock={clock} showClock={true} />}
        </div>
      </Link>
    </>
  );
};

export default CardProduct;
