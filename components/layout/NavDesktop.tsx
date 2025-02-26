"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import logoImg from "/public//image/logo/logo-img.png";

// components
import BtnSwich from "./BtnSwich";

const links = [
  {
    name: "صفحه اصلی",
    path: "/",
  },
  {
    name: "دسته بندی محصولات",
    path: "/category",
  },
  {
    name: "برند ها  ",
    path: "/brands",
  },
  {
    name: "بلاگ",
    path: "/blogs",
  },
  {
    name: "تماس با ما",
    path: "/contact",
  },
];

interface NavDesktopPrpos {
  darkMode: boolean;
  handleDarkMode: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavDesktop: React.FC<NavDesktopPrpos> = ({
  darkMode,
  handleDarkMode,
}) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <header className="absolute top-9 right-0 left-0 z-10 hidden md:flex items-center w-[98%] lg:w-[90%] h-24 px-5 lg:px-10 py-5 mx-auto bg-black/50 rounded-3xl backdrop-blur-[6px]">
      <div className="flex items-center justify-between w-full ">
        {/* <!-- Logo & Menu --> */}
        <nav className="flex items-center gap-x-5 lg:gap-x-9">
          {/* <!-- Logo --> */}
          <div className="w-12 h-12 shrink-0">
            <Image src={logoImg} alt="Kitchenware" width={48} height={48} />
          </div>

          <div className="flex gap-x-5 lg:gap-x-9 h-full text-xl text-gray-300 tracking-tightest child:leading-[56px] child-hover:text-orange-300 transition-colors">
            {links.map((link, index) => {
              return (
                <Link
                  href={link.path}
                  key={index}
                  className={`${
                    link.path === pathname && "font-DanaMedium text-orange-300"
                  } hover:text-orange-300 transition-colors`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* <!-- Cart & Toggle & Login Link --> */}
        <div className="flex items-center gap-x-4 lg:gap-x-5 xl:gap-x-10 text-xl text-orange-200">
          {/* <!-- Search Box --> */}
          <Link
            href="/products"
            className={`${
              "/products" === pathname && "text-orange-300"
            } hover:text-orange-300 transition-colors`}
          >
            <svg
              id="magnifying-glass"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.6svg"
              />
            </svg>
          </Link>

          <BtnSwich darkMode={darkMode} handleDarkMode={handleDarkMode} />

          {/* <!-- Divide Border --> */}
          <span className="block w-px h-14 bg-white/20"></span>

          {/* <!-- Login Link --> */}
          <Link href="/auth/login" className="flex items-center gap-x-2.5 tracking-tightest">
            <svg
              id="arrow-left-on-rectangle"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <span className="hidden xl:inline-block">ورود | ثبت نام</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavDesktop;
