import { Suspense } from "react";
import { axiosFetch } from "@/utils/axios_fetch";

// components
import Loading from "./Loading";
import ProductsBody from "@/components/productsPage/ProductsBody";
import Pagination from "@/components/common/Pagination";
import NotFoundSearch from "@/components/common/NotFoundSearch";

interface TotalProducts {
  totalProducts: number;
}

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, search, category, brand } = await searchParams;

  const params = new URLSearchParams();
  if (search) {
    params.set("search", search as string);
  }
  if (category) {
    params.set("category", category as string);
  }
  if (brand) {
    params.set("brand", brand as string);
  }

  const totalProducts = await axiosFetch<TotalProducts>({
    fetchType: "get",
    url: `products?${params.toString()}`,
  });
  const totalItems = totalProducts ? totalProducts.totalProducts : 0;

  let error_text = "";

  if (totalItems === 0) {
    if (search) {
      error_text = "محصول مورد نظر یافت نشد!";
    } else if (category) {
      error_text = "محصولات دسته بندی مورد نظر یافت نشد!";
    } else if (brand) {
      error_text = "محصولات برند مورد نظر یافت نشد!";
    } else {
      error_text = "هیچ محصولی یافت نشد!";
    }
  }

  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
  }

  return (
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
                placeholder="جستجوی محصول"
                // defaultValue={paramSearch === "undefined" ? "" : paramSearch}
                // value={paramSearch === "undefined" ? "" : paramSearch}
                //   onChange={handleInputChange}
              />
            </div>
          </div>

          {/* <!-- Section Body  --> */}
          {totalItems ? (
            <Suspense key={params.toString()} fallback={<Loading />}>
              <ProductsBody params={params.toString()} />
            </Suspense>
          ) : (
            <NotFoundSearch text={error_text} />
          )}

          {/* Pagination */}
          {totalItems > 8 && (
            <Pagination totalItems={totalItems} itemsPerPage={8} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
