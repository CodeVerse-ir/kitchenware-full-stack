"use client";

import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// components
import SubmitBtn from "../common/SubmitBtn";

interface OtpFormProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const OtpForm: React.FC<OtpFormProps> = ({ setStep }) => {
  // 6 otp input
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));

  const router = useRouter();

  const [counter, setCounter] = useState(2);

  // const [stateOtp, formActionOtp, isPending] = useActionState(
  //   checkOtp,
  //   INITIAL_STATE
  // );

  useLayoutEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // get OTPCredential
  // useEffect(() => {
  //   const readOTP = async () => {
  //     if ("OTPCredential" in window) {
  //       try {
  //         const otpCredential = await navigator.credentials.get({
  //           otp: { transport: ["sms"] },
  //         });
  //         if (otpCredential && otpCredential.code) {
  //           const otpArray = otpCredential.code.split("");
  //           console.log("otpArray in CheckOtpForm : ", otpArray);
  //           setOtp(otpArray);
  //           otpArray.forEach((_, index) => {
  //             if (inputRefs.current[index]) {
  //               inputRefs.current[index].value = otpArray[index];
  //             }
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error getting OTP:", error);
  //       }
  //     }
  //   };

  //   readOTP();
  // }, []);

  // useEffect(() => {
  //   toast(stateOtp?.message, { type: `${stateOtp?.status}` });

  //   console.log("CheckOtpForm stateOtp : ", stateOtp);

  //   if (stateOtp?.status === "success") {
  //     if (stateOtp?.user === "nexus") {
  //       router.push("/gold-price-excel");
  //     } else {
  //       const isMobile =
  //         /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
  //           navigator.userAgent
  //         );

  //       if (isMobile) {
  //         router.push("/dashboard/inquiry");
  //       } else {
  //         router.push("/dashboard");
  //       }
  //     }
  //   } else if (
  //     stateOtp?.status === "error" &&
  //     stateOtp?.message !== "کد ورود الزامی است."
  //   ) {
  //     if (counter === 0) {
  //       setStep(1);
  //     } else {
  //       setCounter(counter - 1);
  //     }
  //   }
  // }, [stateOtp]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // اگر ورودی عدد باشد
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // به ورودی بعدی بروید
      if (index < otp.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

    // اگر ورودی خالی است
    if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-80 sm:w-96 py-5 px-7 bg-white dark:bg-zinc-700 shadow-normal rounded-xl">
      <div className="font-DanaMedium text-lg text-black dark:text-white text-center mb-4">
        کد تایید
      </div>
      <form action="" className="w-full">
        <div className="flex items-center justify-center mb-4 text-sm text-center text-zinc-700 dark:text-gray-300">
          کد تایید پنج‌ رقمی به شماره 09111111111111 ارسال شد.
        </div>

        {/* otp_code */}
        <div
          className="flex items-center justify-center w-full gap-x-3 mb-4"
          dir="ltr"
        >
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              className="text-center size-11 sm:size-14 rounded-lg bg-transparent border-2 border-dark focus:outline-none focus:border-accent"
              value={value}
              maxLength={1}
              name={`otp${index}`}
              autoComplete="off"
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleInputKeyDown(e, index)}
            />
          ))}
        </div>

        <SubmitBtn
          title="تایید"
          style="w-full h-10 mb-3 text-center rounded-lg text-light text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150"
          //   isPending={isPending}
          isPending={false}
        />
      </form>
      <button
        onClick={() => setStep(2)}
        className="flex items-center justify-center text-center text-zinc-700 dark:text-gray-300"
      >
        برگشت
      </button>
    </div>
  );
};

export default OtpForm;
