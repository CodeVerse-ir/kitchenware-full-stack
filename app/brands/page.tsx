import Link from "next/link";
import Image from "next/image";
import { axiosFetch } from "@/utils/axios_fetch";

interface Brand {
  name: string;
  image: string;
}

const Brands = async () => {
  const brands = await axiosFetch<Brand[]>({
    fetchType: "get",
    url: "brands",
  });

  return (
    <>
      {/* Loader */}
      {!brands && <div>در حال بارگذاری داده‌ها...</div>}

      {brands && (
        <>
          <main className="background">
            <section className="brands py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
              <div className="container">
                {/* <!-- Section Head --> */}
                <div className="flex items-center justify-between mb-5 md:mb-12">
                  <h2 className="section-title px-5 sm:px-0">برند ها</h2>
                </div>

                {/* <!-- Section Body  --> */}
                <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-0 md:px-5 gap-5 md:gap-5 lg:gap-10">
                  {/* <!-- item 1 --> */}
                  {brands.map((brand, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/products/brand/${brand.name}`}
                        className="flex flex-col justify-between w-[170px] h-[150px] p-4 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
                      >
                        <Image
                          className="max-w-[90px] mx-auto"
                          src={brand.image.replaceAll("/utils", "")}
                          alt={`brand ${index + 1}`}
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
                  })}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Brands;
