import { Dispatch, SetStateAction } from "react";
// import { RootState } from "@/redux/store";

// components
import CartShopping from "./CartShopping";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import EmptyCard from "./EmptyCard";
import Modal from "../common/Modal";

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

interface ShoppingBodyProps {
  setStep: Dispatch<SetStateAction<number>>;
  carts: Array<CartItem & { quantity: number }>;
  totalAmount: number;
  totalDiscount: number;
}

const ShoppingBody: React.FC<ShoppingBodyProps> = ({
  setStep,
  carts,
  totalAmount,
  totalDiscount,
}) => {
  const dispatch = useDispatch();

  const carts_length = carts.length;

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-x-10 gap-y-5 md:mt-10">
      <div className="w-full xs:w-[350px] md:w-[500px] xl:h-96 max-h-96 p-2 md:p-4 lg:p-6 space-y-4 rounded-lg border border-gray-400 overflow-y-scroll">
        {carts_length ? (
          carts.map((cart, index) => (
            <div key={index}>
              <CartShopping
                code={cart.code}
                product_name={cart.product_name}
                image={cart.image}
                price={cart.price}
                discount={cart.discount}
                quantity_in_stock={cart.quantity_in_stock}
                quantity={cart.quantity}
              />
              {/* <!-- Line --> */}
              {carts_length - 1 !== index && (
                <div className="sm:hidden w-full h-px my-1 bg-gray-300"></div>
              )}
            </div>
          ))
        ) : (
          <EmptyCard
            text="شما در حال حاضر هیچ محصولی را انتخاب نکرده‌اید!"
            link={{ href: "/products", text: "جستجوی محصولات" }}
          />
        )}
      </div>
      {/* letf div */}
      <div className="w-full xs:w-[350px] rounded-lg border border-gray-400 p-6">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs md:text-sm lg:text-base text-zinc-700 dark:text-gray-300">
            سبد خرید ({carts_length})
          </div>

          {/* btn delete all products */}
          <Modal
            modalId={"delete all"}
            btn_type="button"
            btn_style="hover:text-red-500 transition-colors duration-300"
            btn_text=""
            btn_svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3.5 md:size-4 lg:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            }
            title="حذف محصولات"
            text="آیا از حذف همه محصولات مطمئن هستید؟"
            onConfirm={() => dispatch(clearCart())}
            isPending={false}
          />
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
              ۰ تومان
            </div>
          </div>
          <div className="flex items-start justify-between w-full gap-x-1 text-xs md:text-sm text-orange-400">
            <div className="flex flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3 md:size-4 lg:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="text-justify">
              هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما
              محاسبه و به این مبلغ اضافه خواهد شد.
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
              {totalAmount.toLocaleString()} تومان
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            className="flex items-center justify-center w-full h-8 md:h-10 text-center text-xs md:text-sm lg:text-base rounded-lg text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150"
          >
            <div>تکمیل اطلاعات</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBody;
