import Image from "next/image";
import Link from "next/link";
import { getBlurDataURL } from "@/utils/helper";

// image
import logo from "/public/image/logo/logo.png";

// react-multi-date-picker persian
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface CardBlogProps {
  blog: { image: string; title: string; text: string; date: string };
}

const CardBlog: React.FC<CardBlogProps> = ({ blog }) => {
  // convert data persian
  const data_replace = blog.date.replace("T", " ");
  const data_persian = new DateObject(data_replace).convert(
    persian,
    persian_fa
  );

  const day = data_persian.format("DD");
  const month = data_persian.format("MMMM");
  const year = data_persian.format("YYYY");

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

      <div className="flex md:flex-col dark:bg-zinc-700 bg-white p-2.5 justify-center rounded-2xl gap-4 md:justify-between md:items-center">
        {/* <!-- image --> */}
        <div className="relative flex items-center group w-32 h-32 md:w-[288px] md:h-48">
          <Image
            className="object-cover rounded-2xl rounded-bl-4xl w-full h-full"
            src={blog.image}
            alt={`blog ${blog.title}`}
            width={288}
            height={192}
            loading="lazy"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-gradient-to-bl from-sky-950 to-sky-950/80 group-hover:opacity-100 rounded-2xl rounded-bl-4xl transition-opacity duration-300">
            <div className="flex items-center justify-center px-3 md:px-0">
              <Image
                className="w-28 md:w-48 mx-auto"
                src={logo}
                alt="logo"
                width={112}
                height={112}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* <!-- text --> */}
        <div className="w-[calc(100%-148px)] md:w-full pl-2.5 flex flex-col md:flex-row justify-between">
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
              <span className="md:font-dana-Bold md:text-2xl/8">{day}</span>
              <span>{month}</span>
              <span>{year}</span>
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
    </>
  );
};

export default CardBlog;
