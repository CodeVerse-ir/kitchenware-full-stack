import { axiosFetch } from "@/utils/axios_fetch";

// components
import CartProduct from "@/components/productPage/CardProduct";
import ChangeInformation from "@/components/productPage/ChangeInformation";
import NotFoundSearch from "@/components/common/NotFoundSearch";

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
  discount: number;
  clock: string;
  image: string[];
  brand: string;
  category: string;
  productName: string;
  code: string;
  attributes: string[];
  colors: [];
  price: number;
  star: number;
  like: number;
  bootmark: number;
  description: SubDescription[];
  comments: Comment[];
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
                  description={data.description}
                  comments={data.comments}
                />
              </>
            ) : (
              <NotFoundSearch text="محصول مورد نظر یافت نشد!" />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
