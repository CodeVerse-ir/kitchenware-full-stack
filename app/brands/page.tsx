import { Suspense } from "react";
import { redirect } from "next/navigation";
import { axiosFetch } from "@/utils/axios_fetch";

// components
import Loading from "./Loading";
import Pagination from "@/components/common/Pagination";
import BrandsBody from "@/components/brandsPage/BrandsBody";
import NotFoundSearch from "@/components/common/NotFoundSearch";

interface TotalProducts {
  totalProducts: number;
}

const Brands = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const totalProducts = await axiosFetch<TotalProducts>({
    fetchType: "get",
    url: "brands",
  });
  const totalItems = totalProducts.data ? totalProducts.data.totalProducts : 0;

  const { page } = await searchParams;
  const params = new URLSearchParams();
  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
  }

  const totalPages = Math.ceil(totalItems / 12);

  if (Number(page) > totalPages && Number(page) > 1) {
    redirect("/not-found");
  }

  return (
    <>
      <main className="background">
        <section className="brands py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
          <div className="container">
            {/* <!-- Section Head --> */}
            <div className="flex items-center justify-between mb-5 md:mb-12">
              <h2 className="section-title px-5 sm:px-0">برند ها</h2>
            </div>

            {/* <!-- Section Body  --> */}
            {totalPages ? (
              <Suspense key={params.toString()} fallback={<Loading />}>
                <BrandsBody page={params.toString()} />
              </Suspense>
            ) : (
              <NotFoundSearch text="هیچ برندی یافت نشد !" />
            )}

            {/* Pagination */}
            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Brands;
