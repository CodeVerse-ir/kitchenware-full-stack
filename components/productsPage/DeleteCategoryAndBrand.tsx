"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DeleteCategoryAndBrand = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDelete = () => {
    const params = new URLSearchParams(searchParams);

    if (searchParams.get("category")) {
      params.delete("category");
    }
    if (searchParams.get("brand")) {
      params.delete("brand");
    }
    router.replace(`${pathname}?${params}`);
  };

  return (
    <button type="button" onClick={handleDelete} className="text-red-500 hover:text-red-700 transition-colors duration-150">
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
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeleteCategoryAndBrand;
