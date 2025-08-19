"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterOptions: FilterOption[] = [
  { label: "بدون فیلتر", value: "" },
  { label: "تخفیف‌دارها", value: "discount" },
  { label: "کمترین قیمت", value: "price_asc" },
  { label: "بیشترین قیمت", value: "price_desc" },
  { label: "محصولات جدید", value: "newest" },
  { label: "محصولات پرامتیاز", value: "top_rated" },
  { label: "محصولات پیشنهادی", value: "featured" },
];

interface FilterOption {
  label: string;
  value: string;
}

const SelectFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedLabel = (value: string) => {
    return (
      filterOptions.find((option) => option.value === value)?.label ||
      "بدون فیلتر"
    );
  };

  const [selectedValue, setSelectedValue] = useState<string | null>(
    selectedLabel(searchParams.get("filter") || "")
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (label: string, value: string) => {
    setSelectedValue(label);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }

    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-80 h-8 lg:h-10 relative font-Dana text-sm md:text-base lg:text-lg" ref={selectRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-full p-2 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 rounded-lg border ${
          isOpen ? "border-orange-300" : "border-gray-400"
        } transition-colors duration-150 outline-none cursor-pointer`}
      >
        <span>{selectedValue || "همه فیلترها"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-zinc-500 dark:text-zinc-400 ${
            isOpen && "rotate-180"
          } transition-transform duration-150`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute w-full mt-1 text-zinc-700 dark:text-gray-300 bg-white dark:bg-zinc-700 border border-gray-400 dark:border-zinc-700 rounded-lg shadow-lg z-10 overflow-hidden">
          {filterOptions.map((filter) => (
            <li
              key={filter.value}
              onClick={() => handleFilterChange(filter.label, filter.value)}
              className="py-2 px-4 hover:bg-orange-100 dark:hover:bg-orange-600 cursor-pointer"
            >
              {filter.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectFilters;
