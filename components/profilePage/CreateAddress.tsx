"use client";

import { useState, useEffect, useActionState } from "react";
import { create_address } from "@/actions/profile/addresses";
import { getToastType } from "@/utils/helper";
import { toast } from "react-toastify";

// components
import SubmitBtn from "../common/SubmitBtn";
import Select from "../common/Select";

interface UserAddress {
  title: string;
  mobile_number: string;
  postal_code: string;
  state: string;
  city: string;
  address_details: string;
}

const INITIAL_STATE_Address = {
  status: null,
  message: null,
  field: null,
  user: {
    title: "",
    mobile_number: "",
    postal_code: "",
    state: "",
    city: "",
    address_details: "",
  },
};

const CreateAddress = () => {
  const [address, setAddress] = useState<UserAddress>({
    title: "",
    mobile_number: "",
    postal_code: "",
    state: "تهران",
    city: "",
    address_details: "",
  });

  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [stateAddress, formActionAddress, isPending] = useActionState(
    create_address,
    INITIAL_STATE_Address
  );

  useEffect(() => {
    toast(stateAddress?.message, {
      type: `${getToastType(stateAddress?.status)}`,
    });

    console.log("Address stateAddress : ", stateAddress);

    if (stateAddress?.status === "success") {
    }
  }, [stateAddress]);

  // get states
  useEffect(() => {
    const fetchStates = async () => {
      const response = await getDataIran("states");
      setStates(response);
    };

    fetchStates();
  }, []);

  // get cities
  useEffect(() => {
    const fetchCities = async () => {
      const response = await getDataIran(`cities?state=${address.state}`);
      setCities(response[0].cities);
    };

    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataIran = async (url: string) => {
    try {
      const response = await fetch(`/api/${url}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching states:", error);
      return null;
    }
  };

  // get cities by on select state
  const handleStateSelect = (selectedState: string) => {
    setCities(null);

    const fetchStates = async () => {
      const response = await getDataIran(`cities?state=${selectedState}`);
      setCities(response[0].cities);
    };

    setAddress((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "",
    }));

    fetchStates();
  };

  // get cities by on select state
  const handleCitySelect = (selectedCity: string) => {
    setAddress((prevData) => ({
      ...prevData,
      city: selectedCity,
    }));
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setAddress({
      title: "",
      mobile_number: "",
      postal_code: "",
      state: "تهران",
      city: "",
      address_details: "",
    });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s]*$/;
    if (pattern.test(titleValue) && titleValue.length <= 30) {
      setAddress((prev) => ({ ...prev, title: titleValue }));
    }
  };

  const handleMobile_number = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobile_numberValue = e.target.value;
    const pattern = /^[0-9]*$/;
    if (pattern.test(mobile_numberValue) && mobile_numberValue.length <= 11) {
      setAddress((prev) => ({ ...prev, mobile_number: mobile_numberValue }));
    }
  };

  const handlePostal_code = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postal_codeValue = e.target.value;
    const pattern = /^[0-9]*$/;
    if (pattern.test(postal_codeValue) && postal_codeValue.length <= 10) {
      setAddress((prev) => ({ ...prev, postal_code: postal_codeValue }));
    }
  };

  const handleAddress_details = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const address_detailsValue = e.target.value;
    const pattern = /^[\u0600-\u06FF\s\-،]*$/;
    if (
      pattern.test(address_detailsValue) &&
      address_detailsValue.length <= 20
    ) {
      setAddress((prev) => ({
        ...prev,
        address_details: address_detailsValue,
      }));
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full">
        {/* create address */}
        <div className="flex items-start justify-between w-full">
          <h4 className="font-MorabbaMedium text-lg md:text-xl lg:text-2xl">
            آدرس ها
          </h4>
          <button
            className="flex items-center justify-center gap-x-1 md:gap-x-2 py-2 text-orange-400 transition-colors duration-300"
            onClick={handleToggleForm}
          >
            <span className="text-xs md:text-sm lg:text-base">
              ایجاد آدرس جدید
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`size-4 md:size-5 lg:size-6 transition-transform duration-300 ${
                isFormVisible ? "-rotate-180" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300 mb-4"></div>
      </div>

      <div
        className={`flex flex-col items-center justify-center w-full overflow-y-hidden transition-all duration-300 ease-in-out ${
          isFormVisible ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form
          action={formActionAddress}
          className="flex flex-col items-start justify-start mb-10 xl:mb-0"
        >
          {/* title & mobile_number */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-10 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
            <div className="flex flex-col items-start justify-center gap-y-2">
              <label htmlFor="title">عنوان :</label>
              <input
                className={`w-[280px] md:w-72 xl:w-80 h-8 px-2 bg-white dark:bg-zinc-700 outline-none border ${
                  stateAddress.field?.includes("title")
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-orange-300 rounded`}
                type="text"
                id="title"
                name="title"
                autoComplete="off"
                value={address.title}
                onChange={handleTitle}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2">
              <label htmlFor="mobile_number">شماره تماس :</label>
              <input
                className={`w-[280px] md:w-72 xl:w-80 h-8 px-2 bg-white dark:bg-zinc-700 outline-none border ${
                  stateAddress.field?.includes("mobile_number")
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-orange-300 rounded`}
                type="text"
                id="mobile_number"
                name="mobile_number"
                autoComplete="off"
                value={address.mobile_number}
                onChange={handleMobile_number}
              />
            </div>
          </div>

          {/* postal_code & state */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-10 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
            <div className="flex flex-col items-start justify-center gap-y-2">
              <label htmlFor="postal_code">کد پستی :</label>
              <input
                className={`w-[280px] md:w-72 xl:w-80 h-8 px-2 bg-white dark:bg-zinc-700 outline-none border ${
                  stateAddress.field?.includes("postal_code")
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-orange-300 rounded`}
                type="text"
                id="postal_code"
                name="postal_code"
                autoComplete="off"
                value={address.postal_code}
                onChange={handlePostal_code}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2">
              <label htmlFor="state">استان :</label>
              <Select
                options={states}
                defaultValue={address.state}
                onOptionSelect={handleStateSelect}
                title="استان"
                borderStyle={`${
                  stateAddress?.field?.includes("state")
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <input type="hidden" name="state" value={address.state} />
            </div>
          </div>

          {/* city */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-10 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg md:mb-10">
            <div className="flex flex-col items-start justify-center gap-y-2 text-sm md:text-base lg:text-lg">
              <label htmlFor="city">شهرستان :</label>
              <Select
                options={cities}
                defaultValue={address.city}
                onOptionSelect={handleCitySelect}
                title="شهر"
                borderStyle={`${
                  stateAddress?.field?.includes("city")
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <input type="hidden" name="city" value={address.city} />
            </div>

            <div className="w-[280px] md:w-72 xl:w-80"></div>
          </div>

          <div className="flex items-center justify-start w-full gap-x-5 text-sm md:text-base lg:text-lg mb-5">
            {/* <!-- State --> */}
            <div className="flex flex-col items-start justify-center w-full gap-y-2">
              <label htmlFor="address_details">آدرس :</label>
              <textarea
                className={`w-full h-25 py-2 px-4 outline-none border border-gray-300 ${
                  stateAddress.field?.includes("address_details")
                    ? "border-red-500"
                    : "border-gray-400"
                } focus:border-orange-300 rounded-lg bg-white dark:bg-zinc-700`}
                id="address_details"
                name="address_details"
                placeholder="از - یا ، برای جدا سازی آدرس استفاده کنید."
                value={address.address_details}
                onChange={handleAddress_details}
              ></textarea>
            </div>
          </div>

          {/* Save Address */}
          <div className="flex items-center justify-center w-full gap-x-2 text-sm md:text-base">
            <>
              <SubmitBtn
                title="ثبت"
                style="flex flex-col items-start justify-center py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-300"
                isPending={isPending}
              />
              <button
                type="button"
                className="flex flex-col items-start justify-center py-2 px-4 text-red-400 border border-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors duration-300"
                onClick={handleToggleForm}
              >
                لغو
              </button>
            </>
          </div>
        </form>

        {/* <!-- Line --> */}
        <div className="w-full h-px my-5 bg-gray-300 mb-4"></div>
      </div>
    </div>
  );
};

export default CreateAddress;
