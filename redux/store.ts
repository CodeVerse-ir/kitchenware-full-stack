"use client";

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    shoppingCart: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
