import { axiosFetch } from "@/utils/axios_fetch";

// components
import CardProduct from "./CardProduct";

interface ProductsBodyProps {
  page: string;
  token: string;
}

interface Product {
  code: string;
  image: string[];
  product_name: string;
  price: number;
  discount: number;
  star: number;
  clock: string;
}

const ProductsBody: React.FC<ProductsBodyProps> = async ({ page, token }) => {
  const products = await axiosFetch<Product[]>({
    fetchType: "get",
    url: `profile/bookmark?${page}`,
    token,
  });

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-5">
      {products &&
        products.length > 0 &&
        products.map((cart) => {
          const finalPrice =
            cart.discount === 0
              ? cart.price
              : cart.price - cart.price * (cart.discount / 100);
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
