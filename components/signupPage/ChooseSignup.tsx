"use client";

import { useState } from "react";

// components
import FullNameForm from "./FullNameForm";
import MobileNumberForm from "./MobileNumberForm";
import OtpForm from "./OtpForm";

const ChooseSignup = () => {
  const [step, setStep] = useState(3);
  return (
    <div>
      {step === 1 && <FullNameForm setStep={setStep} />}
      {step === 2 && <MobileNumberForm setStep={setStep} />}
      {step === 3 && <OtpForm setStep={setStep} />}
    </div>
  );
};

export default ChooseSignup;
