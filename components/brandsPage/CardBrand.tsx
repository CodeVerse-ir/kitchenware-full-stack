import Image from "next/image";
import Link from "next/link";

interface CardBrandProps {
  brand: {
    name: string;
    image: string;
  };
}

const CardBrand: React.FC<CardBrandProps> = ({ brand }) => {
  return (
    <Link
      key={brand.name}
      href={`/products?brand=${brand.name}`}
      className="flex flex-col justify-between w-[150px] h-[130px] sm:w-[170px] sm:h-[150px] p-4 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
    >
      <Image
        className="max-w-[75px] lg:max-w-[90px] mx-auto"
        src={brand.image}
        alt={`brand ${brand.name}`}
        width={90}
        height={90}
        sizes="(min-width: 768px)"
        loading="lazy"
      />

      {/* <!-- Cart Title --> */}
      <h5 className="text-center font-DanaMedium text-sm/7 lg:text-md/7 h-6 text-zinc-700 dark:text-white line-clamp-1">
        {brand.name}
      </h5>
    </Link>
  );
};

export default CardBrand;
