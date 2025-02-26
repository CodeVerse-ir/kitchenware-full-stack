"use client";

import { useState } from "react";

// components
import NameAndMobileForm from "./NameAndMobileForm";
import UsernameAndPassword from "./UsernameAndPassword";
import OtpForm from "./OtpForm";

const ChooseSignup = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <NameAndMobileForm setStep={setStep} />}
      {step === 2 && <UsernameAndPassword setStep={setStep} />}
      {step === 3 && <OtpForm setStep={setStep} />}
    </div>
  );
};

export default ChooseSignup;
