"use client";

import { getBlurDataURL } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";

interface ImageOption {
  id: string;
  imageUrl: string;
  altText: string;
}

interface ImageRadioSelectorProps {
  options: ImageOption[];
  defaultSelected?: string;
  onChange?: (selectedId: string) => void;
}

const ImageRadioSelector = ({
  options,
  defaultSelected,
  onChange,
}: ImageRadioSelectorProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelected
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <div
          key={option.id}
          className={`relative size-16 md:size-24 cursor-pointer border-2 rounded-md overflow-hidden transition-all ${
            selectedId === option.id
              ? "border-orange-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => handleSelect(option.id)}
        >
          <div
            className={`relative w-full h-full ${
              selectedId !== option.id ? "grayscale" : ""
            }`}
          >
            <Image
              className="w-full h-full object-cover"
              src={option.imageUrl}
              alt={option.altText}
              width={96}
              height={96}
              sizes="(min-width: 768px)"
              loading="lazy"
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
            />
            {selectedId === option.id && (
              <div className="absolute inset-0 bg-orange-200 bg-opacity-20 flex items-center justify-center"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageRadioSelector;
