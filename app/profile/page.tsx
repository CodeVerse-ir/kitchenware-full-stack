import Image from "next/image";
import { getBlurDataURL } from "@/utils/helper";

const Profile = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <div className="flex flex-col items-start justify-center w-full">
        <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
          اطلاعات شخصی
        </h4>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300"></div>
      </div>

      {/* <!-- Body --> */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center w-full gap-x-10">
        <div className="flex flex-col items-start justify-normal mb-10 lg:mb-0">
          {/* <!-- First & Last Name --> */}
          <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
            {/* <!-- First Name --> */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <span>نام :</span>
              <input
                className="w-72 h-8 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
                type="text"
              />
            </div>
            {/* <!-- Last Name --> */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <span>نام خانوادگی :</span>
              <input
                className="w-72 h-8 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
                type="text"
              />
            </div>
          </div>

          {/* <!-- State & City --> */}
          <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
            {/* <!-- State --> */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <span>استان :</span>
              <input
                className="w-72 h-8 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
                type="text"
              />
            </div>
            {/* <!-- City --> */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <span>شهر :</span>
              <input
                className="w-72 h-8 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
                type="text"
              />
            </div>
          </div>

          {/* <!-- Address --> */}
          <div className="flex items-center justify-start gap-x-5 text-sm md:text-base lg:text-lg mb-5">
            {/* <!-- State --> */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <span>آدرس محل سکونت :</span>
              <textarea
                className="w-72 md:w-[596px] h-25 py-2 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
                name=""
                id=""
              ></textarea>
            </div>
          </div>

          {/* <!-- Save Information --> */}
          <div className="flex items-center justify-start gap-x-5 text-sm md:text-base lg:text-lg">
            {/* <!-- State --> */}
            <a
              className="flex flex-col items-start justify-center py-2 px-4 text-white bg-orange-400 rounded-xl"
              href=""
            >
              ثبت اطلاعات جدید
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start w-full">
          {/* <!-- Image User --> */}
          <div className="relative">
            <Image
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-4 border-orange-300 rounded-full mb-5"
              src="/image/comment/avatar.png"
              alt="avatar"
              width={128}
              height={128}
              sizes="(min-width: 768px)"
              loading="lazy"
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
            />
            <a
              className="absolute bottom-5 right-0 flex items-center justify-center w-8 h-8 bg-red-500 rounded-full"
              href=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </a>
          </div>

          {/* <!-- Change Image --> */}
          <div className="flex flex-col items-start justify-center gap-y-2 mb-5">
            <h4 className="text-sm md:text-base lg:text-lg">تصویر کاربری</h4>
            <div className="space-y-2 text-xs lg:text-sm">
              <input
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg"
                type="file"
                name="uploadedFile"
                accept=".jpg, .png"
              />
              <p>آواتار باید JPEG یا PNG و حداکثر 200 کیلوبایت باشد.</p>
            </div>
          </div>

          {/* <!-- Save Image --> */}
          <a
            className="flex flex-col items-start justify-center py-2 px-4 text-white bg-orange-400 rounded-xl"
            href=""
          >
            ثبت تصویر
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
