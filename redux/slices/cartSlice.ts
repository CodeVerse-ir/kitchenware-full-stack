"use client";

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
  productName: string;
  code: string;
  attributes: string[];
  colors: [];
  price: number;
  star: number;
  like: number;
  bootmark: number;
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
      console.log(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.code !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
