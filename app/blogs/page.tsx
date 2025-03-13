import { axiosFetch } from "@/utils/axios_fetch";
import { Suspense } from "react";

// components
import Loading from "./Loading";
import BlogsBody from "@/components/blogsPage/BlogsBody";
import Pagination from "@/components/common/Pagination";

interface TotalBlogs {
  totalBlogs: number;
}
const Blogs = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const totalBlogs = await axiosFetch<TotalBlogs>({
    fetchType: "get",
    url: "blogs",
  });
  const totalItems = totalBlogs ? totalBlogs.totalBlogs : 0;

  const { page } = await searchParams;
  const params = new URLSearchParams();
  if (page) {
    params.set("page", page as string);
  } else {
    params.set("page", "1");
  }

  return (
    <main className="background">
      <section className="blog py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div className="container">
          {/* <!-- Section Head --> */}
          <div className="flex items-center justify-between mb-5 md:mb-12">
            <h2 className="section-title">مطالب خواندنی</h2>
          </div>

          {/* <!-- Section Body --> */}
          <Suspense key={params.toString()} fallback={<Loading />}>
            <BlogsBody page={params.toString()} />
          </Suspense>

          {/* Pagination */}
          {totalItems > 8 && (
            <Pagination totalItems={totalItems} itemsPerPage={8} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Blogs;
