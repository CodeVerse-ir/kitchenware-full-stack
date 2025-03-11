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
    <Link
      href={`/product/${code}`}
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
  );
};

export default CardProduct;
