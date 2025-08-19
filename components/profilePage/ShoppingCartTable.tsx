import { Dispatch, SetStateAction } from "react";
import { checkDiscountStatus } from "@/utils/helper";

// components
import EmptyCard from "./EmptyCard";

interface CartItem {
  discount: {
    percent: number;
    start_time: string;
    end_time: string;
  };
  image: string[];
  brand: string;
  category: string;
  product_name: string;
  code: string;
  attributes: string[];
  colors: [];
  price: number;
  star: number;
  like: number;
  bookmark: number;
  quantity_in_stock: number;
}

interface ShoppingCartTableProps {
  btn_text: string;
  btn_svg: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  carts: Array<CartItem & { quantity: number }>;
  totalAmount: number;
  totalDiscount: number;
  postage_fee: number;
  handleChangeStep: () => void;
}

const ShoppingCartTable: React.FC<ShoppingCartTableProps> = ({
  btn_text,
  btn_svg,
  step,
  setStep,
  carts,
  totalAmount,
  totalDiscount,
  postage_fee,
  handleChangeStep,
}) => {
  const carts_length = carts.length;

  return (
    <div className="w-full xs:w-[350px] rounded-lg border border-gray-400 p-6">
      <div className="text-xs md:text-sm lg:text-base text-zinc-700 dark:text-gray-300">
        سبد خرید ({carts_length})
      </div>

      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>

      <div className="w-full h-28 space-y-2 overflow-y-scroll pl-2 py-1">
        {carts_length ? (
          carts.map((cart, index) => {
            const finalPrice = checkDiscountStatus(cart.discount)
              ? cart.price - cart.price * (cart.discount.percent / 100)
              : cart.price;

            return (
              <div key={index}>
                <div className="flex items-center justify-between w-full h-12 p-1">
                  <div className="flex items-start justify-start w-30 h-8 md:h-10 text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {cart.product_name}
                  </div>
                  <div className="flex flex-col items-end justify-center text-gray-500 dark:text-gray-400 gap-y-1">
                    <div className="text-xs md:text-sm">
                      {(finalPrice * cart.quantity).toLocaleString()} تومان
                    </div>
                    <div className="text-xs md:text-sm">
                      تعداد : {cart.quantity}
                    </div>
                  </div>
                </div>

                {/* <!-- Line --> */}
                {carts_length - 1 !== index && (
                  <div className="w-full h-px my-1 bg-orange-300"></div>
                )}
              </div>
            );
          })
        ) : (
          <EmptyCard
            text="شما در حال حاضر هیچ محصولی را انتخاب نکرده‌اید!"
            link={{ href: "/products", text: "جستجوی محصولات" }}
          />
        )}
      </div>

      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>

      <div className="flex items-center justify-between w-full">
        <div className="text-xs md:text-sm lg:text-base text-zinc-700 dark:text-gray-300">
          تخفیف محصولات
        </div>
        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
          {totalDiscount.toLocaleString()} تومان
        </div>
      </div>
      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs md:text-sm lg:text-base text-zinc-700 dark:text-gray-300">
            هزینه ارسال
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            {postage_fee.toLocaleString()} تومان
          </div>
        </div>
      </div>
      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs md:text-sm lg:text-base text-zinc-800 dark:text-gray-300">
            مبلغ قابل پرداخت
          </div>
          <div className="text-xs md:text-sm lg:text-base text-green-600">
            {(totalAmount + postage_fee).toLocaleString()} تومان
          </div>
        </div>
        <button
          onClick={handleChangeStep}
          className="flex items-center justify-center w-full h-8 md:h-10 gap-x-1 text-center text-xs md:text-sm lg:text-base rounded-lg text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150"
        >
          {btn_svg}
          <div>{btn_text}</div>
        </button>
        <button
          onClick={() => setStep(step - 1)}
          className="text-xs md:text-sm lg:text-base text-gray-500 dark:text-gray-400"
        >
          برگشت
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartTable;
