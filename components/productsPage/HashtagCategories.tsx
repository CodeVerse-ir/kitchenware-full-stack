"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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

  useEffect(() => {
    setSelectedHashtag(searchParams.get("category"));
  }, [searchParams]);

  const handleHashtagClick = (text: string) => {
    if (text === selectedHashtag) {
      setSelectedHashtag(null);

      const params = new URLSearchParams(searchParams);
      params.delete("category");

      router.replace(`${pathname}?${params}`);
    } else {
      setSelectedHashtag(text);

      const params = new URLSearchParams(searchParams);
      params.delete("page");
      params.set("category", text);

      router.replace(`${pathname}?${params}`);
    }
  };

  return (
    <div className="flex items-center justify-start w-full gap-x-2">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        spaceBetween={10}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },
        }}
      >
        {/* <!-- Slides --> */}
        {categories.map((category, index) => {
          return (
            <SwiperSlide key={index} style={{ width: "auto" }}>
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
