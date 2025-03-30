"use client";

import { useState, useEffect, useActionState } from "react";
import { delete_address, edit_address } from "@/actions/profile/addresses";
import { getToastType } from "@/utils/helper";
import { toast } from "react-toastify";

// components
import Select from "../common/Select";
import Modal from "../common/Modal";

interface EditAddressProps {
  data: {
    index: number;
    id: string;
    title: string;
    mobile_number: string;
    postal_code: string;
    state: string;
    city: string;
    address_details: string;
  };
}

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
    id: "",
    title: "",
    mobile_number: "",
    postal_code: "",
    state: "",
    city: "",
    address_details: "",
  },
};

const EditAddress: React.FC<EditAddressProps> = ({ data }) => {
  const [editAddress, setAddress] = useState<UserAddress>({
    title: data.title,
    mobile_number: data.mobile_number,
    postal_code: data.postal_code,
    state: data.state,
    city: data.city,
    address_details: data.address_details,
  });

  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const [loading, setLoading] = useState(false);

  const [stateEditAddress, formActionEditAddress, isPending] = useActionState(
    edit_address,
    INITIAL_STATE_Address
  );

  useEffect(() => {
    toast(stateEditAddress?.message, {
      type: `${getToastType(stateEditAddress?.status)}`,
    });

    console.log("Address stateEditAddress : ", stateEditAddress);

    if (stateEditAddress?.status === "success") {
    }
  }, [stateEditAddress]);

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
      const response = await getDataIran(`cities?state=${editAddress.state}`);
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

  const handleDelete = async () => {
    setLoading(true);
    const res = await delete_address(data.id);
    toast(res.message, { type: getToastType(res.status) });
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full text-start">
        <div className="flex items-center justify-center size-5 p-3 text-zinc-700 dark:text-gray-400 border-b border-b-zinc-700 dark:border-b-gray-400">
          {data.index.toString()}
        </div>
      </div>

      <form
        action={formActionEditAddress}
        className="flex flex-col items-start justify-start mb-10 xl:mb-0"
      >
        {/* title & mobile_number */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-10 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg mb-5 md:mb-10">
          <div className="flex flex-col items-start justify-center gap-y-2">
            <label htmlFor="title">عنوان :</label>
            <input
              className={`w-[280px] md:w-72 xl:w-80 h-8 px-2 bg-white dark:bg-zinc-700 outline-none border ${
                stateEditAddress.field?.includes("title")
                  ? "border-red-500"
                  : "border-gray-400"
              } focus:border-orange-300 rounded`}
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              value={editAddress.title}
              onChange={handleTitle}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2">
            <label htmlFor="mobile_number">شماره تماس :</label>
            <input
              className={`w-[280px] md:w-72 xl:w-80 h-8 px-2 bg-white dark:bg-zinc-700 outline-none border ${
                stateEditAddress.field?.includes("mobile_number")
                  ? "border-red-500"
                  : "border-gray-400"
              } focus:border-orange-300 rounded`}
              type="text"
              id="mobile_number"
              name="mobile_number"
              autoComplete="off"
              value={editAddress.mobile_number}
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
                stateEditAddress.field?.includes("postal_code")
                  ? "border-red-500"
                  : "border-gray-400"
              } focus:border-orange-300 rounded`}
              type="text"
              id="postal_code"
              name="postal_code"
              autoComplete="off"
              value={editAddress.postal_code}
              onChange={handlePostal_code}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2">
            <label htmlFor="state">استان :</label>
            <Select
              options={states}
              defaultValue={editAddress.state}
              onOptionSelect={handleStateSelect}
              title="استان"
              borderStyle={`${
                stateEditAddress?.field?.includes("state")
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <input type="hidden" name="state" value={editAddress.state} />
          </div>
        </div>

        {/* city */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-x-10 gap-y-5 md:gap-y-0 text-sm md:text-base lg:text-lg md:mb-10">
          <div className="flex flex-col items-start justify-center gap-y-2 text-sm md:text-base lg:text-lg">
            <label htmlFor="city">شهرستان :</label>
            <Select
              options={cities}
              defaultValue={editAddress.city}
              onOptionSelect={handleCitySelect}
              title="شهر"
              borderStyle={`${
                stateEditAddress?.field?.includes("city")
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <input type="hidden" name="city" value={editAddress.city} />
          </div>

          {/* id hidden */}
          <div className="w-[280px] md:w-72 xl:w-80">
            <input type="hidden" name="id" value={data.id} />
          </div>
        </div>

        <div className="flex items-center justify-start w-full gap-x-5 text-sm md:text-base lg:text-lg mb-5">
          {/* <!-- State --> */}
          <div className="flex flex-col items-start justify-center w-full gap-y-2">
            <label htmlFor="address_details">آدرس :</label>
            <textarea
              className={`w-full h-25 py-2 px-4 outline-none border border-gray-300 ${
                stateEditAddress.field?.includes("address_details")
                  ? "border-red-500"
                  : "border-gray-400"
              } focus:border-orange-300 rounded-lg bg-white dark:bg-zinc-700`}
              id="address_details"
              name="address_details"
              placeholder="از - یا ، برای جدا سازی آدرس استفاده کنید."
              value={editAddress.address_details}
              onChange={handleAddress_details}
            ></textarea>
          </div>
        </div>

        {/* Save Address */}
        <div className="flex items-center justify-center w-full gap-x-2 text-sm md:text-base">
          <Modal
            modalId={"edit" + data.id}
            btn_type="submit"
            btn_style="flex flex-col items-start justify-center py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-300"
            btn_text="ویرایش آدرس"
            title="ویرایش آدرس"
            text="آیا از ویرایش آدرس مطمعن هستید؟"
            isPending={isPending}
          />

          <Modal
            modalId={"delete" + data.id}
            btn_type="button"
            btn_style="flex flex-col items-start justify-center py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300"
            btn_text="حذف آدرس"
            title="حذف آدرس"
            text="آیا از حذف آدرس مطمعن هستید؟"
            isPending={loading}
            onConfirm={handleDelete}
          />
        </div>
      </form>

      {/* <!-- Line --> */}
      <div className="w-full h-px my-5 bg-gray-300 mb-4"></div>
    </div>
  );
};

export default EditAddress;
