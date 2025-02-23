// components
// import Comments from "../../../components/productPage/Comments";
// import Description from "../../../components/productPage/Description";
import CartProduct from "@/components/productPage/CartProduct";
import ChangeInformation from "@/components/productPage/ChangeInformation";

const Product = async ({
  params,
}: {
  params: Promise<{ productName: string }>;
}) => {
  const { productName } = await params;

  return (
    <>
      <main className="background">
        <section className="blog py-8 md:pt-40 md:pb-10 lg:pt-44 lg:pb-14">
          <div className="container">
            {/* <!-- Section Head --> */}
            <div className="flex items-end justify-between mb-5 md:mb-12">
              <h2 className="section-title">محصول</h2>
            </div>

            <CartProduct productName={productName} />
            <ChangeInformation productName={productName} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
