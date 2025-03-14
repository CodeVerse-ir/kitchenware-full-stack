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

interface HashtagCategoriesProps {
  categories: Category[];
}

interface Category {
  title: string;
  body: [
    {
      name: string;
      image: string;
    }
  ];
}

const HashtagCategories: React.FC<HashtagCategoriesProps> = ({
  categories,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(
    searchParams.get("category")
  );

  const handleHashtagClick = (text: string) => {
    if (text === selectedHashtag) {
      setSelectedHashtag(null);

      const params = new URLSearchParams(searchParams);
      params.delete("category");

      router.replace(`${pathname}?${params}`);
    } else {
      setSelectedHashtag(text);

      const params = new URLSearchParams(searchParams);
      params.set("category", text);

      router.replace(`${pathname}?${params}`);
    }
  };

  return (
    <div className="flex items-center justify-start w-full gap-x-2">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-NonIranianFoods",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        rewind={true}
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          500: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          890: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1260: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        }}
      >
        {/* <!-- Slides --> */}
        {categories.map((category, index) => {
          return (
            <SwiperSlide key={index}>
              <Hashtag
                text={category.title}
                isSelected={category.title === selectedHashtag}
                onClick={() => handleHashtagClick(category.title)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HashtagCategories;
