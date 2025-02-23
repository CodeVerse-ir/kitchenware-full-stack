import Image from "next/image";
import { axiosFetch } from "@/utils/axios_fetch";

interface Blog {
  image: string;
  title: string;
  text: string;
  day: string;
  mounth: string;
  year: string;
  subText: [{ title: string; image: string; body: [{ paragraph: string }] }];
}

const Blog = async ({ params }: { params: Promise<{ blogName: string }> }) => {
  const { blogName } = await params;

  const blog = await axiosFetch<Blog[]>({
    fetchType: "get",
    url: `blogs?title=${blogName}`,
  });

  return (
    <>
      {/* Loader */}
      {!blog && <div>در حال بارگذاری داده‌ها...</div>}

      {blog && (
        <>
          <main className="background">
            <section className="blog py-8 md:pt-40 md:pb-10 lg:pt-44 lg:pb-14">
              <div className="container">
                {/* <!-- Section Head --> */}
                <div className="flex items-end justify-between mb-5 md:mb-12">
                  <h2 className="section-title">بلاگ</h2>
                </div>

                <div className="flex flex-col w-full p-5 md:p-10 shadow-normal rounded-2xl text-black dark:text-white bg-white dark:bg-zinc-700">
                  {/* <!-- Title --> */}
                  <h4 className="flex items-center justify-center font-MorabbaBold text-lg md:text-xl lg:text-2xl">
                    {blog[0].title}
                  </h4>
                  {/* <!-- Date --> */}
                  <div className="flex items-center justify-center gap-x-2 text-xs md:text-sm lg:text-base my-4">
                    <div>تاریخ انتشار :</div>
                    <div className="flex items-center justify-center gap-x-2">
                      <span>{blog[0].day}</span>
                      <span>{blog[0].mounth}</span>
                      <span>{blog[0].year}</span>
                    </div>
                  </div>
                  {/* <!-- Image --> */}
                  <Image
                    className="w-[60%] mx-auto rounded-md mb-10 object-cover"
                    src={blog[0].image.replaceAll("/utils", "")}
                    alt="blog"
                    width={100}
                    height={100}
                    sizes="(min-width: 768px)"
                    loading="lazy"
                  />
                  {/* <!-- Text --> */}
                  <div className="">
                    {blog[0].subText.map((text, index) => {
                      return (
                        <div key={index}>
                          <h4 className="font-DanaMedium text-lg md:text-xl lg:text-2xl mb-4">
                            {text.title}
                          </h4>
                          {text.body.map((body, index) => {
                            return (
                              <p
                                key={index}
                                className="text-sm md:text-base lg:text-xl mb-8"
                              >
                                {body.paragraph}
                              </p>
                            );
                          })}
                          {text.image && (
                            <Image
                              className="w-[60%] mx-auto rounded-md mb-10 object-cover"
                              src={text.image.replaceAll("/utils", "")}
                              alt="blog"
                              width={100}
                              height={100}
                              sizes="(min-width: 768px)"
                              loading="lazy"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Blog;
