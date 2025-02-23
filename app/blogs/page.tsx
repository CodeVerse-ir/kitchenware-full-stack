import Image from "next/image";
import Link from "next/link";
import { axiosFetch } from "@/utils/axios_fetch";

import logo from "/public/image/logo/logo.png";

interface Blog {
  image: string;
  title: string;
  text: string;
  day: string;
  mounth: string;
  year: string;
}

const Blogs = async () => {
  const blogs = await axiosFetch<Blog[]>({
    fetchType: "get",
    url: "blogs",
  });

  return (
    <>
      {/* icons */}
      <svg className="hidden">
        <symbol
          id="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </symbol>
        <symbol
          id="arrow-left"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </symbol>
      </svg>

      {/* Loader */}
      {!blogs && <div>در حال بارگذاری داده‌ها...</div>}

      {blogs && (
        <>
          <main className="background">
            <section className="blog py-8 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
              <div className="container">
                {/* <!-- Section Head --> */}
                <div className="flex items-center justify-between mb-5 md:mb-12">
                  <h2 className="section-title">مطالب خواندنی</h2>
                </div>

                {/* <!-- items --> */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {blogs.map((blog, index) => {
                    return (
                      <div
                        key={index}
                        className="flex md:flex-col dark:bg-zinc-700 bg-white p-2.5 justify-center rounded-2xl gap-4 md:justify-between md:items-center"
                      >
                        {/* <!-- image --> */}
                        <div className="relative flex items-center group max-w-32 max-h-32 md:max-w-72 md:max-h-48">
                          <Image
                            className="object-cover rounded-2xl rounded-bl-4xl min-w-32 min-h-32 md:max-w-72 md:max-h-48"
                            src={blog.image.replaceAll("/utils", "")}
                            alt={`blog ${index + 1}`}
                            width={288}
                            height={288}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-gradient-to-bl from-sky-950 to-sky-950/80 group-hover:opacity-100 rounded-2xl rounded-bl-4xl transition-opacity duration-300">
                            <div className="flex items-center justify-center px-3 md:px-0">
                              <Image
                                className="w-28 md:w-48 mx-auto"
                                src={logo}
                                alt={`blog ${index + 1}`}
                                width={112}
                                height={112}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>

                        {/* <!-- text --> */}
                        <div className="w-full pl-2.5 flex flex-col md:flex-row justify-between">
                          {/* <!-- title --> */}
                          <div className="flex flex-col justify-between text-right md:p-2 md:max-w-48 md:h-36 text-wrap">
                            <h4 className="font-dana-Medium line-clamp-2 text-sm/7 md:text-lg/7 text-zinc-700 dark:text-white md:mb-2.5">
                              {blog.title}
                            </h4>
                            <p className="font-Dana line-clamp-3 text-sm text-gray-400">
                              {blog.text}
                            </p>
                          </div>

                          {/* <!-- divide --> */}
                          <span className="w-full my-4 md:my-0 h-px bg-gray-100 dark:bg-white/10 md:w-px md:h-full"></span>

                          {/* <!-- created date --> */}
                          <div className="flex md:flex-col gap-y-5 justify-between">
                            <div className="flex text-teal-600 dark:text-emerald-500 text-xs/4 md:text-base/5 md:flex-col md:items-center md:justify-center">
                              <span className="md:font-dana-Bold md:text-2xl/8">
                                {blog.day}
                              </span>
                              <span>{blog.mounth}</span>
                              <span>{blog.year}</span>
                            </div>
                            <Link
                              href={`/blog/${encodeURIComponent(blog.title)}`}
                              className="flex items-center justify-evenly bg-orange-200/20 text-orange-300 w-[4.4375rem] h-5 rounded-md"
                            >
                              <p className="text-sm/4">مطالعه</p>
                              <svg className="w-4 h-4">
                                <use href="#arrow-left"></use>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Blogs;
