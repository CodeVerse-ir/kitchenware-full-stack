"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "@/utils/useSession";
import { logout } from "@/actions/auth/auth";
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

  const { user, loginContext } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    loginContext(null);
    setLoading(false);
  };

  return (
    <header className="absolute top-9 right-0 left-0 z-10 hidden md:flex items-center w-[98%] lg:w-[90%] h-24 px-5 lg:px-10 py-5 mx-auto bg-black/50 rounded-3xl backdrop-blur-[6px]">
      <div className="flex items-center justify-between w-full ">
        {/* <!-- Logo & Menu --> */}
        <nav className="flex items-center gap-x-5 lg:gap-x-9">
          {/* <!-- Logo --> */}
          <div className="w-12 h-12 shrink-0">
            <Image
              className="size-12"
              src={logoImg}
              alt="Kitchenware"
              width={48}
              height={48}
              priority
            />
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
              className="size-7 lg:size-8"
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
          {user ? (
            <>
              {/* shoping */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 lg:size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              {/* profile */}
              <div className="relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 lg:size-9 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <div className="absolute left-0 top-full w-[120px] h-[100px] px-2 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible space-y-2 font-Dana text-xl tracking-tighter text-zinc-700 dark:text-gray-300 bg-white dark:bg-zinc-700 border-t-[3px] border-t-orange-300 shadow-normal rounded-2xl delay-75 transition-all">
                  <Link
                    href="/profile"
                    className="flex items-center justify-evenly hover:text-orange-300 transition-colors duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <div>پروفایل</div>
                  </Link>
                  <div className="w-full h-px bg-gray-400"></div>
                  {/* logout */}
                  {loading ? (
                    <div className="flex items-center justify-center gap-x-1">
                      <div className="text-sm text-orange-500">
                        منتظر بمانید
                      </div>
                      <div className="flex items-center justify-center w-6 h-1 gap-x-1 child:size-1 child:rounded-full child:bg-orange-500">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-evenly w-full hover:text-orange-300 transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                        />
                      </svg>

                      <div>خروج</div>
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-x-2.5 tracking-tightest hover:text-orange-300 transition-colors"
            >
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
          )}
        </div>
      </div>
    </header>
  );
};

export default NavDesktop;
