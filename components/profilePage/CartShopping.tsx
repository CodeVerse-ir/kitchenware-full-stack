import { getBlurDataURL } from "@/utils/helper";
import Image from "next/image";

const CartShopping = () => {
  return (
    <div className="flex items-center justify-between w-full h-25 lg:h-30 sm:border border-gray-400 rounded-lg overflow-hidden">
      <div className="hidden xs:inline-block w-20 lg:w-24 h-full">
        <Image
          className="mx-auto md:w-auto"
          src="/image/profile/avatar.png"
          // src={image[0]}
          alt={`product `}
          // alt={`product ${code}`}
          width={128}
          height={120}
          sizes="(min-width: 768px)"
          loading="lazy"
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-y-2 p-4">
        <div className="flex items-start justify-between w-full">
          <div className="font-DanaMedium text-xs md:text-sm lg:text-base">
            پاستا سبزیجات
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
        <div className="flex items-end justify-between w-full gap-x-5">
          <div className="flex items-center justify-between px-1 w-16 h-6 md:w-20 md:h-8 text-orange-500 bg-orange-100 rounded-lg select-none">
            <button
            // onClick={() =>
            //   quantity < product.quantity_in_stock &&
            //   setQuantity((prevQty) => prevQty + 1)
            // }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 md:size-5 hover:text-orange-400 transition-colors duration-150"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </button>

            <span className="mt-1">{2}</span>
            {/* <span className="mt-1">{quantity}</span> */}

            <button
            // onClick={() =>
            //   quantity > 1 && setQuantity((prevQty) => prevQty - 1)
            // }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 md:size-5 hover:text-orange-400 transition-colors duration-150"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-end justify-center gap-y-2">
            <div className="flex items-center justify-center gap-x-2">
              <div className="text-xs md:text-sm text-gray-400 line-through decoration-gray-400 decoration-1">
                175,000
              </div>
              <div className="text-xs md:text-sm px-2 pt-1 text-orange-500 bg-orange-100 rounded-full">
                %20
              </div>
            </div>
            <div className="text-xs md:text-sm lg:text-base text-zinc-800 dark:text-white">
               175,000 تومان
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShopping;
