import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosFetch } from "@/utils/axios_fetch";
import { Suspense } from "react";

// components
import Loading from "./Loading";
import Pagination from "@/components/common/Pagination";
import ProductsBody from "@/components/profilePage/ProductsBody";
import EmptyCard from "@/components/profilePage/EmptyCard";

interface TotalProducts {
  totalProducts: number;
}

const Likes = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/login");
  }

  const tokenValue = token.value;
  const totalProducts = await axiosFetch<TotalProducts>({
    fetchType: "get",
    url: "profile/likes",
    token: tokenValue,
  });

  const totalItems = totalProducts ? totalProducts.totalProducts : 0;

  const { page } = await searchParams;
  const params = new URLSearchParams();

  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
  }

  const totalPages = Math.ceil(totalItems / 6);

  if (Number(page) > totalPages && Number(page) > 1) {
    redirect("/not-found");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
      {/* <!-- Header --> */}
      <div className="flex flex-col items-start justify-center w-full">
        <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
          علاقه مندی ها
        </h4>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300"></div>
      </div>

      {/* <!-- Section Body  --> */}
      {totalPages ? (
        <Suspense key={params.toString()} fallback={<Loading />}>
          <ProductsBody url={`profile/likes?${params}`} token={tokenValue} />
        </Suspense>
      ) : (
        <EmptyCard text="شما در حال حاضر هیچ محصولی را به علاقه مندی ها اضافه نکرده‌اید!" />
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default Likes;
