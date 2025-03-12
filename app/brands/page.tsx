import { Suspense } from "react";
import { axiosFetch } from "@/utils/axios_fetch";

// components
import Loading from "./Loading";
import Pagination from "@/components/common/Pagination";
import BrandsBody from "@/components/brandsPage/BrandsBody";

interface TotalProducts {
  totalProducts: number;
}

const Brands = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const totalProducts = await axiosFetch<TotalProducts>({
    fetchType: "get",
    url: "brands",
  });
  const totalItems = totalProducts ? totalProducts.totalProducts : 0;

  const { page } = await searchParams;
  const params = new URLSearchParams();
  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
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
            <Suspense key={params.toString()} fallback={<Loading />}>
              <BrandsBody page={params.toString()} />
            </Suspense>

            {/* Pagination */}
            <Pagination totalItems={totalItems} itemsPerPage={12} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Brands;
