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
      {/* <!-- Header Moble --> */}
      <div className="flex md:hidden items-center justify-between h-16 px-4  bg-white dark:bg-zinc-700">
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
