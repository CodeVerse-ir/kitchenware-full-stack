import Link from "next/link";

// components
import SubmitBtn from "../common/SubmitBtn";
import { Dispatch, SetStateAction } from "react";

interface FullNameFormProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const FullNameForm: React.FC<FullNameFormProps> = ({ setStep }) => {
  return (
    <div className="flex flex-col items-center justify-start w-80 sm:w-96 py-5 px-7 bg-white dark:bg-zinc-700 shadow-normal rounded-xl">
      <div className="font-DanaMedium text-lg text-black dark:text-white text-center mb-6">
        ثبت نام
      </div>
      <form action="" className="w-full">
        {/* first_name */}
        <div className="relative flex flex-col items-start justify-center w-full h-10 mb-6">
          <label
            className="absolute -top-3.5 right-3 w-auto h-6 px-2 text-zinc-700 dark:text-gray-300 bg-white dark:bg-zinc-700"
            htmlFor="first_name"
          >
            نام
          </label>
          <input
            className={`flex items-center justify-start w-full h-full px-3 pt-3 pb-2 text-black dark:text-white bg-transparent rounded border border-gray-400 focus:border-orange-300 transition-colors duration-150 outline-none`}
            type="text"
            id="first_name"
            name="first_name"
            autoComplete="off"
            // value={dataFullName.first_name}
            // onChange={handleFirst_name}
            // ref={inputRef}
          />
        </div>

        {/* last_name */}
        <div className="relative flex flex-col items-start justify-center w-full h-10 mb-8">
          <label
            className="absolute -top-3.5 right-3 w-auto h-6 px-2 text-zinc-700 dark:text-gray-300 bg-white dark:bg-zinc-700"
            htmlFor="last_name"
          >
            نام خانوادگی
          </label>
          <input
            className={`flex items-center justify-start w-full h-full px-3 pt-3 pb-2 text-black dark:text-white bg-transparent rounded border border-gray-400 focus:border-orange-300 transition-colors duration-150 outline-none`}
            type="text"
            id="last_name"
            name="last_name"
            autoComplete="off"
            // value={dataFullName.first_name}
            // onChange={handleFirst_name}
            // ref={inputRef}
          />
        </div>

        <SubmitBtn
          title="ادامه"
          style="w-full h-10 mb-4 text-center rounded-lg text-light text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150"
          //   isPending={isPending}
          isPending={false}
        />
      </form>
      <div className="flex items-center justify-center gap-x-1.5 text-center text-zinc-700 dark:text-gray-300">
        <div> اگر قبلا ثبت نام کرده اید</div>
        <Link
          href="/auth/login"
          className="text-orange-400 dark:text-orange-300"
        >
          وارد شوید.
        </Link>
      </div>
    </div>
  );
};

export default FullNameForm;
