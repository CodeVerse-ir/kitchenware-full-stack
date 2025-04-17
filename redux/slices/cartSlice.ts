"use client";

import { checkDiscountStatus } from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface CartState {
  cart: Array<CartItem & { quantity: number }>;
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: CartItem; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      state.cart = [...state.cart, { ...product, quantity: quantity }];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.code !== action.payload);
    },
    increment: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.code === action.payload ? { ...p, quantity: p.quantity + 1 } : p
      );
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.code === action.payload ? { ...p, quantity: p.quantity - 1 } : p
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const totalAmountCart = ({
  shoppingCart,
}: {
  shoppingCart: CartState;
}): number => {
  return shoppingCart.cart.reduce(
    (total: number, product: CartItem & { quantity: number }) => {
      const discountedPrice =
        product.price * (1 - product.discount.percent / 100);
      const finalPrice = checkDiscountStatus(product.discount)
        ? discountedPrice
        : product.price;
      return total + finalPrice * product.quantity;
    },
    0
  );
};

export const totalDiscountAmount = ({
  shoppingCart,
}: {
  shoppingCart: CartState;
}): number => {
  return shoppingCart.cart.reduce(
    (total: number, product: CartItem & { quantity: number }) => {
      if (checkDiscountStatus(product.discount)) {
        const discountAmount =
          product.price * (product.discount.percent / 100) * product.quantity;
        return total + discountAmount;
      }
      return total;
    },
    0
  );
};
