"use client";

import { action_comment } from "@/actions/profile/comment";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { getToastType } from "@/utils/helper";
import { toast } from "react-toastify";

// components
import StarRating from "./StarRating";
import SubmitBtn from "../common/SubmitBtn";

const INITIAL_STATE_COMMENT = {
  status: null,
  message: null,
  field: [""],
  comment: {
    title: "",
    text: "",
    score: 1,
  },
};

interface AlertCommentProps {
  code: string;
  showComment: boolean;
  handleShowComment: () => void;
  setShowComment: Dispatch<SetStateAction<boolean>>;
}

const AlertComment: React.FC<AlertCommentProps> = ({
  code,
  showComment,
  handleShowComment,
  setShowComment,
}) => {
  const [stateComment, formActionComment, isPending] = useActionState(
    action_comment,
    INITIAL_STATE_COMMENT
  );

  const [comment, setComment] = useState({ title: "", text: "", score: 1 });

  useEffect(() => {
    toast(stateComment?.message, {
      type: `${getToastType(stateComment.status)}`,
    });

    console.log("sign up stateComment : ", stateComment);

    if (stateComment?.status === "success") {
      setShowComment(false);
      setComment({ title: "", text: "", score: 1 });
    }
  }, [stateComment, setShowComment]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(titleValue) && titleValue.length <= 30) {
      setComment((prev) => ({ ...prev, title: titleValue }));
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(textValue) && textValue.length <= 30) {
      setComment((prev) => ({ ...prev, text: textValue }));
    }
  };

  const handleStarChange = (value: number) => {
    if (value >= 1) {
      setComment((prev) => ({ ...prev, score: value }));
    }
  };

  return (
    <form
      action={formActionComment}
      className={`${
        showComment ? "visible opacity-100" : "invisible opacity-0"
      } alert-survey`}
    >
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between font-DanaBold text-sm lg:text-base">
        <span>افزودن نظر جدید</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:text-orange-300 transition-colors cursor-pointer"
          onClick={handleShowComment}
        >
          <use href="#x-mark"></use>
        </svg>
      </div>
      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300"></div>
      {/* <!-- Body --> */}
      <div className="space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            {/* <!-- Title --> */}
            <div className="flex items-center justify-start gap-x-1 font-DanaMedium text-sm lg:text-base">
              <span>عنوان نظر</span>
              {stateComment.field?.includes("title") && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3 sm:size-4 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              )}
            </div>

            {/* <!-- Star --> */}
            <StarRating comment={comment} handleStarChange={handleStarChange} />
            <input type="hidden" name="score" value={comment.score} />
          </div>
          <input
            className={`flex items-center justify-start w-full h-full px-2 py-1 text-zinc-700 dark:text-white bg-transparent rounded-md border ${
              stateComment.field?.includes("title")
                ? "border-red-500"
                : "border-gray-300"
            } focus:border-orange-300 transition-colors duration-150 outline-none`}
            type="text"
            id="title"
            name="title"
            placeholder="مثال : کیفیت محصول"
            autoComplete="off"
            value={comment.title}
            onChange={handleTitle}
          />
        </div>

        <div className="space-y-2.5">
          <div className="">
            {/* <!-- Title --> */}
            <div className="flex items-center justify-start gap-x-1 font-DanaMedium text-sm lg:text-base">
              <span>نظر شما</span>
              {stateComment.field?.includes("text") && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3 sm:size-4 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              )}
            </div>
          </div>
          <textarea
            className={`w-full h-[100px] md:h-[200px] p-2.5 text-zinc-700 dark:text-white bg-transparent rounded-md border ${
              stateComment.field?.includes("text")
                ? "border-red-500"
                : "border-gray-300"
            } focus:border-orange-300 transition-colors duration-150 outline-none resize-none`}
            name="text"
            id="text"
            placeholder="مثال : خوب بود."
            value={comment.text}
            onChange={handleText}
          ></textarea>
        </div>

        <input type="hidden" name="code" value={code} />
      </div>
      {/* <!-- Footer --> */}
      <div className="flex flex-col items-center justify-center mt-3 gap-y-2 text-xs md:text-sm lg:text-base">
        <p>
          با انتخاب دکمه &quot; ثبت نظر &quot; موافقت خود را با قوانین انتشار
          محتوا در فروشگاه لوازم آشپزخانه کبیری اعلام می‌کنم.
        </p>
        <SubmitBtn
          title="ثبت نظر"
          style="w-full h-8 sm:w-32 sm:h-10 text-center rounded-lg text-white bg-orange-400 hover:bg-orange-500 transition-colors duration-150 outline-none"
          isPending={isPending}
        />
      </div>
    </form>
  );
};

export default AlertComment;
