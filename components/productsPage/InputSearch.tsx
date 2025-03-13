"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const InputSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showSearch, setShowSearch] = useState(
    searchParams.get("search") ? false : true
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    const pattern = /^[\u0600-\u06FF0-9\s]*$/;
    if (pattern.test(searchValue) && searchValue.length <= 30) {
      setSearch(searchValue);
    }
    if (!searchValue) {
      const params = new URLSearchParams(searchParams);
      params.delete("search");

      router.replace(`${pathname}?${params}`);
      setShowSearch(true);
    }
  };

  const handleClickSearch = () => {
    if (search !== "") {
      const params = new URLSearchParams(searchParams);
      params.set("search", search);
      params.set("page", "1");

      router.replace(`${pathname}?${params}`);

      setShowSearch(false);
    }
  };

  const handleDelete = () => {
    if (search !== "") {
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      params.set("page", "1");

      router.replace(`${pathname}?${params}`);
      setSearch("");
      setShowSearch(true);
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <input
        className="w-80 h-8 lg:h-10 pr-2 pl-8 text-sm md:text-base lg:text-lg text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 rounded-lg border border-gray-400 focus:border-orange-300 transition-colors duration-150 outline-none"
        type="text"
        maxLength={50}
        placeholder="جستجوی محصول"
        value={search}
        onChange={handleInputChange}
      />
      {showSearch ? (
        <button
          type="button"
          onClick={handleClickSearch}
          className="absolute top-2 left-2 text-zinc-700 dark:text-white hover:text-orange-300 transition-colors duration-150"
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-2 left-2 text-zinc-700 dark:text-white hover:text-orange-300 transition-colors duration-150"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default InputSearch;
