import { axiosFetch } from "@/utils/axios_fetch";

// components
import CardProduct from "./CardProduct";
import { checkDiscountStatus } from "@/utils/helper";

interface ProductsBodyProps {
  url: string;
  token: string;
}

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

const ProductsBody: React.FC<ProductsBodyProps> = async ({ url, token }) => {
  const { data } = await axiosFetch<Product[]>({
    fetchType: "get",
    url,
    token,
  });

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-5">
      {data &&
        data.length > 0 &&
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
            />
          );
        })}
    </div>
  );
};

export default ProductsBody;
