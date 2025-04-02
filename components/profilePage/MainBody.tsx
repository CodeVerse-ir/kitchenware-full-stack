"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// components
import ShoppingHeader from "./ShoppingHeader";
import ShoppingBody from "./ShoppingBody";
import CompletionInformation from "./CompletionInformation";
import { totalAmountCart, totalDiscountAmount } from "@/redux/slices/cartSlice";

const MainBody = () => {
  const [step, setStep] = useState(1);
  const state = useSelector((state: RootState) => state.shoppingCart);
  const totalAmount = useSelector(totalAmountCart);
  const totalDiscount = useSelector(totalDiscountAmount);

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
      {step === 2 && <CompletionInformation setStep={setStep} />}
    </div>
  );
};

export default MainBody;
