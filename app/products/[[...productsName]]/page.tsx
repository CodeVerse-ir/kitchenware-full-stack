import Image from "next/image";
import Link from "next/link";
import { axiosFetch } from "@/utils/axios_fetch";
import Clock from "@/components/common/Clock";

// components

interface Product {
  code: string;
  image: string[];
  discountPercent: number;
  productName: string;
  price: string;
  discount: number;
  star: number;
  clock: string;
}

const Products = async ({
  params,
}: {
  params: Promise<{ productsName: string }>;
}) => {
  const { productsName } = await params;

  const paramPath = productsName?.[0];
  const paramSearch = decodeURIComponent(productsName?.[1]);

  //   const handleInputChange = (event) => {
  //     setParamSearch(event.target.value);
  //   };

  const products = await axiosFetch<Product[]>({
    fetchType: "get",
    url: `products?${paramPath}=${paramSearch}`,
  });

  return (
    <>
      <svg className="hidden">
        <symbol
          id="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </symbol>
        <symbol
          id="star"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </symbol>
        <symbol
          id="clock"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </symbol>
      </svg>

      {/* Loader */}
      {!products && <div>در حال بارگذاری داده‌ها...</div>}

      {products && (
        <>
          <main className="background">
            <section className="blog py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
              <div className="container">
                {/* <!-- Section Head --> */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-y-0 mb-5 md:mb-12">
                  <h2 className="section-title">محصولات</h2>

                  <div className="flex items-center justify-center py-1 px-2.5 text-zinc-700 dark:text-white bg-white dark:bg-zinc-700 rounded-xl border border-gray-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                      <use href="#magnifying-glass"></use>
                    </svg>
                    <input
                      className="w-80 py-1 px-2.5 text-sm md:text-base lg:text-lg bg-white dark:bg-zinc-700 outline-none"
                      type="text"
                      maxLength={20}
                      placeholder="جستجوی محصول / دسته بندی / برند"
                      defaultValue={
                        paramSearch === "undefined" ? "" : paramSearch
                      }
                      // value={paramSearch === "undefined" ? "" : paramSearch}
                      //   onChange={handleInputChange}
                    />
                  </div>
                </div>

                {products.length === 0 ? (
                  <h1 className="w-full h-[40vh] flex items-center justify-center font-MorabbaBold text-black dark:text-white text-base md:text-lg lg:text-2xl">
                    {paramPath === "category"
                      ? " محصولات دسته بندی مورد نظر یافت نشد !"
                      : "محصولات برند مورد نظر یافت نشد !"}
                  </h1>
                ) : (
                  <>
                    {/* <!-- Section Body  --> */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5">
                      {products.map((cart, index) => {
                        return (
                          <Link
                            href={`/product/${cart.code}`}
                            key={index}
                            className="flex flex-col justify-between p-4 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
                          >
                            <div className="relative mb-2 md:mb-5">
                              <Image
                                className="mx-auto md:w-auto"
                                src={cart.image[0].replaceAll("/utils", "")}
                                alt={`product ${index + 1}`}
                                width={128}
                                height={128}
                                sizes="(min-width: 768px)"
                                loading="lazy"
                              />

                              {/* <!-- discount percent  --> */}
                              {cart.discountPercent !== 0 && (
                                <span className="absolute top-1 right-1 flex items-center justify-center w-10 lg:w-[3.375rem] h-5 md:h-[30px] text-xs/[24px] md:text-base/[34px] font-DanaBold bg-orange-300 text-white dark:text-zinc-700 rounded-3xl pt-1">
                                  {cart.discountPercent}%
                                </span>
                              )}
                            </div>

                            {/* <!-- Cart Title --> */}
                            <h5 className="font-DanaMedium text-sm/7 lg:text-xl/7 min-h-14 text-zinc-700 dark:text-white line-clamp-2">
                              {cart.productName}
                            </h5>

                            {/* <!-- Cart Price --> */}
                            <div className="flex items-center justify-start gap-x-1.5 md:gap-x-2 mt-1.5 md:mt-2.5">
                              <div className="text-teal-600 dark:text-emerald-500">
                                <span className="font-DanaBold text-base lg:text-xl">
                                  {Number(cart.price).toLocaleString()}
                                </span>
                                <span className="pr-1 text-xs md:text-sm tracking-tighter">
                                  تومان
                                </span>
                              </div>
                              {cart.discount !== 0 && (
                                <div className="mr-2 text-xs md:text-sm text-gray-400 line-through lg:text-base decoration-red-500 decoration-1">
                                  <span className="">
                                    {Number(cart.discount).toLocaleString()}
                                  </span>
                                  <span className="hidden lg:inline">
                                    تومان
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* <!-- Cart Footer --> */}
                            <div className="flex items-center justify-between gap-x-1 mt-1.5 md:mt-2.5">
                              {/* <!-- Star --> */}
                              <div className="flex text-gray-300 dark:text-gray-400">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <svg
                                    key={index}
                                    className={`mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
                                      index < cart.star && "text-yellow-400"
                                    }`}
                                  >
                                    <use href="#star"></use>
                                  </svg>
                                ))}
                              </div>

                              {/* <!-- Timer --> */}
                              {cart.discount !== 0 && (
                                <Clock clock={cart.clock} showClock={true} />
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Products;
