"use client";

import { useState } from "react";

// components
import ShoppingHeader from "./ShoppingHeader";
import ShoppingBody from "./ShoppingBody";
import CompletionInformation from "./CompletionInformation";

const MainBody = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full">
      <ShoppingHeader step={step} />

      {step === 1 && <ShoppingBody setStep={setStep} />}
      {step === 2 && <CompletionInformation setStep={setStep} />}
    </div>
  );
};

export default MainBody;
