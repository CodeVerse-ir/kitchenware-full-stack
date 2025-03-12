import Link from "next/link";

const CategoryBanner = () => {
  return (
    <section className="category-banner mt-8 mb-10 md:my-20">
      <div className="container">
        {/* <!-- Section Head --> */}
        <div className="flex items-center justify-between mb-5 md:mb-12">
          <h2 className="section-title">دسته بندی محصولات</h2>

          <Link href="/category" className="section-link">
            <span className="hidden md:inline-block">
              مشاهده همه دسته بندی ها
            </span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <svg className="w-4 h-4 lg:w-5 lg:h-5">
              <use href="#chevron-left"></use>
            </svg>
          </Link>
        </div>

        {/* <!-- Section Body --> */}
        <div className="grid grid-cols-1 my-8 text-white gap-y-5 md:grid-cols-2 md:gap-x-5 md:min-h-64 md:my-5 child:min-h-36">
          <Link
            href={`/products?category=${encodeURIComponent("لوازم پخت و پز")}`}
            className="category-top-right pr-7 md:pr-12 md:pt-[5.44rem] pt-[2.44rem]"
          >
            <h4 className="font-DanaBold md:text-4xl/normal text-xl/normal">
              انواع لوازم پخت و پز
            </h4>
            <sub className="text-base font-DanaMedium md:text-xl/normal">
              برای مشاهده کلیک کنید
            </sub>
          </Link>

          <Link
            href={`/products?category=${encodeURIComponent("لوازم برقی")}`}
            className="category-top-left md:pr-12 md:pt-[5.44rem] pt-[2.44rem] pr-7"
          >
            <h4 className="font-DanaBold md:text-4xl/normal text-xl/normal">
              لوازم برقی
            </h4>
            <sub className="text-base font-DanaMedium md:text-xl/normal">
              برای مشاهده کلیک کنید
            </sub>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
