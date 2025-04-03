"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSession } from "@/utils/useSession";
import { RootState } from "@/redux/store";

interface ShoppingCartProps {
  product: {
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
  };
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSession();
  const state = useSelector((state: RootState) => state.shoppingCart);

  const foundItem = state.cart.find((item) => item.code === product.code);

  const [quantity, setQuantity] = useState(
    foundItem && foundItem.quantity < product.quantity_in_stock
      ? foundItem.quantity
      : 1
  );

  const handleAddToCart = () => {
    if (user) {
      dispatch(removeFromCart(product.code));
      dispatch(addToCart({ product, quantity }));
      toast("محصول به سبد خرید اضافه شد", { type: "success" });
    } else {
      toast("برای افزودن به سبد خرید ، وارد حساب کاربری شوید.", {
        type: "error",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-start gap-y-2">
      <div className="flex items-center justify-start gap-x-5">
        <div className="flex items-center justify-between px-1 w-16 h-8 md:w-20 md:h-10 border text-orange-300 border-gray-300 rounded-3xl select-none">
          <button
            onClick={() =>
              quantity < product.quantity_in_stock &&
              setQuantity((prevQty) => prevQty + 1)
            }
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

          <span className="mt-1">{quantity}</span>

          <button
            onClick={() =>
              quantity > 1 && setQuantity((prevQty) => prevQty - 1)
            }
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

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex items-center justify-end gap-x-2 p-2 text-white bg-orange-400 rounded-lg transition-all duration-500"
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <div className="text-xs md:text-start lg:text-base">
            افزودن به سبد خرید
          </div>
        </button>
      </div>

      {foundItem && (
        <div className="font-Dana text-xs md:text-sm text-gray-500 dark:text-gray-400">
          قبلا به سبد خرید اضافه شده است.
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
