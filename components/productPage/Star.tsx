"use client";

import { useState } from "react";

// components
import AlertComment from "./AlertComment";
import NoScroll from "../common/NoScroll";
import AlertSave from "./AlertSave";

const Star = () => {
  const [saveComment, setSaveComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleShowComment = () => {
    if (!saveComment) {
      setShowComment(!showComment);
    }
  };

  const handleSaveComment = () => {
    handleShowComment();
    setSaveComment(true);
    setShowAlert(true);
  };

  const closeAlert = () => {
    if (showComment) {
      setShowComment(false);
    }
  };

  return (
    <>
      <div
        className={`group flex items-center justify-center size-8 md:size-10 lg:size-12 rounded-xl ${
          saveComment ? "text-red-500" : "text-orange-300"
        } border border-gray-300`}
        onClick={handleShowComment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 md:size-5 lg:size-6 group-hover:scale-125 transition-all"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <AlertComment
        showComment={showComment}
        handleShowComment={handleShowComment}
        handleSaveComment={handleSaveComment}
      />

      <NoScroll noScroll={showComment} />

      <AlertSave
        textAlert="نظر شما ثبت شد !"
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />

      <div
        className={`${
          showComment ? "visible opacity-100" : "invisible opacity-0"
        } overlay-alert`}
        onClick={closeAlert}
      ></div>
    </>
  );
};

export default Star;
