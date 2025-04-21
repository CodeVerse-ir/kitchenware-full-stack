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

interface SubProductsProps {
  product_code: string;
}

const SubProducts: React.FC<SubProductsProps> = async ({ product_code }) => {
  const { data } = await axiosFetch<Product[]>({
    fetchType: "get",
    url: `products?code=${product_code}&offer=true`,
  });  

  return (
    <div className="mt-5 md:mt-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5">
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
  );
};

export default SubProducts;
