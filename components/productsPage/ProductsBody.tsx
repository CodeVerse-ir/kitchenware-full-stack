import { axiosFetch } from "@/utils/axios_fetch";

// components
import CardProduct from "../common/CardProduct";
import { redirect } from "next/navigation";

interface ProductsBodyProps {
  page: string;
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

const ProductsBody: React.FC<ProductsBodyProps> = async ({ page }) => {
  const products = await axiosFetch<Product[]>({
    fetchType: "get",
    url: `products?${page}`,
  });

  if (!products) {
    redirect("/not-found");
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 md:gap-5">
      {products.map((cart) => {
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
            star={cart.star}
            clock={cart.clock}
          />
        );
      })}
    </div>
  );
};

export default ProductsBody;
