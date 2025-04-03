import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RadioAddress from "./RadioAddress";
import Link from "next/link";
import { get_address } from "@/actions/profile/addresses";
import { toast } from "react-toastify";

// components
import ShoppingCartTable from "./ShoppingCartTable";

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

interface CompletionInformationProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  carts: Array<CartItem & { quantity: number }>;
  totalAmount: number;
  totalDiscount: number;
  postage_fee: number;
  setOrder: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setPostage_fee: Dispatch<SetStateAction<number>>;
}

interface AddressType {
  id: string;
  title: string;
  mobile_number: string;
  postal_code: string;
  state: string;
  city: string;
  address_details: string;
  isDefault: boolean;
}

const CompletionInformation: React.FC<CompletionInformationProps> = ({
  step,
  setStep,
  carts,
  totalAmount,
  totalDiscount,
  postage_fee,
  setOrder,
  setAddress,
  setDescription,
  setPostage_fee,
}) => {
  const [getAddresses, setGetAddresses] = useState<AddressType[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState("post");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [textarea, setTextarea] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { addresses } = await get_address();
      if (addresses) {
        setGetAddresses(addresses);

        if (addresses.length > 0) {
          setSelectedAddress(
            addresses.find((item) => item.isDefault)?.id || addresses[0].id
          );
        }
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setPostage_fee(selectedOrder === "post" ? 50000 : 0);
  }, [selectedOrder, setPostage_fee]);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(textareaValue) && textareaValue.length <= 255) {
      setTextarea(textareaValue);
    }
  };

  const handleChangeStep = () => {
    if (selectedOrder === "post" && selectedAddress === "") {
      toast("لطفاً یکی از آدرس‌های خود را به عنوان مقصد ارسال انتخاب کنید", {
        type: "error",
      });
    } else {
      setOrder(selectedOrder);
      setAddress(selectedAddress);
      setDescription(textarea);
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-x-10 gap-y-5 md:mt-10">
      <div className="flex flex-col items-center justify-center gap-y-4 w-full xs:w-[350px] md:w-[500px]">
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
                d="M13 15.25H2C1.59 15.25 1.25 14.91 1.25 14.5V6.5C1.25 3.88 3.38 1.75 6 1.75H15C15.41 1.75 15.75 2.09 15.75 2.5V12.5C15.75 14.02 14.52 15.25 13 15.25ZM2.75 13.75H13C13.69 13.75 14.25 13.19 14.25 12.5V3.25H6C4.21 3.25 2.75 4.71 2.75 6.5V13.75Z"
                fill="currentColor"
              />
              <path
                d="M19 21.25H18C17.59 21.25 17.25 20.91 17.25 20.5C17.25 19.81 16.69 19.25 16 19.25C15.31 19.25 14.75 19.81 14.75 20.5C14.75 20.91 14.41 21.25 14 21.25H10C9.59 21.25 9.25 20.91 9.25 20.5C9.25 19.81 8.69 19.25 8 19.25C7.31 19.25 6.75 19.81 6.75 20.5C6.75 20.91 6.41 21.25 6 21.25H5C2.93 21.25 1.25 19.57 1.25 17.5V14.5C1.25 14.09 1.59 13.75 2 13.75H13C13.69 13.75 14.25 13.19 14.25 12.5V5.5C14.25 5.09 14.59 4.75 15 4.75H16.84C17.83 4.75 18.74 5.28001 19.23 6.14001L20.94 9.13C21.07 9.36 21.07 9.65 20.94 9.88C20.81 10.11 20.56 10.25 20.29 10.25H19C18.86 10.25 18.75 10.36 18.75 10.5V13.5C18.75 13.64 18.86 13.75 19 13.75H22C22.41 13.75 22.75 14.09 22.75 14.5V17.5C22.75 19.57 21.07 21.25 19 21.25ZM18.65 19.75H19C20.24 19.75 21.25 18.74 21.25 17.5V15.25H19C18.04 15.25 17.25 14.46 17.25 13.5V10.5C17.25 9.54 18.03 8.75 19 8.75L17.93 6.88C17.71 6.49 17.29 6.25 16.84 6.25H15.75V12.5C15.75 14.02 14.52 15.25 13 15.25H2.75V17.5C2.75 18.74 3.76 19.75 5 19.75H5.35001C5.68001 18.6 6.74 17.75 8 17.75C9.26 17.75 10.32 18.6 10.65 19.75H13.36C13.69 18.6 14.75 17.75 16.01 17.75C17.27 17.75 18.32 18.6 18.65 19.75Z"
                fill="currentColor"
              />
              <path
                d="M8 23.25C6.48 23.25 5.25 22.02 5.25 20.5C5.25 18.98 6.48 17.75 8 17.75C9.52 17.75 10.75 18.98 10.75 20.5C10.75 22.02 9.52 23.25 8 23.25ZM8 19.25C7.31 19.25 6.75 19.81 6.75 20.5C6.75 21.19 7.31 21.75 8 21.75C8.69 21.75 9.25 21.19 9.25 20.5C9.25 19.81 8.69 19.25 8 19.25Z"
                fill="currentColor"
              />
              <path
                d="M16 23.25C14.48 23.25 13.25 22.02 13.25 20.5C13.25 18.98 14.48 17.75 16 17.75C17.52 17.75 18.75 18.98 18.75 20.5C18.75 22.02 17.52 23.25 16 23.25ZM16 19.25C15.31 19.25 14.75 19.81 14.75 20.5C14.75 21.19 15.31 21.75 16 21.75C16.69 21.75 17.25 21.19 17.25 20.5C17.25 19.81 16.69 19.25 16 19.25Z"
                fill="currentColor"
              />
              <path
                d="M22 15.25H19C18.04 15.25 17.25 14.46 17.25 13.5V10.5C17.25 9.54 18.04 8.75 19 8.75H20.29C20.56 8.75 20.81 8.89 20.94 9.13L22.65 12.13C22.71 12.24 22.75 12.37 22.75 12.5V14.5C22.75 14.91 22.41 15.25 22 15.25ZM19 10.25C18.86 10.25 18.75 10.36 18.75 10.5V13.5C18.75 13.64 18.86 13.75 19 13.75H21.25V12.7L19.85 10.25H19Z"
                fill="currentColor"
              />
            </svg>

            <div>روش تحویل سفارش</div>
          </div>
          {/* <!-- Line --> */}
          <div className="w-full h-px my-1 bg-gray-300"></div>
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center justify-center gap-x-1 cursor-pointer">
              <input
                type="radio"
                name="order_delivery"
                value="post"
                className="size-3.5 cursor-pointer"
                checked={selectedOrder === "post"}
                onChange={handleOrderChange}
              />
              <div className="flex items-center justify-center gap-x-1 text-zinc-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                <div>ارسال توسط پست</div>

                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 md:size-5 lg:size-6"
                >
                  <path
                    d="M12.9998 15.25H11.9998C11.5898 15.25 11.2498 14.91 11.2498 14.5C11.2498 14.09 11.5898 13.75 11.9998 13.75H12.9998C13.6898 13.75 14.2498 13.19 14.2498 12.5V3.25H5.99978C4.81978 3.25 3.73975 3.88998 3.15975 4.91998C2.95975 5.27998 2.49979 5.41002 2.13979 5.21002C1.77979 5.01002 1.64975 4.55 1.84975 4.19C2.68975 2.69 4.27978 1.75 5.99978 1.75H14.9998C15.4098 1.75 15.7498 2.09 15.7498 2.5V12.5C15.7498 14.02 14.5198 15.25 12.9998 15.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 21.25H18C17.59 21.25 17.25 20.91 17.25 20.5C17.25 19.81 16.69 19.25 16 19.25C15.31 19.25 14.75 19.81 14.75 20.5C14.75 20.91 14.41 21.25 14 21.25H10C9.59 21.25 9.25 20.91 9.25 20.5C9.25 19.81 8.69 19.25 8 19.25C7.31 19.25 6.75 19.81 6.75 20.5C6.75 20.91 6.41 21.25 6 21.25H5C2.93 21.25 1.25 19.57 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75C2.41 16.75 2.75 17.09 2.75 17.5C2.75 18.74 3.76 19.75 5 19.75H5.34998C5.67998 18.6 6.74 17.75 8 17.75C9.26 17.75 10.32 18.6 10.65 19.75H13.36C13.69 18.6 14.75 17.75 16.01 17.75C17.27 17.75 18.33 18.6 18.66 19.75H19C20.24 19.75 21.25 18.74 21.25 17.5V15.25H19C18.04 15.25 17.25 14.46 17.25 13.5V10.5C17.25 9.54 18.03 8.75 19 8.75L17.93 6.88C17.71 6.49 17.29 6.25 16.84 6.25H15.75V12.5C15.75 14.02 14.52 15.25 13 15.25H12C11.59 15.25 11.25 14.91 11.25 14.5C11.25 14.09 11.59 13.75 12 13.75H13C13.69 13.75 14.25 13.19 14.25 12.5V5.5C14.25 5.09 14.59 4.75 15 4.75H16.84C17.83 4.75 18.74 5.28001 19.23 6.14001L20.94 9.13C21.07 9.36 21.07 9.65 20.94 9.88C20.81 10.11 20.56 10.25 20.29 10.25H19C18.86 10.25 18.75 10.36 18.75 10.5V13.5C18.75 13.64 18.86 13.75 19 13.75H22C22.41 13.75 22.75 14.09 22.75 14.5V17.5C22.75 19.57 21.07 21.25 19 21.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 23.25C6.48 23.25 5.25 22.02 5.25 20.5C5.25 18.98 6.48 17.75 8 17.75C9.52 17.75 10.75 18.98 10.75 20.5C10.75 22.02 9.52 23.25 8 23.25ZM8 19.25C7.31 19.25 6.75 19.81 6.75 20.5C6.75 21.19 7.31 21.75 8 21.75C8.69 21.75 9.25 21.19 9.25 20.5C9.25 19.81 8.69 19.25 8 19.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 23.25C14.48 23.25 13.25 22.02 13.25 20.5C13.25 18.98 14.48 17.75 16 17.75C17.52 17.75 18.75 18.98 18.75 20.5C18.75 22.02 17.52 23.25 16 23.25ZM16 19.25C15.31 19.25 14.75 19.81 14.75 20.5C14.75 21.19 15.31 21.75 16 21.75C16.69 21.75 17.25 21.19 17.25 20.5C17.25 19.81 16.69 19.25 16 19.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22 15.25H19C18.04 15.25 17.25 14.46 17.25 13.5V10.5C17.25 9.54 18.04 8.75 19 8.75H20.29C20.56 8.75 20.81 8.89 20.94 9.13L22.65 12.13C22.71 12.24 22.75 12.37 22.75 12.5V14.5C22.75 14.91 22.41 15.25 22 15.25ZM19 10.25C18.86 10.25 18.75 10.36 18.75 10.5V13.5C18.75 13.64 18.86 13.75 19 13.75H21.25V12.7L19.85 10.25H19Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 9.25H2C1.59 9.25 1.25 8.91 1.25 8.5C1.25 8.09 1.59 7.75 2 7.75H8C8.41 7.75 8.75 8.09 8.75 8.5C8.75 8.91 8.41 9.25 8 9.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 12.25H2C1.59 12.25 1.25 11.91 1.25 11.5C1.25 11.09 1.59 10.75 2 10.75H6C6.41 10.75 6.75 11.09 6.75 11.5C6.75 11.91 6.41 12.25 6 12.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4 15.25H2C1.59 15.25 1.25 14.91 1.25 14.5C1.25 14.09 1.59 13.75 2 13.75H4C4.41 13.75 4.75 14.09 4.75 14.5C4.75 14.91 4.41 15.25 4 15.25Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </label>
            <label className="flex items-center justify-center gap-x-1 cursor-pointer">
              <input
                type="radio"
                name="order_delivery"
                value="in_store_pickup"
                className="size-3.5 cursor-pointer"
                checked={selectedOrder === "in_store_pickup"}
                onChange={handleOrderChange}
              />
              <div className="flex items-center justify-center gap-x-1 text-zinc-600 dark:text-gray-400 text-xs md:text-sm lg:text-base">
                <div>تحویل حضوری</div>

                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 md:size-5 lg:size-6"
                >
                  <path
                    d="M16.9899 23.25H7.99993C6.27993 23.25 4.98994 22.79 4.18994 21.88C3.38994 20.97 3.07993 19.65 3.28993 17.94L4.18994 10.44C4.44994 8.23 5.00994 6.25 8.90994 6.25H16.1099C19.9999 6.25 20.5599 8.23 20.8299 10.44L21.7299 17.94C21.9299 19.65 21.6299 20.98 20.8299 21.88C19.9999 22.79 18.7199 23.25 16.9899 23.25ZM8.89993 7.75C6.01993 7.75 5.87993 8.88999 5.66993 10.61L4.76994 18.11C4.61994 19.38 4.79993 20.31 5.30993 20.88C5.81993 21.45 6.71993 21.74 7.99993 21.74H16.9899C18.2699 21.74 19.1699 21.45 19.6799 20.88C20.1899 20.31 20.3699 19.38 20.2199 18.11L19.3199 10.61C19.1099 8.87999 18.9799 7.75 16.0899 7.75H8.89993Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.5 9.25C16.09 9.25 15.75 8.91 15.75 8.5V5C15.75 3.92 15.08 3.25 14 3.25H11C9.92 3.25 9.25 3.92 9.25 5V8.5C9.25 8.91 8.91 9.25 8.5 9.25C8.09 9.25 7.75 8.91 7.75 8.5V5C7.75 3.09 9.09 1.75 11 1.75H14C15.91 1.75 17.25 3.09 17.25 5V8.5C17.25 8.91 16.91 9.25 16.5 9.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20.91 18.28H8.5C8.09 18.28 7.75 17.94 7.75 17.53C7.75 17.12 8.09 16.78 8.5 16.78H20.91C21.32 16.78 21.66 17.12 21.66 17.53C21.66 17.94 21.32 18.28 20.91 18.28Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>
        {/* addresses */}
        {selectedOrder === "post" && (
          <div className="flex flex-col items-center justify-center w-full gap-y-2 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 rounded-lg border border-gray-400">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start gap-x-1 text-zinc-800 dark:text-gray-300 text-xs md:text-sm lg:text-base">
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
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <div>آدرس ها</div>
              </div>
              <Link
                href="/profile/addresses"
                className="flex items-center justify-end gap-x-1 text-orange-400 text-xs md:text-sm"
              >
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <div>افزودن آدرس</div>
              </Link>
            </div>
            {/* <!-- Line --> */}
            <div className="w-full h-px my-1 bg-gray-300"></div>
            {getAddresses ? (
              getAddresses.length > 0 ? (
                <RadioAddress
                  address={getAddresses}
                  selectedAddress={selectedAddress}
                  handleAddressChange={handleAddressChange}
                />
              ) : (
                <div className="font-Dana text-gray-600 dark:text-gray-300 text-xs md:text-sm lg:text-base">
                  شما در حال حاضر هیچ آدرسی ثبت نکرده اید !
                </div>
              )
            ) : (
              <div className="flex items-center justify-center gap-x-1">
                <div className="text-xs md:text-sm lg:text-base text-orange-500">
                  منتظر بمانید
                </div>
                <div className="flex items-center justify-center w-6 h-1 gap-x-1 child:size-1 child:rounded-full child:bg-orange-500">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
          </div>
        )}
        <textarea
          className="w-full h-36 p-2 md:px-4 md:py-2 lg:px-6 lg:py-4 text-xs md:text-sm lg:text-base bg-transparent rounded-lg border border-gray-400 focus:border-orange-400 transition-colors duration-150 outline-none resize-none"
          name=""
          id=""
          placeholder="توضیحات سفارش (اختیاری)"
          value={textarea}
          onChange={handleTextareaChange}
        ></textarea>
      </div>
      {/* letf div */}
      <ShoppingCartTable
        btn_text="ثبت سفارش"
        btn_svg={
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

export default CompletionInformation;
