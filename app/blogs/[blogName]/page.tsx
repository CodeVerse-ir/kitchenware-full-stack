import Image from "next/image";
import { redirect } from "next/navigation";
import { axiosFetch } from "@/utils/axios_fetch";

// react-multi-date-picker persian
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Blog {
  image: string;
  title: string;
  text: string;
  date: string;
  sections?: Section[];
}

interface Section {
  id: string;
  title: string;
  content: Content[];
}

interface Content {
  type: "paragraph" | "image" | "video" | "list";
  data: string | string[];
}

const Blog = async ({ params }: { params: Promise<{ blogName: string }> }) => {
  const { blogName } = await params;
  const decodedBlogName = decodeURIComponent(blogName);

  const blog = await axiosFetch<Blog>({
    fetchType: "get",
    url: `blogs?title=${decodedBlogName}`,
  });

  if (!blog) {
    redirect("/not-found");
  }

  // convert data persian
  const data_replace = blog
    ? blog.date.replace("T", " ")
    : "2025-02-24T15:39:48.223Z";

  const data_persian = new DateObject(data_replace).convert(
    persian,
    persian_fa
  );

  const day = data_persian.format("DD");
  const month = data_persian.format("MMMM");
  const year = data_persian.format("YYYY");

  return (
    <main className="background">
      <section className="blog py-8 md:pt-40 md:pb-10 lg:pt-44 lg:pb-14">
        <div className="container">
          {/* <!-- Section Head --> */}
          <div className="flex items-end justify-between mb-5 md:mb-12">
            <h2 className="section-title">بلاگ</h2>
          </div>

          {blog && (
            <div className="flex flex-col w-full p-5 md:p-10 shadow-normal rounded-2xl text-black dark:text-white bg-white dark:bg-zinc-700">
              {/* <!-- Title --> */}
              <h4 className="flex items-center justify-center font-MorabbaBold text-lg md:text-xl lg:text-2xl">
                {blog.title}
              </h4>
              {/* <!-- Date --> */}
              <div className="flex items-center justify-center gap-x-2 text-xs md:text-sm lg:text-base my-4">
                <div>تاریخ انتشار :</div>
                <div className="flex items-center justify-center gap-x-2">
                  <span>{day}</span>
                  <span>{month}</span>
                  <span>{year}</span>
                </div>
              </div>
              {/* <!-- Image --> */}
              <Image
                className="w-[60%] mx-auto rounded-md mb-10 object-cover"
                src={blog.image}
                alt="blog"
                width={100}
                height={100}
                sizes="(min-width: 768px)"
                loading="lazy"
              />
              {/* <!-- Text --> */}
              <div className="">
                {blog.sections?.map((section, index) => (
                  <div key={section.id || index}>
                    {/* عنوان بخش */}
                    <h4 className="font-DanaMedium text-lg md:text-xl lg:text-2xl mb-4">
                      {section.title}
                    </h4>

                    {/* محتوای بخش */}
                    {section.content.map((content, contentIndex) => {
                      switch (content.type) {
                        case "paragraph":
                          return (
                            <p
                              key={contentIndex}
                              className="text-sm md:text-base lg:text-xl mb-8"
                            >
                              {content.data}
                            </p>
                          );

                        case "image":
                          return (
                            <Image
                              key={contentIndex}
                              className="w-[60%] mx-auto rounded-md mb-10 object-cover"
                              src={content.data.toString()}
                              alt="blog"
                              width={100}
                              height={100}
                              sizes="(min-width: 768px)"
                              loading="lazy"
                            />
                          );

                        // اگر نوع‌های دیگری از محتوا دارید، می‌توانید آنها را اینجا اضافه کنید.
                        // مثال: case "video": return (...);
                        // مثال: case "list": return (...);

                        // default:
                        //   return null;
                      }
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
