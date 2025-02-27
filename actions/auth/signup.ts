"use server";

interface fullNameAndMobileProps {
  status: string | null;
  message: string | null;
  field: string[] | null;
  user_information?: {
    first_name: string;
    last_name: string;
    mobile_number: string;
  };
}

const getStringValue = (value: FormDataEntryValue | null): string => {
  return value === null ? "" : String(value);
};

async function fullNameAndMobile(
  prevState: fullNameAndMobileProps,
  formData: FormData
): Promise<fullNameAndMobileProps> {
  const not_trim_first_name = getStringValue(formData.get("first_name"));
  const not_trim_last_name = getStringValue(formData.get("last_name"));
  const mobile_number = getStringValue(formData.get("mobile_number"));

  console.log("sign up not_trim_first_name : ", not_trim_first_name);
  console.log("sign up not_trim_last_name : ", not_trim_last_name);
  console.log("sign up mobile_number : ", mobile_number);

  const emptyFields: string[] = [];
  const message: string[] = [];

  if (not_trim_first_name === null || not_trim_first_name === "") {
    emptyFields.push("first_name");
    message.push("نام");
  }
  if (not_trim_last_name === null || not_trim_last_name === "") {
    emptyFields.push("last_name");
    message.push("نام خانوادگی");
  }
  if (mobile_number === null || mobile_number === "") {
    emptyFields.push("mobile_number");
    message.push("شماره تلفن همراه");
  }

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" ، ")} الزامی است.`,
      field: emptyFields,
    };
  }

  if (not_trim_first_name.length < 3) {
    return {
      ...prevState,
      status: "error",
      message: "نام باید حداقل 3 کاراکتر باشد.",
      field: ["first_name"],
    };
  }

  if (not_trim_last_name.length < 3) {
    return {
      ...prevState,
      status: "error",
      message: "نام خانوادگی باید حداقل 3 کاراکتر باشد.",
      field: ["last_name"],
    };
  }

  const mobilePattern = /^09\d{9}$/;
  if (!mobilePattern.test(mobile_number)) {
    return {
      ...prevState,
      status: "error",
      message: "شماره تلفن همراه نامعتبر است.",
      field: ["mobile_number"],
    };
  }

  const first_name = not_trim_first_name.trim();
  const last_name = not_trim_last_name.trim();

  console.log("sign up first_name : ", first_name);
  console.log("sign up last_name : ", last_name);

  return {
    ...prevState,
    status: "success",
    message: "اطلاعات با موفقیت ثبت شد.",
    field: [],
    user_information: { first_name, last_name, mobile_number },
  };
}

export { fullNameAndMobile };
