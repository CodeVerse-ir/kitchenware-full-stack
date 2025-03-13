import Link from "next/link";
import Image from "next/image";

const category = [
  {
    image: "/image/categories/category1.png",
    text: "ظروف سرامیکی و چینی",
  },
  {
    image: "/image/categories/category2.png",
    text: "قاشق ، چنگال و ابزار سرو",
  },
  {
    image: "/image/categories/category3.png",
    text: "وسایل مراقبت شخصی",
  },
  {
    image: "/image/categories/category4.png",
    text: "ظروف سرو و پذیرایی",
  },
  {
    image: "/image/categories/category5.png",
    text: "ابزار آشپزخانه",
  },
];

const ProductsCategory = () => {
  return (
    <section className="products-category mb-10 md:mb-20">
      <div className="container">
        {/* <!-- Section Body --> */}
        <div className="flex flex-wrap items-center gap-6 md:flex-nowrap justify-evenly">
          {/* <!-- items --> */}
          {category.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/products?category=${encodeURIComponent(item.text)}`}
                className="max-w-[6.25rem] lg:max-w-[12.5rem] flex flex-col"
              >
                <Image
                  className="lg:w-48 lg:h-56"
                  src={item.image}
                  alt={`item ${index + 1}`}
                  width={100}
                  height={128}
                ></Image>
                <sub className="lg:text-xl/7 font-DanaBold text-sm/5 text-zinc-700 dark:text-white md:mt-2.5 mt-1.5 text-center">
                  {item.text}
                </sub>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsCategory;
