import Link from "next/link";
import { axiosFetch } from "@/utils/axios_fetch";

// components
import CardBlog from "../blogsPage/CardBlog";

interface Blog {
  image: string;
  title: string;
  text: string;
  date: string;
}

const SectionBlog = async () => {
  const blogs = await axiosFetch<Blog[]>({
    fetchType: "get",
    url: "blogs?number=4",
  });

  return (
    <section className="blog mb-16 md:mb-20">
      <div className="container">
        {/* <!-- Section Head --> */}
        <div className="flex items-center justify-between mb-5 md:mb-12">
          <h2 className="section-title">مطالب خواندنی</h2>

          <Link href="/blogs" className="section-link">
            <span className="hidden md:inline-block">مشاهده همه مطالب</span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <svg
              id="chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 lg:w-5 lg:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
        </div>

        {/* <!-- items --> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.data &&
            blogs.data.map((blog, index) => {
              return <CardBlog key={index} blog={blog} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default SectionBlog;
