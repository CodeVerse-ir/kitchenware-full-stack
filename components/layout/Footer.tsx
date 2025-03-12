"use client";

import Image from "next/image";
import logo from "/public/image/logo/logo.png";
import Link from "next/link";

const list = [
  {
    name: "جدیدترین محصولات",
    path: "/products",
  },
  {
    name: "محصولات با تخفیف",
    path: "/products/discount",
  },
  {
    name: "محصولات پر فروش",
    path: "/products/best-selling",
  },
  {
    name: "مطالب خواندنی",
    path: "/blogs",
  },
  {
    name: "برند ها",
    path: "/brands",
  },
  {
    name: "پرسش های متداول",
    path: "/",
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // برای حرکت نرم
    });
  };

  return (
    <footer className="relative min-h-80 px-5 py-10 m:px-10 md:px-5 lg:px-16 text-gray-300 bg-zinc-700">
      {/* <!-- Curve --> */}
      <svg
        id="curve"
        viewBox="0 0 100 22"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 right-0 hidden md:inline-block mx-auto text-gray-100 dark:text-zinc-800 w-[100px] h-[22px] rotate-180"
      >
        <path d="M50 0C69 0 81 22 100 22L0 22C18.75 22 31 0 50 0Z" />
      </svg>

      {/* <!-- Arrow Circle --> */}
      <div
        className="absolute top-0 left-0 right-0 mx-auto -translate-y-2/4 hidden md:flex items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full cursor-pointer"
        onClick={scrollToTop}
      >
        <svg
          id="chevron-down-mini"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-zinc-700 dark:text-white rotate-180"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 xl:gap-y-0 pb-10 border-b border-b-gray-100/20">
        <div className="flex flex-col md:col-span-2 xl:col-span-1 gap-y-6">
          <div className="w-40 h-5 sm:w-56 sm:h-8 shrink-0">
            <Image
              className="w-40 h-5 sm:w-56 sm:h-8 mb-2.5"
              src={logo}
              alt="logo"
              width={224}
              height={32}
              sizes="(min-width: 640px)"
              loading="lazy"
            />
          </div>

          <p className="text-base lg:text-lg xl:pl-20 text-justify">
            در اینجا، ما در خدمت شما هستیم تا تجربه‌ی آشپزی و پخت و پز شما را به
            یک سطح جدید برسانیم. با محصولات متنوع و با کیفیت ما، اطمینان حاصل
            کنید که همیشه برای شما بهترین و مناسب‌ترین لوازم آشپزخانه را داریم.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-DanaBold text-xl lg:text-2xl pb-2">
            دسترسی سریع
          </h4>

          <div className="grid grid-cols-2 mt-6 gap-y-2.5 text-sm lg:text-base xs:pl-20 md:pl-0 lg:pl-20">
            {list.map((item, index) => {
              return (
                <div key={index} className="flex items-center justify-start">
                  <Link
                    href={item.path}
                    className="flex items-center justify-start hover:text-orange-300 transition-colors"
                  >
                    <span className="inline-block w-2 h-1 ml-2 bg-gray-200 rounded-3xl"></span>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-DanaBold text-base lg:text-2xl pb-8">
            در تماس باشیم
          </h4>

          <div className="flex gap-x-2 mb-4 text-sm lg:text-base">
            <svg
              id="map-pin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            شهر قهدریجان ، خیابان امام خمینی ، کوچه بازار ، وسط بازارچه
          </div>

          <div className="flex gap-x-2 mb-4 text-sm lg:text-base">
            <svg
              id="phone"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <span>031-37500435</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-y-0 items-center justify-between mt-7 text-sm lg:text-base">
        <div className="flex items-center justify-center">
          <div className="shrink-0">تمامی حقوق برای</div>{" "}
          <span className="shrink-0 font-DanaMedium px-1 text-orange-300">
            فروشگاه لوازم آشپزخانه کبیری
          </span>{" "}
          <div className="shrink-0">محفوظ است. ©</div>
        </div>
        <p>
          طراحی شده توسط
          <a
            href="https://codeverse-portfolio.vercel.app"
            className="pr-1 hover:text-orange-300 transition-colors"
            target="_blank"
          >
            Code Verse
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
