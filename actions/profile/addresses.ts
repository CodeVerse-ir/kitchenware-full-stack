"use server";

import { axiosFetch } from "@/utils/axios_fetch";
import { cookies } from "next/headers";

interface create_addressProps {
  status: string | null;
  message: string | undefined | null;
  field?: string[] | null;
  user?: {
    title: string;
    mobile_number: string;
    postal_code: string;
    state: string;
    city: string;
    address_details: string;
  };
}

const getStringValue = (value: FormDataEntryValue | null): string => {
  return value === null ? "" : String(value);
};

async function create_address(
  prevState: create_addressProps,
  formData: FormData
): Promise<create_addressProps> {
  const not_trim_title = getStringValue(formData.get("title"));
  const mobile_number = getStringValue(formData.get("mobile_number"));
  const postal_code = getStringValue(formData.get("postal_code"));
  const state = getStringValue(formData.get("state"));
  const city = getStringValue(formData.get("city"));
  const not_trim_address_details = getStringValue(
    formData.get("address_details")
  );

  console.log("create_address not_trim_title : ", not_trim_title);
  console.log("create_address mobile_number : ", mobile_number);
  console.log("create_address postal_code : ", postal_code);
  console.log("create_address state : ", state);
  console.log("create_address city : ", city);
  console.log(
    "create_address not_trim_address_details : ",
    not_trim_address_details
  );

  const emptyFields: string[] = [];
  const message: string[] = [];

  if (not_trim_title === null || not_trim_title === "") {
    emptyFields.push("title");
    message.push("عنوان");
  }
  if (mobile_number === null || mobile_number === "") {
    emptyFields.push("mobile_number");
    message.push("شماره تماس");
  }
  if (postal_code === null || postal_code === "") {
    emptyFields.push("postal_code");
    message.push("کد پستی");
  }
  if (state === null || state === "") {
    emptyFields.push("state");
    message.push("استان");
  }
  if (city === null || city === "") {
    emptyFields.push("city");
    message.push("شهرستان");
  }
  if (not_trim_address_details === null || not_trim_address_details === "") {
    emptyFields.push("address_details");
    message.push("آدرس");
  }

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" ، ")} الزامی است.`,
      field: emptyFields,
    };
  }

  if (not_trim_title.length < 3) {
    return {
      ...prevState,
      status: "error",
      message: "عنوان باید حداقل 3 کاراکتر باشد.",
      field: ["title"],
    };
  }

  const mobilePattern = /^09\d{9}$/;
  if (!mobilePattern.test(mobile_number)) {
    return {
      ...prevState,
      status: "error",
      message: "شماره تماس نامعتبر است.",
      field: ["mobile_number"],
    };
  }

  const postal_codePattern = /^[0-9]*$/;
  if (!postal_codePattern.test(postal_code)) {
    return {
      ...prevState,
      status: "error",
      message: "کد پستی نامعتبر است.",
      field: ["mobile_number"],
    };
  }

  if (not_trim_address_details.length < 3) {
    return {
      ...prevState,
      status: "error",
      message: "آدرس باید حداقل 3 کاراکتر باشد.",
      field: ["address_details"],
    };
  }

  const title = not_trim_title.trim();
  const address_details = not_trim_address_details.trim();

  console.log("create_address title : ", title);
  console.log("create_address address_details : ", address_details);

  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const createAddress = await axiosFetch({
      fetchType: "post",
      url: "profile/address",
      data: { title, mobile_number, postal_code, state, city, address_details },
      token: tokenValue,
    });

    if (!createAddress.error) {
      //   revalidatePath("/profile/bookmark");

      return {
        status: "success",
        message: "آدرس با موفقیت ثبت شد.",
      };
    }
    if (createAddress && createAddress.error.statusCode === 400) {
      return {
        status: "error",
        message: createAddress.error.message,
        field: ["postal_code"],
      };
    }
    return {
      status: "error",
      message: "آدرس ثبت نشد.",
    };
  }
  return {
    status: "error",
    message: "توکن احراز هویت وجود ندارد.",
  };
}

export { create_address };
