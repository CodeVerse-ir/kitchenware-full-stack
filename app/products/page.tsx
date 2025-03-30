import { Suspense } from "react";
import { redirect } from "next/navigation";
import { axiosFetch } from "@/utils/axios_fetch";

// components
import Loading from "./Loading";
import ProductsBody from "@/components/productsPage/ProductsBody";
import Pagination from "@/components/common/Pagination";
import NotFoundSearch from "@/components/common/NotFoundSearch";
import InputSearch from "@/components/productsPage/InputSearch";
import HashtagMain from "@/components/productsPage/HashtagMain";
import SelectFilters from "@/components/productsPage/SelectFilters";
import DeleteCategoryAndBrand from "@/components/productsPage/DeleteCategoryAndBrand";

interface TotalProducts {
  totalProducts: number;
}

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, search, category, brand, filter } = await searchParams;

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
  if (filter) {
    params.set("filter", filter as string);
  }

  const totalProducts = await axiosFetch<TotalProducts>({
    fetchType: "get",
    url: `products?${params.toString()}`,
  });
  const totalItems = totalProducts.data ? totalProducts.data.totalProducts : 0;

  let error_text = "";

  const error_text_array = [];

  if (totalItems === 0) {
    if (search) {
      error_text = "محصول مورد نظر یافت نشد!";
    } else {
      if (category) {
        error_text_array.push("دسته بندی");
      }
      if (brand) {
        error_text_array.push("برند");
      }
      if (filter) {
        error_text_array.push("فیلتر");
      }

      if (error_text_array.length !== 0) {
        error_text = `محصولات ${error_text_array.join(
          " ، "
        )} مورد نظر یافت نشد!`;
      } else {
        error_text = "هیچ محصولی یافت نشد!";
      }
    }
  }

  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
  }

  const totalPages = Math.ceil(totalItems / 8);

  if (Number(page) > totalPages && Number(page) > 1) {
    redirect("/not-found");
  }

  return (
    <main className="background">
      <section className="blog py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div className="container">
          {/* <!-- Section Head --> */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-y-0 mb-5 md:mb-12">
            <div className="flex flex-col md:flex-row items-center justify-start">
              <h2 className="section-title">محصولات</h2>
              <div className="flex items-center justify-center">
                {category && (
                  <h3 className="section-subtitle">{`/${category}`}</h3>
                )}
                {brand && <h3 className="section-subtitle">{`/${brand}`}</h3>}
                {(category || brand) && <DeleteCategoryAndBrand />}
              </div>
            </div>

            {/* input search */}
            <div className="flex flex-col items-start justify-center gap-y-2">
              <InputSearch />
              <SelectFilters />
            </div>
          </div>

          {/* categories & brands */}
          <HashtagMain />

          {/* <!-- Section Body  --> */}
          {totalPages ? (
            <Suspense key={params.toString()} fallback={<Loading />}>
              <ProductsBody params={params.toString()} />
            </Suspense>
          ) : (
            <NotFoundSearch text={error_text} />
          )}

          {/* Pagination */}
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      </section>
    </main>
  );
};

export default Products;
