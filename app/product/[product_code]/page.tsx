// components
// import Comments from "../../../components/productPage/Comments";
// import Description from "../../../components/productPage/Description";
import CartProduct from "@/components/productPage/CartProduct";
import ChangeInformation from "@/components/productPage/ChangeInformation";

const Product = async ({
  params,
}: {
  params: Promise<{ product_code: string }>;
}) => {
  const { product_code } = await params;

  return (
    <>
      <main className="background">
        <section className="blog py-8 md:pt-40 md:pb-10 lg:pt-44 lg:pb-14">
          <div className="container">
            {/* <!-- Section Head --> */}
            <div className="flex items-end justify-between mb-5 md:mb-12">
              <h2 className="section-title">محصول</h2>
            </div>

            <CartProduct product_code={product_code} />
            <ChangeInformation product_code={product_code} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
