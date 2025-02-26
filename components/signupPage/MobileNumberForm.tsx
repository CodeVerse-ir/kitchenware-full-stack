// components
import SubmitBtn from "../common/SubmitBtn";
import { Dispatch, SetStateAction } from "react";

interface MobileNumberFormProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const MobileNumberForm: React.FC<MobileNumberFormProps> = ({ setStep }) => {
  return (
    <div className="flex flex-col items-center justify-start w-80 sm:w-96 py-5 px-7 bg-white dark:bg-zinc-700 shadow-normal rounded-xl">
      <div className="font-DanaMedium text-lg text-black dark:text-white text-center mb-4">
        ثبت شماره تلفن همراه
      </div>
      <form action="" className="w-full">
        <div className="mb-4 text-sm text-center text-zinc-700 dark:text-gray-300">
          با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد شد.
        </div>

        {/* mobile_number */}
        <div className="relative flex flex-col items-start justify-center w-full h-10 mb-6">
          <label
            className="absolute -top-3 right-3 w-auto h-6 px-2 text-zinc-700 dark:text-gray-300 bg-white dark:bg-zinc-700"
            htmlFor="mobile_number"
          >
            شماره تلفن همراه
          </label>
          <input
            className={`flex items-center justify-start w-full h-full px-3 pt-1 text-black dark:text-white bg-transparent rounded border border-gray-400 focus:border-orange-300 transition-colors duration-150 outline-none`}
            type="text"
            id="mobile_number"
            name="mobile_number"
            autoComplete="off"
            dir="ltr"
            // value={dataFullName.first_name}
            // onChange={handleFirst_name}
            // ref={inputRef}
          />
        </div>

        <SubmitBtn
          title="ورود"
          style="w-full h-10 mb-3 text-center rounded-lg text-light text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150"
          //   isPending={isPending}
          isPending={false}
        />
      </form>
      <button
        onClick={() => setStep(1)}
        className="flex items-center justify-center text-center text-zinc-700 dark:text-gray-300"
      >
        برگشت
      </button>
    </div>
  );
};

export default MobileNumberForm;
