"use client";

import { logout } from "@/actions/auth/auth";
import { useSession } from "@/utils/useSession";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = {
  profile: "/profile",
  bookmark: "/profile/bookmark",
  likes: "/profile/likes",
  addresses: "/profile/addresses",
  shopping: "/profile/shopping",
};

const UserPanel = () => {
  const pathname = usePathname();
  const { userContext } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    userContext(null);
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="w-2/4 lg:w-full lg:mt-5 p-5 text-sm md:text-base lg:text-lg bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      <div className="flex flex-col items-start select-none">
        {/* profile */}
        <Link
          href={links.profile}
          className={`flex items-center justify-start gap-x-2 hover:text-orange-300 ${
            links.profile === pathname
              ? "text-orange-300"
              : "text-black dark:text-white"
          } transition-colors duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <span className="mt-1">اطلاعات شخصی</span>
        </Link>
        {/* bookmark */}
        <Link
          href={links.bookmark}
          className={`flex items-center justify-start gap-x-2 hover:text-orange-300 ${
            links.bookmark === pathname
              ? "text-orange-300"
              : "text-black dark:text-white"
          } transition-colors duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>

          <span className="mt-1">ذخیره شده ها</span>
        </Link>
        {/* likes */}
        <Link
          href={links.likes}
          className={`flex items-center justify-start gap-x-2 hover:text-orange-300 ${
            links.likes === pathname
              ? "text-orange-300"
              : "text-black dark:text-white"
          } transition-colors duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <span className="mt-1">علاقه مندی ها</span>
        </Link>
        {/* addresses */}
        <Link
          href={links.addresses}
          className={`flex items-center justify-start gap-x-2 hover:text-orange-300 ${
            links.addresses === pathname
              ? "text-orange-300"
              : "text-black dark:text-white"
          } transition-colors duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
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

          <span className="mt-1">آدرس ها</span>
        </Link>
        {/* shopping */}
        <Link
          href={links.shopping}
          className={`flex items-center justify-start gap-x-2 hover:text-orange-300 ${
            links.shopping === pathname
              ? "text-orange-300"
              : "text-black dark:text-white"
          } transition-colors duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 md:size-5 lg:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span className="mt-1">سبد خرید</span>
        </Link>
        {/* divide */}
        <div className="w-full h-px my-2 bg-gray-400 rounded-full"></div>
        {/* logout */}
        {loading ? (
          <div className="flex items-center justify-center gap-x-1">
            <div className="text-sm text-orange-500">منتظر بمانید</div>
            <div className="flex items-center justify-center w-6 h-1 gap-x-1 child:size-1 child:rounded-full child:bg-orange-500">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center justify-start gap-x-2 hover:text-orange-300 text-black dark:text-white transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <span className="mt-1">خروج از حساب</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
