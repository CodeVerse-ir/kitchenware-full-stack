import { axiosFetch } from "@/utils/axios_fetch";
import { checkDiscountStatus } from "@/utils/helper";

// components
import CardProduct from "../common/CardProduct";

interface ProductsBodyProps {
  params: string;
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

const ProductsBody: React.FC<ProductsBodyProps> = async ({ params }) => {
  const { data } = await axiosFetch<Product[]>({
    fetchType: "get",
    url: `products?${params}`,
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5">
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
              star={cart.star}
            />
          );
        })}
    </div>
  );
};

export default ProductsBody;
