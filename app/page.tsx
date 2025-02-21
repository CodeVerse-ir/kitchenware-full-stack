"use client";

import CategoryBanner from "../components/homePage/CategoryBanner";
import ProductsCategory from "../components/homePage/ProductsCategory";
import BestSelling from "../components/homePage/BestSelling";
import SectionBrands from "../components/homePage/SectionBrands";
import SectionBlog from "../components/homePage/SectionBlog";
import SectionContactUs from "../components/homePage/SectionContactUs";
import SectionServices from "../components/homePage/SectionServices";

// components
import SectionHome from "@/components/homePage/SectionHome";
import SectionProducts from "@/components/homePage/SectionProducts";

export default function Home() {
  return (
    <main>
      <SectionHome />

       <SectionProducts />

      {/* <CategoryBanner />

      <ProductsCategory />

      <BestSelling />

      <SectionBrands />

      <SectionBlog />

      <SectionContactUs />

      <SectionServices /> */}
    </main>
  );
}
