"use client";

import Image from "next/image";
import Link from "next/link";
import { getBlurDataURL, getToastType } from "@/utils/helper";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { action_delete } from "@/actions/profile/information";

interface CardProductProps {
  code: string;
  image: string[];
  product_name: string;
  finalPrice: number;
  price: number;
  discount: number;
}

const CardProduct: React.FC<CardProductProps> = ({
  code,
  image,
  product_name,
  finalPrice,
  price,
  discount,
}) => {
  const pathname = usePathname();  
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (code: string) => {
    setLoading(true);
    const data = await action_delete(pathname, code);
    if (data) {
      toast(data.message, { type: getToastType(data.status) });
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-zinc-700 border border-gray-300 rounded-2xl">
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

        {/* <!-- discount percent  --> */}
        {discount !== 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-10 lg:w-[3.375rem] h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaBold bg-orange-300 text-white dark:text-zinc-700 rounded-3xl pt-1">
            {discount}%
          </span>
        )}
      </div>

      {/* <!-- Cart Title --> */}
      <h5 className="font-DanaMedium text-sm/7 lg:text-xl/7 min-h-14 text-zinc-700 dark:text-white line-clamp-2">
        {product_name}
      </h5>

      {/* <!-- Cart Price --> */}
      <div className="flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
        <div className="text-teal-600 dark:text-emerald-500">
          <span className="font-DanaBold text-base lg:text-xl">
            {" "}
            {Number(finalPrice).toLocaleString()}
          </span>
          <span className="pr-0.5 text-xs md:text-sm tracking-tighter">
            تومان
          </span>
          {discount !== 0 && (
            <div className="mr-2 text-xs md:text-sm text-gray-400 line-through lg:text-base decoration-red-500 decoration-1">
              <span className="">{Number(price).toLocaleString()}</span>
              <span className="hidden lg:inline">تومان</span>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Cart Footer --> */}
      <div className="flex items-center justify-between mt-1.5 md:mt-2.5">
        <Link
          className="p-2 border border-gray-300 rounded-xl child-hover:text-green-500 child-hover:scale-110 child:transition-all"
          href={`/products/${code}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6 text-gray-500 dark:text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <button
          className="p-2 border border-gray-300 rounded-xl child-hover:text-red-500 child-hover:scale-110 child:transition-all"
          onClick={() => handleDelete(code)}
        >
          {loading ? (
            <svg
              aria-hidden="true"
              className="size-4 md:size-5 lg:size-6 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-500 dark:text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
