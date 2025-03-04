"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const baseURL = "https://fake-json-server-in.vercel.app/api/";

interface CommentsProps {
  showComment: boolean;
  product_code: string;
}

interface Comment {
  initialComments: [
    {
      image: string;
      name: string;
      date: { day: string; mounth: string; year: string };
      star: number;
      title: string;
      text: string;
      isLiked: boolean;
      dislike: boolean;
      isDisliked: boolean;
      like: number;
    }
  ];
}

const Comments: React.FC<CommentsProps> = ({ showComment, product_code }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}products?code=${product_code}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [product_code]);

  // const toggleLike = (index: number) => {
  //   setComments((prevComments) => {
  //     const newComments = [...prevComments];

  //     const comment = { ...newComments[index] };

  //     if (comment.isLiked) {
  //       comment.like -= 1;
  //       comment.isLiked = false; 
  //     } else {
  //       comment.like += 1;
  //       comment.isLiked = true; 
  //     }

  //     newComments[index] = comment; 
  //     return newComments;
  //   });
  // };

  // const toggleDislike = (index: number) => {
  //   setComments((prevComments) => {
  //     const newComments = [...prevComments]; // کپی از نظرات فعلی

  //     const comment = { ...newComments[index] }; // کپی از نظر فعلی

  //     if (comment.isDisliked) {
  //       comment.dislike -= 1;
  //       comment.isDisliked = false; // اینجا باید false باشد
  //     } else {
  //       comment.dislike += 1;
  //       comment.isDisliked = true; // اینجا باید true باشد
  //     }

  //     newComments[index] = comment; // بروزرسانی نظر خاص در لیست جدید

  //     return newComments; // برگرداندن لیست جدید
  //   });
  // };

  return (
    <>
      {/* icons */}
      <svg className="hidden">
        <symbol
          id="calendar-days"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </symbol>
        <symbol
          id="hand-up"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </symbol>
        <symbol
          id="hand-up-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
        </symbol>
        <symbol
          id="hand-down-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
        </symbol>
        <symbol
          id="hand-down"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
          />
        </symbol>
        <symbol
          id="star-solid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </symbol>
      </svg>

      {/* Loader */}
      {!comments && <div>در حال بارگذاری داده‌ها...</div>}

      {comments && (
        <>
          {/* <!-- Comments flex --> */}
          <div
            className={`${
              showComment ? "flex" : "hidden"
            } flex-col w-full divide-y-[1px] divide-gray-300 mt-2.5 p-5 md:p-10 gap-y-4 lg:gap-y-6 text-sm md:text-base lg:text-lg text-black dark:text-white bg-white dark:bg-zinc-700 shadow-normal rounded-2xl`}
          >
            {/* <!-- User --> */}
            {comments[0].initialComments.map((comment, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-start justify-start mt-4 lg:mt-6 gap-x-20">
                    {/* <!-- Information --> */}
                    <div className="flex items-start justify-normal w-full lg:w-[20%]">
                      {/* <!-- User Image --> */}
                      <Image
                        className="w-10 h-10 lg:w-14 lg:h-14"
                        src={comment.image.replaceAll("/utils", "")}
                        alt={`avatar ${index + 1}`}
                        width={40}
                        height={40}
                        loading="lazy"
                      />

                      <div className="flex flex-col items-start justify-center mr-5 gap-y-2.5">
                        {/* <!-- Name --> */}
                        <h4 className="font-MorabbaMedium text-base  md:text-lg lg:text-xl">
                          {comment.name}
                        </h4>
                        {/* <!-- Date --> */}
                        <div className="flex gap-x-2 font-MorabbaMedium text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300">
                          <svg className="w-4 h-4 lg:w-5 lg:h-5">
                            <use href="#calendar-days"></use>
                          </svg>
                          <div className="flex items-center justify-center gap-x-1">
                            <span>{comment.date.day}</span>
                            <span>{comment.date.mounth}</span>
                            <span>{comment.date.year}</span>
                          </div>
                        </div>

                        {/* <!-- Star --> */}
                        <div className="flex text-gray-300 dark:text-gray-400">
                          {Array.from({ length: 5 }, (_, index) => (
                            <svg
                              key={index}
                              className={`mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
                                index < comment.star && "text-yellow-400"
                              }`}
                            >
                              <use href="#star-solid"></use>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* <!-- Comment --> */}
                    <div className="flex flex-col items-start justify-center w-[80%] gap-y-2 lg:gap-y-4">
                      {/* <!-- Title --> */}
                      <h4 className="font-DanaMedium text-sm md:text-base lg:text-lg">
                        {comment.title}
                      </h4>
                      {/* <!-- Text --> */}
                      <p className="text-sm md:text-base lg:text-lg">
                        {comment.text}
                      </p>
                      {/* <!-- Like & Dislike --> */}
                      <div className="flex gap-x-2">
                        <div
                          className="group flex items-center justify-center w-16 h-8 lg:w-20 lg:h-10 gap-x-2 rounded-xl border border-gray-300 child:transition-all select-none"
                          // onClick={() => toggleLike(index)}
                        >
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 group-hover:scale-125">
                            <use
                              href={`#${
                                comment.isLiked ? "hand-up-solid" : "hand-up"
                              }`}
                            ></use>
                          </svg>
                          <span className="mt-1">{comment.like}</span>
                        </div>
                        <div
                          className="group flex items-center justify-center w-16 h-8 lg:w-20 lg:h-10 gap-x-2 rounded-xl border border-gray-300 child:transition-all select-none"
                          // onClick={() => toggleDislike(index)}
                        >
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 text-red-500 group-hover:scale-125">
                            <use
                              href={`#${
                                comment.isDisliked
                                  ? "hand-down-solid"
                                  : "hand-down"
                              }`}
                            ></use>
                          </svg>
                          <span className="mt-1">{comment.dislike}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Comments;
