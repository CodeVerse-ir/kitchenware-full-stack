"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// components
import ShoppingHeader from "./ShoppingHeader";
import ShoppingBody from "./ShoppingBody";
import CompletionInformation from "./CompletionInformation";
import { totalAmountCart, totalDiscountAmount } from "@/redux/slices/cartSlice";
import Payment from "./Payment";

const MainBody = () => {
  const [step, setStep] = useState(1);
  const state = useSelector((state: RootState) => state.shoppingCart);
  const totalAmount = useSelector(totalAmountCart);
  const totalDiscount = useSelector(totalDiscountAmount);

  const [order, setOrder] = useState("post");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [postage_fee, setPostage_fee] = useState(0);

  return (
    <div className="w-full">
      <ShoppingHeader step={step} />

      {step === 1 && state.cart && (
        <ShoppingBody
          setStep={setStep}
          carts={state.cart}
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
        />
      )}
      {step === 2 && state.cart && (
        <CompletionInformation
          step={step}
          setStep={setStep}
          carts={state.cart}
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
          postage_fee={postage_fee}
          setOrder={setOrder}
          setAddress={setAddress}
          setDescription={setDescription}
          setPostage_fee={setPostage_fee}
        />
      )}
      {step === 3 && state.cart && (
        <Payment
          step={step}
          setStep={setStep}
          carts={state.cart}
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
          postage_fee={postage_fee}
          order={order}
          address={address}
          description={description}
        />
      )}
    </div>
  );
};

export default MainBody;
