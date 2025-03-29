"use client";

import { useState, useEffect, useActionState } from "react";
import { useSession } from "@/utils/useSession";
import { action_information } from "@/actions/profile/information";
import { getToastType } from "@/utils/helper";
import { toast } from "react-toastify";

// components
import SubmitBtn from "../common/SubmitBtn";

interface UserAddress {
  first_name: string;
  last_name: string;
  birthdate_persian: string;
  birthdate_gregorian: string;
  nickname: string;
}

const INITIAL_STATE_Address = {
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

const Address = () => {
  const [Address, setAddress] = useState<UserAddress>({
    // title: user?.title || "",
    // mobile_number: user?.mobile_number || "",
    // province: user?.province || "",
    // city: user?.city || "",
    // address_details: user?.address_details || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState<UserAddress>({
    ...Address,
  });

  const [stateAddress, formActionAddress, isPending] = useActionState(
    action_information,
    INITIAL_STATE_Address
  );

  useEffect(() => {
    toast(stateAddress?.message, {
      type: `${getToastType(stateAddress?.status)}`,
    });

    console.log("Address stateAddress : ", stateAddress);

    if (stateAddress?.status === "success") {
      userContext((prev) => ({
        ...prev,
        first_name: stateAddress.user.first_name,
        last_name: stateAddress.user.last_name,
        birthdate: stateAddress.user.birthdate,
        nickname: stateAddress.user.nickname,
      }));
      setAddress({
        first_name: stateAddress.user.first_name,
        last_name: stateAddress.user.last_name,
        birthdate_persian: convertDate(stateAddress.user.birthdate) || "",
        birthdate_gregorian: stateAddress.user.birthdate,
        nickname: stateAddress.user.nickname,
      });
      setIsEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAddress]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const first_nameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(first_nameValue) && first_nameValue.length <= 30) {
      setTempAddress((prev) => ({ ...prev, first_name: first_nameValue }));
    }
  };

  const handleMobile_number = (e: React.ChangeEvent<HTMLInputElement>) => {
    const last_nameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(last_nameValue) && last_nameValue.length <= 30) {
      setTempAddress((prev) => ({ ...prev, last_name: last_nameValue }));
    }
  };

  const handlePostal_code = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(nicknameValue) && nicknameValue.length <= 20) {
      setTempAddress((prev) => ({ ...prev, nickname: nicknameValue }));
    }
  };

  const handleProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(nicknameValue) && nicknameValue.length <= 20) {
      setTempAddress((prev) => ({ ...prev, nickname: nicknameValue }));
    }
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(nicknameValue) && nicknameValue.length <= 20) {
      setTempAddress((prev) => ({ ...prev, nickname: nicknameValue }));
    }
  };

  const handleAddress_details = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(nicknameValue) && nicknameValue.length <= 20) {
      setTempAddress((prev) => ({ ...prev, nickname: nicknameValue }));
    }
  };

  const handleEditClick = () => {
    setTempAddress({ ...Address });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempAddress({ ...Address });
    setIsEditing(false);
  };

  return (
    <form
      action={formActionAddress}
      className="flex flex-col items-start justify-normal mb-10 xl:mb-0"
    >
      {/* title & mobile_number */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="title">عنوان :</label>
          <input
            className={`w-80 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            // value={isEditing ? tempAddress.first_name : Address.first_name}
            // onChange={handleFirst_name}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="mobile_number">شماره تماس :</label>
          <input
            className={`w-80 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="mobile_number"
            name="mobile_number"
            autoComplete="off"
            // value={isEditing ? tempAddress.last_name : Address.last_name}
            // onChange={handleLast_name}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* postal_code & province */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="postal_code">کد پستی :</label>
          <input
            className={`w-80 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="postal_code"
            name="postal_code"
            autoComplete="off"
            // value={isEditing ? tempAddress.last_name : Address.last_name}
            // onChange={handleLast_name}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="province">استان :</label>
          <input
            className={`w-80 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="province"
            name="province"
            autoComplete="off"
            // value={isEditing ? tempAddress.nickname : Address.nickname}
            // onChange={handleNickname}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* city */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-x-5 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="city">شهر :</label>
          <input
            className={`w-80 h-8 px-2 ${
              isEditing ? "text-zinc-800 dark:text-white" : "text-gray-500"
            } bg-white dark:bg-zinc-700 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded`}
            type="text"
            id="city"
            name="city"
            autoComplete="off"
            // value={isEditing ? tempAddress.last_name : Address.last_name}
            // onChange={handleLast_name}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="flex items-center justify-start gap-x-5 text-sm md:text-base lg:text-lg mb-5">
        {/* <!-- State --> */}
        <div className="flex flex-col items-start justify-center gap-y-2">
          <label htmlFor="address_details">آدرس :</label>
          <textarea
            className="w-72 md:w-[660px] h-25 py-2 px-4 outline-none outline-[1px] outline-gray-300 focus-visible:outline-orange-300 rounded-lg bg-white dark:bg-zinc-700"
            id="address_details"
            name="address_details"
          ></textarea>
        </div>
      </div>

      {/* Save Address */}
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
            <span>ویرایش آدرس</span>
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

export default Address;
