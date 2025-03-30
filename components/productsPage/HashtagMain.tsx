import { axiosFetch } from "@/utils/axios_fetch";

// components
import HashtagCategories from "./HashtagCategories";
import HashtagBrands from "./HashtagBrands";

interface Category {
  title: string;
  body: [
    {
      name: string;
      image: string;
    }
  ];
}

interface Brand {
  name: string;
  image: string;
  flag: number;
}

const HashtagMain = async () => {
  const categories = await axiosFetch<Category[]>({
    fetchType: "get",
    url: "categories",
  });

  const brands = await axiosFetch<Brand[]>({
    fetchType: "get",
    url: "brands?number=50",
  });

  return (
    <div className="space-y-2.5 lg:space-y-5 mb-5 lg:mb-10">
      <HashtagCategories categories={categories.data || []} />
      <HashtagBrands brands={brands.data || []} />
    </div>
  );
};

export default HashtagMain;
