// componets
import { axiosFetch } from "@/utils/axios_fetch";
import CardBrand from "./CardBrand";

interface Brand {
  name: string;
  image: string;
  flag: number;
}

interface BrandsBodyProps {
  page: string;
}

const BrandsBody: React.FC<BrandsBodyProps> = async ({ page }) => {
  const brands = await axiosFetch<Brand[]>({
    fetchType: "get",
    url: `brands?${page}`,
  });

  return (
    <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-0 md:px-5 gap-5 md:gap-5 lg:gap-10">
      {/* <!-- item 1 --> */}
      {brands &&
        brands.map((brand, index) => {
          return <CardBrand key={index} brand={brand} />;
        })}
    </div>
  );
};

export default BrandsBody;
