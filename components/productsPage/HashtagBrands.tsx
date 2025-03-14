"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Swiper css
import "swiper/swiper-bundle.css";

// components
import Hashtag from "../common/Hashtag";

interface HashtagBrandsProps {
  brands: Brand[];
}

interface Brand {
  name: string;
  image: string;
  flag: number;
}

const HashtagBrands: React.FC<HashtagBrandsProps> = ({ brands }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(
    searchParams.get("brand")
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleHashtagClick = (text: string) => {
    if (text === selectedHashtag) {
      setSelectedHashtag(null);

      const params = new URLSearchParams(searchParams);
      params.delete("brand");

      router.replace(`${pathname}?${params}`);
    } else {
      setSelectedHashtag(text);

      const params = new URLSearchParams(searchParams);
      params.set("brand", text);

      router.replace(`${pathname}?${params}`);
    }
  };

  return (
    <div className="flex items-center justify-start w-full gap-x-2">
      <button
        type="button"
        className={`swiper-button-prev-brands hidden md:flex items-center justify-center transition-colors ${
          isBeginning
            ? "text-zinc-400/50 dark:text-zinc-600/50 cursor-default"
            : "text-zinc-700 dark:text-white dark:hover:text-zinc-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-9 h-9 md:w-10 md:h-10"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-brands",
          prevEl: ".swiper-button-prev-brands",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        spaceBetween={10}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },
        }}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {/* <!-- Slides --> */}
        {brands.map((brand, index) => {
          return (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Hashtag
                text={brand.name}
                isSelected={brand.name === selectedHashtag}
                onClick={() => handleHashtagClick(brand.name)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        type="button"
        className={`swiper-button-next-brands hidden md:flex items-center justify-center transition-colors ${
          isEnd
            ? "text-zinc-700/50 dark:text-zinc-600/50 cursor-default"
            : "text-zinc-700 dark:text-white dark:hover:text-zinc-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-9 h-9 md:w-10 md:h-10"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default HashtagBrands;
