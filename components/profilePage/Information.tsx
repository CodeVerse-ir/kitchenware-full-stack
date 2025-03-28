"use client";

import { useState, useEffect, useActionState } from "react";
import { useSession } from "@/utils/useSession";
import { action_information } from "@/actions/profile/information";
import { getToastType } from "@/utils/helper";

// react-multi-date-picker persian
import { DateObject } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// react-multi-date-picker gregorian
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

// type
import type { Value } from "react-multi-date-picker";
import { toast } from "react-toastify";

// components
import SubmitBtn from "../common/SubmitBtn";

interface UserInformation {
  first_name: string;
  last_name: string;
  birthdate_persian: string;
  birthdate_gregorian: string;
  nickname: string;
}

const INITIAL_STATE_Information = {
  status: null,
  message: null,
  field: null,
  user: {
    first_name: "",
    last_name: "",
    birthdate: "",
    nickname: "",
  },
};

const convertDate = (value: Value | undefined) => {
  if (value) {
    const date = new DateObject(value);
    return date.convert(persian, persian_fa).format("YYYY/MM/DD");
  }
};

const persianDate = (value: Value | undefined) => {
  if (value) {
    const date = new DateObject(value);
    return date.convert(persian, persian_fa).format("YYYY/MM/DD");
  }
};

const gregorianDate = (value: Value) => {
  if (value) {
    const date = new DateObject(value);
    return date.convert(gregorian, gregorian_en).format("YYYY-MM-DD");
  }
};

const Information = () => {
  const { user, userContext } = useSession();

  const [information, setInformation] = useState<UserInformation>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    birthdate_persian: convertDate(user?.birthdate) || "",
    birthdate_gregorian: user?.birthdate || "",
    nickname: user?.nickname || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInformation, setTempInformation] = useState<UserInformation>({
    ...information,
  });

  const [stateInformation, formActionInformation, isPending] = useActionState(
    action_information,
    INITIAL_STATE_Information
  );

  useEffect(() => {
    toast(stateInformation?.message, {
      type: `${getToastType(stateInformation?.status)}`,
    });

    console.log("Information stateInformation : ", stateInformation);

    if (stateInformation?.status === "success") {
      userContext((prev) => ({
        ...prev,
        first_name: stateInformation.user.first_name,
        last_name: stateInformation.user.last_name,
        birthdate: stateInformation.user.birthdate,
        nickname: stateInformation.user.nickname,
      }));
      setInformation({
        first_name: stateInformation.user.first_name,
        last_name: stateInformation.user.last_name,
        birthdate_persian: convertDate(stateInformation.user.birthdate) || "",
        birthdate_gregorian: stateInformation.user.birthdate,
        nickname: stateInformation.user.nickname,
      });
      setIsEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateInformation]);

  const today = new DateObject({ calendar: persian });
  const minDate = new DateObject({ calendar: persian })
    .subtract(100, "year")
    .set({ day: 1, month: 1, year: today.year - 100 });

  const handleFirst_name = (e: React.ChangeEvent<HTMLInputElement>) => {
    const first_nameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(first_nameValue) && first_nameValue.length <= 30) {
      setTempInformation((prev) => ({ ...prev, first_name: first_nameValue }));
    }
  };

  const handleLast_name = (e: React.ChangeEvent<HTMLInputElement>) => {
    const last_nameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(last_nameValue) && last_nameValue.length <= 30) {
      setTempInformation((prev) => ({ ...prev, last_name: last_nameValue }));
    }
  };

  const handleBirthdate = (value: Value) => {
    if (value) {
      setTempInformation((prev) => ({
        ...prev,
        birthdate_persian: persianDate(value) || "",
        birthdate_gregorian: gregorianDate(value) || "",
      }));
    }
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(nicknameValue) && nicknameValue.length <= 20) {
      setTempInformation((prev) => ({ ...prev, nickname: nicknameValue }));
    }
  };

  const handleEditClick = () => {
    setTempInformation({ ...information });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempInformation({ ...information });
    setIsEditing(false);
  };

  return (
    <form
      action={formActionInformation}
      className="flex flex-col items-start justify-normal mb-10 xl:mb-0"
    >
      {/* First & Last Name */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <span>نام :</span>
          <input
            className={`w-72 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="first_name"
            name="first_name"
            autoComplete="off"
            value={
              isEditing ? tempInformation.first_name : information.first_name
            }
            onChange={handleFirst_name}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <span>نام خانوادگی :</span>
          <input
            className={`w-72 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="last_name"
            name="last_name"
            autoComplete="off"
            value={
              isEditing ? tempInformation.last_name : information.last_name
            }
            onChange={handleLast_name}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Birthdate & Nickname */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <span>تاریخ تولد :</span>
          <div dir="ltr">
            <DatePicker
              className="custom-calendar"
              inputClass={`w-72 h-8 px-2 ${
                isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
              } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
              style={{ borderColor: "transparent !important" }}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
              minDate={minDate}
              maxDate={today}
              value={
                isEditing
                  ? tempInformation.birthdate_persian
                  : information.birthdate_persian
              }
              onChange={handleBirthdate}
              disabled={!isEditing}
            />
            <input
              type="hidden"
              name="birthdate"
              value={tempInformation.birthdate_gregorian}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <span>نام نمایشی (اختیاری) :</span>
          <input
            className={`w-72 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="nickname"
            name="nickname"
            autoComplete="off"
            value={isEditing ? tempInformation.nickname : information.nickname}
            onChange={handleNickname}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Save Information */}
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
            <span>ویرایش مشخصات</span>
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default Information;
