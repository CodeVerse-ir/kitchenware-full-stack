"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
// import SvgMobile from '../svg/SvgMobile';
import logo from "/public/image/logo/logo.png";

// components
import ResizeListener from "./ResizeListener";
import Overlay from "./Overlay";

const links = [
  {
    name: "صفحه اصلی",
    path: "/",
    svg: "#home",
  },
  {
    name: "دسته بندی محصولات",
    path: "/category",
    svg: "#shopping-bag",
  },
  {
    name: "برند ها  ",
    path: "/brands",
    svg: "#brands",
  },
  {
    name: "بلاگ",
    path: "/blogs",
    svg: "#document-text",
  },
  {
    name: "تماس با ما",
    path: "/contact",
    svg: "#phone-arrow-up-right",
  },
];

interface NavMobileProps {
  handleDarkMode: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ handleDarkMode }) => {
  const pathname = usePathname();

  const [navbar, setNavbar] = useState(false);

  const handleNavbar = () => setNavbar(!navbar);

  return (
    <>
      {/* icons */}
      <svg className="hidden">
        <symbol
          id="moon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </symbol>
        <symbol
          id="sun"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </symbol>
        <symbol
          id="arrow-left-on-rectangle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </symbol>
        <symbol
          id="bars-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </symbol>
        <symbol
          id="x-mark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </symbol>
        <symbol
          id="home"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </symbol>
        <symbol
          id="shopping-bag"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </symbol>
        <symbol
          id="brands"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006"
          />
        </symbol>
        <symbol
          id="document-text"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </symbol>
        <symbol
          id="phone-arrow-up-right"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
          />
        </symbol>
        <symbol
          id="magnifying-glass"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.6svg"
          />
        </symbol>
      </svg>

      {/* <!-- Header Moble --> */}
      <div className="flex md:hidden items-center justify-between h-16 px-4 bg-white dark:bg-zinc-700">
        {/* <!-- Nav Icon --> */}
        <div className="nav-icon" onClick={handleNavbar}>
          <svg className="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#bars-3"></use>
          </svg>
        </div>

        {/* <!-- Nav --> */}
        <div
          className={`nav fixed top-0 bottom-0 ${
            navbar ? "right-0" : "-right-64"
          } w-64 p-4 bg-white dark:bg-zinc-700 overflow-y-scroll transition-all z-20`}
        >
          {/* <!-- Nav Header --> */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10">
            <div className="flex gap-x-3.5">
              <Image src={logo} alt="Kitchenware" width={128} height={128} />
            </div>
            <div className="nav-close-btn" onClick={handleNavbar}>
              <svg className="w-5 h-5 text-zinc-700 dark:text-white">
                <use href="#x-mark"></use>
              </svg>
            </div>
          </div>

          {/* <!-- Nav Body --> */}
          <div className="flex flex-col child:p-2 space-y-2 text-zinc-700 dark:text-white">
            {links.map((link, index) => {
              return (
                <Link
                  href={link.path}
                  key={index}
                  className={`${
                    link.path === pathname &&
                    "bg-orange-200/20 text-orange-300 rounded-md"
                  }`}
                >
                  <div className="flex items-center gap-x-2">
                    <svg className="w-5 h-5">
                      <use href={`${link.svg}`}></use>
                    </svg>
                    {link.name}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* <!-- Nav Footer --> */}
          <div className="flex flex-col items-start gap-y-2 py-8 mt-8 text-orange-300 border-t border-t-gray-100 dark:border-t-white/10">
            <a
              href=""
              className="inline-flex items-center  w-full p-2 gap-x-2.5"
            >
              <svg className="w-5 h-5 rotate-180 text-orange-300">
                <use href="#arrow-left-on-rectangle"></use>
              </svg>
              ورود | ثبت نام
            </a>

            <Link
              href="/products"
              className={`${
                "/products" === pathname && "bg-orange-200/20 rounded-md"
              } w-full p-2`}
            >
              <div className="inline-flex items-center gap-x-2.5">
                <svg className="w-5 h-5 text-orange-300">
                  <use href="#magnifying-glass"></use>
                </svg>
                جست وجوی محصولات
              </div>
            </Link>
          </div>
        </div>

        {/* <!-- Theme --> */}
        <div
          className="inline-block toggle-theme select-none text-zinc-700 dark:text-white"
          onClick={handleDarkMode}
        >
          <svg className="w-6 h-6 inline-blok dark:hidden">
            <use href="#moon"></use>
          </svg>
          <svg className="w-6 h-6 hidden dark:inline-block">
            <use href="#sun"></use>
          </svg>
        </div>
      </div>

      <ResizeListener navbar={navbar} />

      <Overlay navbar={navbar} handleNavbar={handleNavbar} />
    </>
  );
};

export default NavMobile;
