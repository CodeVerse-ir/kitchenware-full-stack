"use client";

import { useState } from "react";

// components
import StarRating from "./StarRating";
import AlertSave from "./AlertSave";

interface AlertCommentProps {
  showComment: boolean;
  handleShowComment: () => void;
  handleSaveComment: () => void;
}

const AlertComment: React.FC<AlertCommentProps> = ({
  showComment,
  handleShowComment,
  handleSaveComment,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const [commentTitle, setCommentTitle] = useState("");
  const [comment, setComment] = useState("");
  const license = () => {
    if (comment && commentTitle) {
      handleSaveComment();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* <!-- Cart Star --> */}
      <div
        className={`${
          showComment ? "visible opacity-100" : "invisible opacity-0"
        } alert-survey`}
      >
        {/* <!-- Header --> */}
        <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-start gap-x-1">
                <span>عنوان نظر</span>
                {!commentTitle && (
                  <svg className="w-4 h-4 text-red-500">
                    <use href="#exclamation-circle"></use>
                  </svg>
                )}
              </div>

              {/* <!-- Star --> */}
              <StarRating />
            </div>
            <input
              className="w-full h-10 md:h-[50px] px-2.5 rounded-xl border border-gray-300 outline-none focus-visible:outline-orange-300 text-gray-700 dark:text-white bg-white dark:bg-zinc-700"
              type="text"
              placeholder="مثال : کیفیت محصول"
              maxLength={50}
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2.5">
            <div className="">
              {/* <!-- Title --> */}
              <div className="flex items-center justify-start gap-x-1 ">
                <span>نظر شما</span>
                {!comment && (
                  <svg className="w-4 h-4 text-red-500">
                    <use href="#exclamation-circle"></use>
                  </svg>
                )}
              </div>
            </div>
            <textarea
              className="w-full h-[100px] md:h-[200px] p-2.5 rounded-xl border border-gray-300 outline-none focus-visible:outline-orange-300 resize-none text-gray-700 dark:text-white bg-white dark:bg-zinc-700"
              name=""
              id=""
              placeholder="مثال : خوب بود."
              maxLength={700}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* <!-- Footer --> */}
        <div className="flex items-center justify-between mt-5 gap-x-2">
          <p>
            با انتخاب دکمه &quot; ثبت نظر &quot; موافقت خود را با قوانین انتشار
            محتوا در فروشگاه لوازم آشپزخانه کبیری اعلام می‌کنم.
          </p>
          <div
            className="flex items-center justify-center w-30 h-12 rounded-lg bg-orange-400 text-white cursor-pointer select-none"
            onClick={license}
          >
            ثبت نظر
          </div>
        </div>
      </div>

      <AlertSave
        textAlert="لطفاً تمامی فیلدها را پر کنید."
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default AlertComment;
