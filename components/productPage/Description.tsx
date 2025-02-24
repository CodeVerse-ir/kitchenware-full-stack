"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "https://fake-json-server-in.vercel.app/api/";

interface DescriptionProps {
  showComment: boolean;
  product_code: string;
}

interface Product {
  description: [{ title: string; text: [{ paragraph: string }] }];
}

const Description: React.FC<DescriptionProps> = ({
  showComment,
  product_code,
}) => {
  const [product, setProduct] = useState<Product[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}products?code=${product_code}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [product_code]);

  return (
    <>
      {/* Loader */}
      {!product && <div>در حال بارگذاری داده‌ها...</div>}

      {product && (
        <>
          {/* <!-- Description --> */}
          <div
            className={`${
              !showComment ? "flex" : "hidden"
            } flex-col w-full mt-2.5 p-5 md:p-10 text-sm md:text-base lg:text-lg text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl gap-y-6`}
          >
            {product[0].description.map((item, index) => {
              return (
                <div key={index} className="">
                  <h4 className="font-DanaBold mb-4 text-base md:text-lg lg:text-xl">
                    {item.title}
                  </h4>
                  {item.text.map((text, index) => {
                    return (
                      <p key={index} className="mb-4">
                        {text.paragraph}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Description;
