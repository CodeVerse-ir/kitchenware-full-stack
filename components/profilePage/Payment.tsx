import { Dispatch, SetStateAction, useState } from "react";
  
// components
import ShoppingCartTable from "./ShoppingCartTable";
import SubmitBtn from "../common/SubmitBtn";
import ImageRadioSelector from "./ImageRadioSelector";

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
  bootmark: number;
  quantity_in_stock: number;
}

interface PaymentProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  carts: Array<CartItem & { quantity: number }>;
  totalAmount: number;
  totalDiscount: number;
  order: string;
  address: string;
  description: string;
  postage_fee: number;
}

const imageOptions = [
  {
    id: "1",
    imageUrl: "/image/payment/saman.png",
    altText: "Option 1",
  },
  {
    id: "2",
    imageUrl: "/image/payment/mellat.png",
    altText: "Option 2",
  },
  {
    id: "3",
    imageUrl: "/image/payment/parsian.png",
    altText: "Option 2",
  },
];

const Payment: React.FC<PaymentProps> = ({
  step,
  setStep,
  carts,
  totalAmount,
  totalDiscount,
  order,
  address,
  description,
  postage_fee,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("internet_payment");

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleImageSelect = (selectedId: string) => {
    console.log("Selected image ID:", selectedId);
  };

  const handleChangeStep = () => {
    console.log(order);
    console.log(address);
    console.log(description);
    // output
  };

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-x-10 gap-y-5 md:mt-10">
      <div className="flex flex-col items-center justify-center gap-y-4 w-full xs:w-[350px] md:w-[500px]">
        {/* discount_code */}
        <div className="flex flex-col items-center justify-center w-full gap-y-2 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 rounded-lg border border-gray-400">
          <div className="flex items-center justify-start w-full gap-x-1 text-zinc-800 dark:text-gray-300 text-xs md:text-sm lg:text-base">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 md:size-5 lg:size-6"
            >
              <path
                d="M12 23.25C11.37 23.25 10.78 23.01 10.34 22.56L8.82001 21.04C8.70001 20.92 8.38 20.79 8.22 20.79H6.06C4.76 20.79 3.70999 19.7399 3.70999 18.4399V16.28C3.70999 16.12 3.57999 15.8 3.45999 15.68L1.94 14.16C1.5 13.72 1.25 13.13 1.25 12.5C1.25 11.87 1.49 11.2799 1.94 10.8399L3.45999 9.31991C3.57999 9.19991 3.70999 8.87994 3.70999 8.71994V6.56002C3.70999 5.26002 4.76 4.20993 6.06 4.20993H8.22C8.38 4.20993 8.70001 4.07993 8.82001 3.95993L10.34 2.43991C11.22 1.55991 12.78 1.55991 13.66 2.43991L15.18 3.95993C15.3 4.07993 15.62 4.20993 15.78 4.20993H17.94C19.24 4.20993 20.29 5.26002 20.29 6.56002V8.71994C20.29 8.87994 20.42 9.19991 20.54 9.31991L22.06 10.8399C22.5 11.2799 22.75 11.87 22.75 12.5C22.75 13.13 22.51 13.72 22.06 14.16L20.54 15.68C20.42 15.8 20.29 16.12 20.29 16.28V18.4399C20.29 19.7399 19.24 20.79 17.94 20.79H15.78C15.62 20.79 15.3 20.92 15.18 21.04L13.66 22.56C13.22 23.01 12.63 23.25 12 23.25ZM4.51999 14.62C4.91999 15.02 5.20999 15.72 5.20999 16.28V18.4399C5.20999 18.9099 5.59 19.29 6.06 19.29H8.22C8.78 19.29 9.48001 19.5799 9.88 19.9799L11.4 21.5C11.72 21.82 12.28 21.82 12.6 21.5L14.12 19.9799C14.52 19.5799 15.22 19.29 15.78 19.29H17.94C18.41 19.29 18.79 18.9099 18.79 18.4399V16.28C18.79 15.72 19.08 15.02 19.48 14.62L21 13.0999C21.16 12.9399 21.25 12.73 21.25 12.5C21.25 12.27 21.16 12.06 21 11.9L19.48 10.38C19.08 9.97997 18.79 9.27994 18.79 8.71994V6.56002C18.79 6.09002 18.41 5.70993 17.94 5.70993H15.78C15.22 5.70993 14.52 5.41999 14.12 5.01999L12.6 3.49997C12.28 3.17997 11.72 3.17997 11.4 3.49997L9.88 5.01999C9.48001 5.41999 8.78 5.70993 8.22 5.70993H6.06C5.59 5.70993 5.20999 6.09002 5.20999 6.56002V8.71994C5.20999 9.27994 4.91999 9.97997 4.51999 10.38L3 11.9C2.84 12.06 2.75 12.27 2.75 12.5C2.75 12.73 2.84 12.9399 3 13.0999L4.51999 14.62Z"
                fill="CurrentColor"
              />
              <path
                d="M15.0002 16.5C14.4402 16.5 13.9902 16.05 13.9902 15.5C13.9902 14.95 14.4402 14.5 14.9902 14.5C15.5402 14.5 15.9902 14.95 15.9902 15.5C15.9902 16.05 15.5502 16.5 15.0002 16.5Z"
                fill="CurrentColor"
              />
              <path
                d="M9.01001 10.5C8.45001 10.5 8 10.05 8 9.5C8 8.95 8.45 8.5 9 8.5C9.55 8.5 10 8.95 10 9.5C10 10.05 9.56001 10.5 9.01001 10.5Z"
                fill="CurrentColor"
              />
              <path
                d="M8.99994 16.25C8.80994 16.25 8.61994 16.18 8.46994 16.03C8.17994 15.74 8.17994 15.2599 8.46994 14.9699L14.4699 8.96994C14.7599 8.67994 15.2399 8.67994 15.5299 8.96994C15.8199 9.25994 15.8199 9.74 15.5299 10.03L9.52994 16.03C9.37994 16.18 9.18994 16.25 8.99994 16.25Z"
                fill="CurrentColor"
              />
            </svg>

            <div>ثبت کد تخفیف</div>
          </div>
          {/* <!-- Line --> */}
          <div className="w-full h-px my-1 bg-gray-300"></div>
          <div className="flex items-center justify-center w-full gap-x-4">
            <input
              className="flex items-center justify-start w-full h-8 md:h-10 lg:h-11 p-2 text-black dark:text-white text-xs md:text-sm lg:text-base bg-transparent rounded border border-gray-400 focus:border-orange-300 transition-colors duration-150 outline-none"
              type="text"
              id="discount_code"
              name="discount_code"
              autoComplete="off"
              placeholder="کد تخفیف"
              // value={dataFullName.mobile_number}
              // onChange={handleMobile_number}
            />
            <SubmitBtn
              title="ثبت کد"
              style="h-8 md:h-10 lg:h-11 px-4 py-2 text-center rounded-md text-white text-nowrap text-xs md:text-sm lg:text-base bg-orange-400 hover:bg-orange-500 transition-colors duration-150 outline-none"
              // isPending={isPending}
              isPending={false}
            />
          </div>
        </div>

        {/* Order delivery method */}
        <div className="flex flex-col items-center justify-center w-full gap-y-2 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 rounded-lg border border-gray-400">
          <div className="flex items-center justify-start w-full gap-x-1 text-zinc-800 dark:text-gray-300 text-xs md:text-sm lg:text-base">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 md:size-5 lg:size-6"
            >
              <path
                d="M7.1698 23.25C4.7898 23.25 2.83984 21.52 2.83984 19.39V17.35C2.83984 16.94 3.17984 16.6 3.58984 16.6C3.99984 16.6 4.33984 16.94 4.33984 17.35C4.33984 18.6 5.5498 19.54 7.1698 19.54C8.7898 19.54 9.99982 18.6 9.99982 17.35C9.99982 16.94 10.3398 16.6 10.7498 16.6C11.1598 16.6 11.4998 16.94 11.4998 17.35V19.39C11.4998 21.52 9.5598 23.25 7.1698 23.25ZM4.59979 20.37C5.03979 21.19 6.0298 21.75 7.1698 21.75C8.3098 21.75 9.29981 21.18 9.73981 20.37C9.02981 20.8 8.1498 21.05 7.1698 21.05C6.1898 21.05 5.30979 20.8 4.59979 20.37Z"
                fill="currentColor"
              />
              <path
                d="M7.1698 18.2999C5.5298 18.2999 4.05983 17.5499 3.32983 16.3599C3.00983 15.8399 2.83984 15.2299 2.83984 14.6099C2.83984 13.5599 3.29983 12.5799 4.13983 11.8499C5.75983 10.4299 8.54981 10.43 10.1798 11.84C11.0198 12.58 11.4898 13.5599 11.4898 14.6099C11.4898 15.2299 11.3198 15.8399 10.9998 16.3599C10.2798 17.5499 8.8098 18.2999 7.1698 18.2999ZM7.1698 12.2499C6.3898 12.2499 5.66982 12.5099 5.12982 12.9799C4.61982 13.4199 4.33984 13.9999 4.33984 14.6099C4.33984 14.9599 4.4298 15.28 4.6098 15.58C5.0698 16.34 6.0498 16.8099 7.1698 16.8099C8.2898 16.8099 9.26979 16.34 9.71979 15.59C9.89979 15.3 9.98981 14.9699 9.98981 14.6199C9.98981 14.0099 9.70983 13.4299 9.19983 12.9799C8.66983 12.5099 7.9498 12.2499 7.1698 12.2499Z"
                fill="currentColor"
              />
              <path
                d="M7.1698 21.05C4.6998 21.05 2.83984 19.46 2.83984 17.36V14.61C2.83984 12.48 4.7798 10.75 7.1698 10.75C8.2998 10.75 9.37982 11.14 10.1898 11.84C11.0298 12.58 11.4998 13.56 11.4998 14.61V17.36C11.4998 19.46 9.6398 21.05 7.1698 21.05ZM7.1698 12.25C5.6098 12.25 4.33984 13.31 4.33984 14.61V17.36C4.33984 18.61 5.5498 19.55 7.1698 19.55C8.7898 19.55 9.99982 18.61 9.99982 17.36V14.61C9.99982 14 9.71984 13.42 9.20984 12.97C8.66984 12.51 7.9498 12.25 7.1698 12.25Z"
                fill="currentColor"
              />
              <path
                d="M19.0399 15.2999C17.5299 15.2999 16.2499 14.1799 16.1299 12.7399C16.0499 11.9099 16.3499 11.0999 16.9499 10.5099C17.4499 9.98995 18.1599 9.69995 18.9099 9.69995H20.9999C21.9899 9.72995 22.7499 10.5099 22.7499 11.4699V13.53C22.7499 14.49 21.9899 15.2699 21.0299 15.2999H19.0399ZM20.9699 11.2H18.9199C18.5699 11.2 18.2499 11.3299 18.0199 11.5699C17.7299 11.8499 17.5899 12.2299 17.6299 12.6099C17.6799 13.2699 18.3199 13.7999 19.0399 13.7999H20.9999C21.1299 13.7999 21.2499 13.68 21.2499 13.53V11.4699C21.2499 11.3199 21.1299 11.21 20.9699 11.2Z"
                fill="currentColor"
              />
              <path
                d="M16.0002 21.75H13.5002C13.0902 21.75 12.7502 21.41 12.7502 21C12.7502 20.59 13.0902 20.25 13.5002 20.25H16.0002C18.5802 20.25 20.2502 18.58 20.2502 16V15.3H19.0402C17.5302 15.3 16.2502 14.18 16.1302 12.74C16.0502 11.91 16.3503 11.1 16.9503 10.51C17.4503 9.99001 18.1602 9.70001 18.9102 9.70001H20.2402V9C20.2402 6.66 18.8703 5.04998 16.6503 4.78998C16.4103 4.74998 16.2002 4.75 15.9902 4.75H6.99023C6.75023 4.75 6.52022 4.76999 6.29022 4.79999C4.09022 5.07999 2.74023 6.68 2.74023 9V11C2.74023 11.41 2.40023 11.75 1.99023 11.75C1.58023 11.75 1.24023 11.41 1.24023 11V9C1.24023 5.92 3.14027 3.69001 6.09027 3.32001C6.36027 3.28001 6.67023 3.25 6.99023 3.25H15.9902C16.2302 3.25 16.5402 3.26 16.8602 3.31C19.8102 3.65 21.7402 5.89 21.7402 9V10.45C21.7402 10.86 21.4002 11.2 20.9902 11.2H18.9102C18.5602 11.2 18.2403 11.33 18.0103 11.57C17.7203 11.85 17.5802 12.23 17.6202 12.61C17.6702 13.27 18.3103 13.8 19.0303 13.8H21.0002C21.4102 13.8 21.7502 14.14 21.7502 14.55V16C21.7502 19.44 19.4402 21.75 16.0002 21.75Z"
                fill="currentColor"
              />
            </svg>

            <div>روش پرداخت</div>
          </div>
          {/* <!-- Line --> */}
          <div className="w-full h-px my-1 bg-gray-300"></div>
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center justify-center gap-x-1 cursor-pointer">
              <input
                type="radio"
                name="payment_method"
                value="internet_payment"
                className="size-3.5 cursor-pointer"
                checked={paymentMethod === "internet_payment"}
                onChange={handlePaymentChange}
              />
              <div className="flex items-center justify-center gap-x-1 text-zinc-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                <div>پرداخت اینترنتی</div>

                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 md:size-5 lg:size-6"
                >
                  <path
                    d="M3.93012 17.13C3.74012 17.13 3.55012 17.06 3.40012 16.91C3.11012 16.62 3.11012 16.14 3.40012 15.85L15.3501 3.9C15.6401 3.61 16.1201 3.61 16.4101 3.9C16.7001 4.19 16.7001 4.67 16.4101 4.96L4.46012 16.92C4.32012 17.06 4.12012 17.13 3.93012 17.13Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.1 19.53C10.91 19.53 10.72 19.46 10.57 19.31C10.28 19.02 10.28 18.54 10.57 18.25L11.77 17.05C12.06 16.76 12.54 16.76 12.83 17.05C13.12 17.34 13.12 17.82 12.83 18.11L11.63 19.31C11.49 19.45 11.3 19.53 11.1 19.53Z"
                    fill="currentColor"
                  />
                  <path
                    d="M13.79 16.84C13.6 16.84 13.41 16.77 13.26 16.62C12.97 16.33 12.97 15.85 13.26 15.56L15.65 13.17C15.94 12.88 16.42 12.88 16.71 13.17C17 13.46 17 13.94 16.71 14.23L14.32 16.62C14.18 16.76 13.98 16.84 13.79 16.84Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.0999 23.25C10.1199 23.25 9.13991 22.65 7.94991 21.46L3.03991 16.55C0.649914 14.16 0.659914 12.62 3.06991 10.21L9.70991 3.56998C12.1199 1.15998 13.6599 1.14998 16.0499 3.53998L20.9599 8.44998C23.3499 10.84 23.3399 12.38 20.9299 14.79L14.2899 21.43C13.0799 22.64 12.0899 23.25 11.0999 23.25ZM12.8999 3.24998C12.3799 3.24998 11.7199 3.67998 10.7699 4.62998L4.12991 11.27C3.17991 12.22 2.74991 12.88 2.74991 13.39C2.74991 13.91 3.14991 14.54 4.09991 15.49L9.00991 20.4C9.95991 21.35 10.5799 21.75 11.0999 21.75C11.0999 21.75 11.0999 21.75 11.1099 21.75C11.6299 21.75 12.2799 21.32 13.2299 20.37L19.8699 13.73C20.8199 12.78 21.2499 12.12 21.2499 11.61C21.2499 11.09 20.8499 10.46 19.8999 9.50998L14.9899 4.59998C14.0499 3.64998 13.4199 3.24998 12.8999 3.24998Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22 23.25H2C1.59 23.25 1.25 22.91 1.25 22.5C1.25 22.09 1.59 21.75 2 21.75H22C22.41 21.75 22.75 22.09 22.75 22.5C22.75 22.91 22.41 23.25 22 23.25Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </label>
            <label className="flex items-center justify-center gap-x-1 cursor-pointer">
              <input
                type="radio"
                name="payment_method"
                value="payment_on_the_spot"
                className="size-3.5 cursor-pointer"
                checked={paymentMethod === "payment_on_the_spot"}
                onChange={handlePaymentChange}
              />
              <div className="flex items-center justify-center gap-x-1 text-zinc-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                <div>پرداخت در محل</div>

                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 md:size-5 lg:size-6"
                >
                  <path
                    d="M13.5 10.25H7.5C7.09 10.25 6.75 9.91 6.75 9.5C6.75 9.09 7.09 8.75 7.5 8.75H13.5C13.91 8.75 14.25 9.09 14.25 9.5C14.25 9.91 13.91 10.25 13.5 10.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.5399 15.2999C18.0299 15.2999 16.7499 14.1799 16.6299 12.7399C16.5499 11.9099 16.8499 11.0999 17.4499 10.5099C17.9499 9.98995 18.6599 9.69995 19.4099 9.69995H21.4999C22.4899 9.72995 23.2499 10.5099 23.2499 11.4699V13.53C23.2499 14.49 22.4899 15.2699 21.5299 15.2999H19.5399ZM21.4699 11.2H19.4199C19.0699 11.2 18.7499 11.3299 18.5199 11.5699C18.2299 11.8499 18.0899 12.2299 18.1299 12.6099C18.1799 13.2699 18.8199 13.7999 19.5399 13.7999H21.4999C21.6299 13.7999 21.7499 13.68 21.7499 13.53V11.4699C21.7499 11.3199 21.6299 11.21 21.4699 11.2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.5 21.75H7.5C4.06 21.75 1.75 19.44 1.75 16V9C1.75 5.92 3.64998 3.69001 6.59998 3.32001C6.86998 3.28001 7.18 3.25 7.5 3.25H16.5C16.74 3.25 17.05 3.26 17.37 3.31C20.32 3.65 22.25 5.89 22.25 9V10.45C22.25 10.86 21.91 11.2 21.5 11.2H19.42C19.07 11.2 18.75 11.33 18.52 11.57L18.51 11.58C18.23 11.85 18.1 12.22 18.13 12.6C18.18 13.26 18.82 13.79 19.54 13.79H21.5C21.91 13.79 22.25 14.13 22.25 14.54V15.99C22.25 19.44 19.94 21.75 16.5 21.75ZM7.5 4.75C7.26 4.75 7.02999 4.76999 6.79999 4.79999C4.59999 5.07999 3.25 6.68 3.25 9V16C3.25 18.58 4.92 20.25 7.5 20.25H16.5C19.08 20.25 20.75 18.58 20.75 16V15.3H19.54C18.03 15.3 16.75 14.18 16.63 12.74C16.55 11.92 16.85 11.1 17.45 10.52C17.97 9.99002 18.67 9.70001 19.42 9.70001H20.75V9C20.75 6.66 19.38 5.04998 17.16 4.78998C16.92 4.74998 16.71 4.75 16.5 4.75H7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* Payment gateway */}
        {paymentMethod === "internet_payment" ? (
          <div className="flex flex-col items-center justify-center w-full gap-y-1 sm:gap-y-2 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 rounded-lg border border-gray-400">
            <div className="flex items-center justify-start w-full gap-x-1 text-zinc-800 dark:text-gray-300 text-xs md:text-sm lg:text-base">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 md:size-5 lg:size-6"
              >
                <path
                  d="M22 9.75H2C1.59 9.75 1.25 9.41 1.25 9C1.25 8.59 1.59 8.25 2 8.25H22C22.41 8.25 22.75 8.59 22.75 9C22.75 9.41 22.41 9.75 22 9.75Z"
                  fill="currentColor"
                />
                <path
                  d="M8 17.75H6C5.59 17.75 5.25 17.41 5.25 17C5.25 16.59 5.59 16.25 6 16.25H8C8.41 16.25 8.75 16.59 8.75 17C8.75 17.41 8.41 17.75 8 17.75Z"
                  fill="currentColor"
                />
                <path
                  d="M14.5 17.75H10.5C10.09 17.75 9.75 17.41 9.75 17C9.75 16.59 10.09 16.25 10.5 16.25H14.5C14.91 16.25 15.25 16.59 15.25 17C15.25 17.41 14.91 17.75 14.5 17.75Z"
                  fill="currentColor"
                />
                <path
                  d="M17.56 21.75H6.44C2.46 21.75 1.25 20.55 1.25 16.61V8.39C1.25 4.45 2.46 3.25 6.44 3.25H17.55C21.53 3.25 22.74 4.45 22.74 8.39V16.6C22.75 20.55 21.54 21.75 17.56 21.75ZM6.44 4.75C3.3 4.75 2.75 5.29 2.75 8.39V16.6C2.75 19.7 3.3 20.24 6.44 20.24H17.55C20.69 20.24 21.24 19.7 21.24 16.6V8.39C21.24 5.29 20.69 4.75 17.55 4.75H6.44Z"
                  fill="currentColor"
                />
              </svg>

              <div>درگاه پرداخت</div>
            </div>
            {/* <!-- Line --> */}
            <div className="w-full h-px my-1 bg-gray-300"></div>
            <ImageRadioSelector
              options={imageOptions}
              onChange={handleImageSelect}
              defaultSelected="1"
            />
            <div className="text-center text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">
              پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.‌
            </div>
            <div className="text-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              (لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-y-1 sm:gap-y-2 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 rounded-lg border border-gray-400">
            <div className="flex items-center justify-start w-full gap-x-1 text-zinc-800 dark:text-gray-300 text-xs md:text-sm lg:text-base">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 md:size-5 lg:size-6"
              >
                <path
                  d="M12 14.25C11.59 14.25 11.25 13.91 11.25 13.5V8.25C11.25 7.84 11.59 7.5 12 7.5C12.41 7.5 12.75 7.84 12.75 8.25V13.5C12.75 13.91 12.41 14.25 12 14.25Z"
                  fill="currentColor"
                />
                <path
                  d="M12 17.75C11.73 17.75 11.48 17.65 11.29 17.46C11.2 17.36 11.13 17.25 11.07 17.13C11.02 17.01 11 16.88 11 16.75C11 16.49 11.11 16.23 11.29 16.04C11.66 15.67 12.34 15.67 12.71 16.04C12.89 16.23 13 16.49 13 16.75C13 16.88 12.97 17.01 12.92 17.13C12.87 17.25 12.8 17.36 12.71 17.46C12.52 17.65 12.27 17.75 12 17.75Z"
                  fill="currentColor"
                />
                <path
                  d="M12.0002 23.25C11.3302 23.25 10.6502 23.08 10.0502 22.73L4.11017 19.3C2.91017 18.6 2.16016 17.31 2.16016 15.92V9.07999C2.16016 7.68999 2.91017 6.39999 4.11017 5.69999L10.0502 2.27C11.2502 1.57 12.7402 1.57 13.9502 2.27L19.8902 5.69999C21.0902 6.39999 21.8402 7.68999 21.8402 9.07999V15.92C21.8402 17.31 21.0902 18.6 19.8902 19.3L13.9502 22.73C13.3502 23.08 12.6702 23.25 12.0002 23.25ZM12.0002 3.24998C11.5902 3.24998 11.1702 3.35998 10.8002 3.56998L4.86017 6.99998C4.12017 7.42998 3.66016 8.21999 3.66016 9.07999V15.92C3.66016 16.77 4.12017 17.57 4.86017 18L10.8002 21.43C11.5402 21.86 12.4602 21.86 13.1902 21.43L19.1302 18C19.8702 17.57 20.3302 16.78 20.3302 15.92V9.07999C20.3302 8.22999 19.8702 7.42998 19.1302 6.99998L13.1902 3.56998C12.8302 3.35998 12.4102 3.24998 12.0002 3.24998Z"
                  fill="currentColor"
                />
              </svg>

              <div>قابل توجه</div>
            </div>
            {/* <!-- Line --> */}
            <div className="w-full h-px my-1 bg-gray-300"></div>

            <div className="text-center text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">
              هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از
              تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از
              درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر
              از همراهی شما.
            </div>
          </div>
        )}
      </div>

      {/* letf div */}
      <ShoppingCartTable
        btn_text={
          paymentMethod === "internet_payment" ? "تایید و پرداخت" : "ثبت سفارش"
        }
        btn_svg={
          paymentMethod === "internet_payment" ? (
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 md:size-5 lg:size-6"
            >
              <path
                d="M22.5 9.25H2.5C2.09 9.25 1.75 8.91 1.75 8.5C1.75 8.09 2.09 7.75 2.5 7.75H22.5C22.91 7.75 23.25 8.09 23.25 8.5C23.25 8.91 22.91 9.25 22.5 9.25Z"
                fill="currentColor"
              />
              <path
                d="M8.5 17.25H6.5C6.09 17.25 5.75 16.91 5.75 16.5C5.75 16.09 6.09 15.75 6.5 15.75H8.5C8.91 15.75 9.25 16.09 9.25 16.5C9.25 16.91 8.91 17.25 8.5 17.25Z"
                fill="currentColor"
              />
              <path
                d="M15 17.25H11C10.59 17.25 10.25 16.91 10.25 16.5C10.25 16.09 10.59 15.75 11 15.75H15C15.41 15.75 15.75 16.09 15.75 16.5C15.75 16.91 15.41 17.25 15 17.25Z"
                fill="currentColor"
              />
              <path
                d="M18.06 21.25H6.94C2.96 21.25 1.75 20.05 1.75 16.11V7.89C1.75 3.95 2.96 2.75 6.94 2.75H18.05C22.03 2.75 23.24 3.95 23.24 7.89V16.1C23.25 20.05 22.04 21.25 18.06 21.25ZM6.94 4.25C3.8 4.25 3.25 4.79 3.25 7.89V16.1C3.25 19.2 3.8 19.74 6.94 19.74H18.05C21.19 19.74 21.74 19.2 21.74 16.1V7.89C21.74 4.79 21.19 4.25 18.05 4.25H6.94Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 md:size-5 mb-1"
            >
              <path
                d="M12.5 22.75C6.57 22.75 1.75 17.93 1.75 12C1.75 6.07 6.57 1.25 12.5 1.25C18.43 1.25 23.25 6.07 23.25 12C23.25 17.93 18.43 22.75 12.5 22.75ZM12.5 2.75C7.4 2.75 3.25 6.9 3.25 12C3.25 17.1 7.4 21.25 12.5 21.25C17.6 21.25 21.75 17.1 21.75 12C21.75 6.9 17.6 2.75 12.5 2.75Z"
                fill="white"
              />
              <path
                d="M11.08 15.5801C10.88 15.5801 10.69 15.5001 10.55 15.3601L7.72 12.5301C7.43 12.2401 7.43 11.7601 7.72 11.4701C8.01 11.1801 8.49 11.1801 8.78 11.4701L11.08 13.7701L16.22 8.6301C16.51 8.3401 16.99 8.3401 17.28 8.6301C17.57 8.9201 17.57 9.4001 17.28 9.6901L11.61 15.3601C11.47 15.5001 11.28 15.5801 11.08 15.5801Z"
                fill="white"
              />
            </svg>
          )
        }
        step={step}
        setStep={setStep}
        carts={carts}
        totalAmount={totalAmount}
        totalDiscount={totalDiscount}
        postage_fee={postage_fee}
        handleChangeStep={handleChangeStep}
      />
    </div>
  );
};

export default Payment;
