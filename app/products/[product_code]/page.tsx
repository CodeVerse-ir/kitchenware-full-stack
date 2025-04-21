import { axiosFetch } from "@/utils/axios_fetch";

// components
import CartProduct from "@/components/productPage/CardProduct";
import ChangeInformation from "@/components/productPage/ChangeInformation";
import NotFoundSearch from "@/components/common/NotFoundSearch";
import SubProducts from "@/components/productPage/SubProducts";

interface SubText {
  paragraph: string;
}

interface SubDescription {
  title: string;
  text: SubText[];
}

interface Comment {
  name: string;
  title: string;
  text: string;
  date: string;
}

interface Product {
  discount: {
    percent: number;
    start_time: string;
    end_time: string;
  };
  image: string[];
  brand: string;
  category: string;
  product_name: string;
  code: string;
  attributes: string[];
  colors: [];
  price: number;
  star: number;
  like: number;
  bookmark: number;
  description: SubDescription[];
  comments: Comment[];
  quantity_in_stock: number;
}

const Product = async ({
  params,
}: {
  params: Promise<{ product_code: string }>;
}) => {
  const { product_code } = await params;

  const { data } = await axiosFetch<Product>({
    fetchType: "get",
    url: `products?code=${product_code}`,
  });

  return (
    <>
      <main className="background">
        <section className="blog py-8 md:pt-40 md:pb-10 lg:pt-44 lg:pb-14">
          <div className="container">
            {/* <!-- Section Head --> */}
            <div className="flex items-end justify-between mb-5 md:mb-12">
              <h2 className="section-title">محصول</h2>
            </div>
            {data ? (
              <>
                <CartProduct product={data} />

                <ChangeInformation
                  code={data.code}
                  description={data.description}
                />
              </>
            ) : (
              <NotFoundSearch text="محصول مورد نظر یافت نشد!" />
            )}
            
            <SubProducts product_code={product_code} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
