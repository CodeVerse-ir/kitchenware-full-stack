"use server";

import { cookies } from "next/headers";
import { MongoClient } from "mongodb";
import { createHash, createJWT } from "@/utils/helper";

const url = process.env.MONGODB_URI;

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

interface usernameAndPasswordProps {
  status: string | null;
  message: string | undefined | null;
  error_code: number | undefined | null;
  field: string[] | null;
  user_information?: {
    first_name: string;
    last_name: string;
    mobile_number: string;
    username: string;
    password: string;
    repeat_password: string;
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

async function usernameAndPassword(
  prevState: usernameAndPasswordProps,
  formData: FormData
): Promise<usernameAndPasswordProps> {
  const first_name = getStringValue(formData.get("first_name"));
  const last_name = getStringValue(formData.get("last_name"));
  const mobile_number = getStringValue(formData.get("mobile_number"));
  const not_trim_username = getStringValue(formData.get("username"));
  const password = getStringValue(formData.get("password"));
  const repeat_password = getStringValue(formData.get("repeat_password"));

  console.log("sign up first_name : ", first_name);
  console.log("sign up last_name : ", last_name);
  console.log("sign up mobile_number : ", mobile_number);
  console.log("sign up not_trim_username : ", not_trim_username);
  console.log("sign up password : ", password);
  console.log("sign up repeat_password : ", repeat_password);

  const emptyFields: string[] = [];
  const message: string[] = [];

  if (not_trim_username === null || not_trim_username === "") {
    emptyFields.push("username");
    message.push("نام کاربری");
  }
  if (password === null || password === "") {
    emptyFields.push("password");
    message.push("رمز عبور");
  }
  if (repeat_password === null || repeat_password === "") {
    emptyFields.push("repeat_password");
    message.push("تکرار رمز عبور");
  }

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" ، ")} الزامی است.`,
      field: emptyFields,
    };
  }

  if (not_trim_username.length < 5) {
    return {
      ...prevState,
      status: "error",
      message: "نام کاربری باید حداقل 5 کاراکتر باشد.",
      field: ["username"],
    };
  }

  if (password.length < 8) {
    return {
      ...prevState,
      status: "error",
      message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
      field: ["password"],
    };
  }

  if (password !== repeat_password) {
    return {
      ...prevState,
      status: "error",
      message: "رمز عبور با تکرار آن یکسان نیست.",
      field: ["password", "repeat_password"],
    };
  }

  const username = not_trim_username.trim();
  console.log("sign up username : ", username);

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({
      $or: [{ mobile_number }, { username }],
    });

    if (existingUser) {
      let message;
      let error_code;

      if (existingUser.mobile_number === mobile_number) {
        message = "شماره موبایل تکراری است.";
        error_code = 1;
      } else if (existingUser.username === username) {
        message = "نام کاربری تکراری است.";
        error_code = 2;
      }

      // All items except mobile number are empty
      return {
        ...prevState,
        status: "error",
        message,
        error_code,
        user_information: {
          mobile_number,
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          repeat_password: "",
        },
      };
    } else {
      const hashedPassword = createHash(password);

      await db.collection("users").insertOne({
        first_name,
        last_name,
        mobile_number,
        username,
        password: hashedPassword,
        image: "/image/comment/avatar.png",
        created_at: new Date(),
      });

      // JWT
      const payload = {
        username,
        createdAt: new Date(),
      };
      const token = createJWT(payload);

      const cookieStore = await cookies();
      cookieStore.set({
        name: "signup_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return {
        ...prevState,
        status: "success",
        message: "کد احراز هویت برای شما ارسال شد.",
        field: [],
      };
    }
  } catch (error) {
    console.error("خطا در هنگام ورود:", error);

    return {
      ...prevState,
      status: "error",
      message: "مشکلی در ارتباط با سرور رخ داده است. لطفا دوباره تلاش کنید.",
    };
  } finally {
    await client.close();
  }
}

export { fullNameAndMobile, usernameAndPassword };
