import Link from "next/link";
import { axiosFetch } from "@/utils/axios_fetch";
import { checkDiscountStatus } from "@/utils/helper";

// components
import CardProduct from "../common/CardProduct";

interface Product {
  code: string;
  image: string[];
  product_name: string;
  price: number;
  discount: {
    percent: number;
    start_time: string;
    end_time: string;
  };
  star: number;
}

const SectionProducts = async () => {
  const { data } = await axiosFetch<Product[]>({
    fetchType: "get",
    url: "products?number=8",
  });

  return (
    <>
      <svg className="hidden">
        <symbol
          id="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </symbol>
        <symbol
          id="star"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </symbol>
        <symbol
          id="clock"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </symbol>
      </svg>

      <section className="products pt-8 md:pt-16 lg:pt-24">
        <div className="container">
          {/* Section Head */}
          <div className="flex items-end justify-between mb-5 md:mb-12">
            <div>
              <h2 className="section-title">جدیدترین محصولات</h2>
              <span className="section-subtitle">
                محصولات امروز را از دست نده
              </span>
            </div>
            <Link href="/products" className="section-link">
              <span className="hidden md:inline-block">مشاهده همه محصولات</span>
              <span className="inline-block md:hidden">مشاهده همه</span>
              <svg className="w-4 h-4 lg:w-5 lg:h-5">
                <use href="#chevron-left"></use>
              </svg>
            </Link>
          </div>

          {/* Section Body */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5">
            {data &&
              data.map((cart) => {
                const finalPrice = checkDiscountStatus(cart.discount)
                  ? cart.price - cart.price * (cart.discount.percent / 100)
                  : cart.price;
                return (
                  <CardProduct
                    key={cart.code}
                    code={cart.code}
                    image={cart.image}
                    product_name={cart.product_name}
                    finalPrice={finalPrice}
                    price={cart.price}
                    discount={cart.discount}
                    star={cart.star}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionProducts;
