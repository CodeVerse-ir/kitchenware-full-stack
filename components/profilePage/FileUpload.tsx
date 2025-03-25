"use client";

import {
  useState,
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { action_image } from "@/actions/profile/information";

// components
import SubmitBtn from "../common/SubmitBtn";
import { toast } from "react-toastify";
import { getToastType } from "@/utils/helper";
import { useSession } from "@/utils/useSession";

const INITIAL_STATE_Image = {
  status: null,
  message: null,
  field: null,
  user: {
    image: "",
  },
};

const FileUpload = () => {
  const { user, userContext } = useSession();

  const [fileName, setFileName] = useState<string>(
    "هیچ فایلی انتخاب نشده است."
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    user?.image || null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempSelectedImage, setTempSelectedImage] = useState<string | null>(
    null
  );

  const [stateImage, formActionImage, isPending] = useActionState(
    action_image,
    INITIAL_STATE_Image
  );

  useEffect(() => {
    toast(stateImage?.message, {
      type: `${getToastType(stateImage?.status)}`,
    });

    console.log("FileUpload stateImage : ", stateImage);

    if (stateImage?.status === "success") {
      userContext((prev) => ({
        ...prev,
        image: stateImage.user.image,
      }));
      setSelectedImage(tempSelectedImage);
      setIsEditing(false);
      setFileName("هیچ فایلی انتخاب نشده است.");
      setTempSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 200 * 1024) {
        setError("حجم فایل بیشتر از ۲۰۰ کیلوبایت است.");
        setFileName("هیچ فایلی انتخاب نشده است.");
        e.target.value = "";
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setTempSelectedImage(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
        setFileName(file.name);
        setError(null);
      }
    } else {
      setFileName("هیچ فایلی انتخاب نشده است.");
      setError(null);
    }
  };

  const handleDeleteImage = () => {
    setTempSelectedImage(null);
    setFileName("هیچ فایلی انتخاب نشده است.");
    setError(null);
  };

  const handleEditClick = () => {
    setTempSelectedImage(selectedImage);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempSelectedImage(selectedImage);
    setIsEditing(false);
    setFileName("هیچ فایلی انتخاب نشده است.");
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {/* Image User */}
      <div className="relative">
        <Image
          className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-4 border-orange-300 rounded-full mb-5"
          src={
            isEditing
              ? tempSelectedImage || "/image/comment/avatar.png"
              : selectedImage || "/image/comment/avatar.png"
          }
          alt="avatar"
          width={128}
          height={128}
          sizes="(min-width: 768px)"
          priority
        />
        <button
          className="absolute bottom-5 right-0 flex items-center justify-center w-8 h-8 bg-red-500 rounded-full"
          onClick={handleDeleteImage}
          disabled={!isEditing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      {/* Change Image */}
      <form action={formActionImage}>
        <div className="flex flex-col items-start justify-center gap-y-2 mb-5">
          <h4 className="text-sm md:text-base lg:text-lg">تصویر کاربری</h4>
          <div className="space-y-2 text-xs lg:text-sm">
            <div className="flex flex-col space-y-2">
              <div
                className={`relative flex items-center justify-center py-2 pl-2 gap-x-2 border border-gray-300 ${
                  isEditing && "group hover:border-orange-300"
                } transition-colors duration-150 rounded-lg overflow-hidden`}
              >
                <button className="flex items-center justify-center px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-5 lg:size-6 text-zinc-700 dark:text-white group-hover:text-orange-300 transition-colors duration-150"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpg, .png"
                  className={`absolute top-0 left-0 w-full h-full opacity-0 ${
                    isEditing && "cursor-pointer"
                  }`}
                  onChange={handleFileChange}
                  disabled={!isEditing}
                  ref={fileInputRef}
                />
                <div className="w-px h-4 md:h-5 lg:h-6 bg-gray-500 dark:bg-gray-400"></div>
                <span className="max-w-50 text-gray-600 dark:text-gray-300 overflow-hidden">
                  {fileName}
                </span>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <p>آواتار باید JPEG یا PNG و حداکثر 200 کیلوبایت باشد.</p>
          </div>
        </div>

        {/* Save Image */}
        <div className="flex items-center justify-center w-full gap-x-2 text-sm md:text-base">
          {isEditing ? (
            <>
              <SubmitBtn
                title="ثبت"
                style="flex flex-col items-start justify-center py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-300"
                isPending={isPending}
              />
              <button
                className="flex flex-col items-start justify-center py-2 px-4 text-red-400 border border-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors duration-300"
                onClick={handleCancel}
              >
                لغو
              </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition-colors duration-300"
              onClick={handleEditClick}
            >
              <span>ویرایش تصویر</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 md:size-5 lg:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
