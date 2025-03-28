"use server";

import { cookies } from "next/headers";
import { MongoClient } from "mongodb";
import {
  createHash,
  createJWT,
  decodeJWT,
  generateRandomOTP,
} from "@/utils/helper";

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

interface otpProps {
  status: string | null;
  message: string | undefined | null;
  error_code: number | undefined | null;
  field: string[] | null;
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
      active: true,
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

      return {
        ...prevState,
        status: "error",
        message,
        error_code,
      };
    } else {
      const hashedPassword = createHash(password);

      // time
      const now = new Date();
      const twoMinutesLater = new Date(now.getTime() + 2 * 60000);

      await db.collection("users").updateOne(
        {
          $or: [{ username: username }, { mobile_number: mobile_number }],
          active: false,
        },
        {
          $set: {
            first_name,
            last_name,
            mobile_number,
            username,
            password: hashedPassword,
            image: "/image/profile/avatar.png",
            created_at: now,
            active: false,
            otp_code: generateRandomOTP(),
            otp_validity_time: twoMinutesLater,
            bookmarked_products: [],
            lieked_products: [],
          },
        },
        { upsert: true }
      );

      // JWT
      const payload = {
        username,
        mobile_number,
        created_at: new Date(),
      };
      const token = createJWT(payload);

      if (token) {
        const cookieStore = await cookies();
        cookieStore.set({
          name: "signup_token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        // All items except mobile number are empty
        return {
          ...prevState,
          status: "success",
          message: "کد احراز هویت برای شما ارسال شد.",
          field: [],
          user_information: {
            first_name,
            last_name,
            mobile_number,
            username,
            password,
            repeat_password,
          },
        };
      }
    }
  } catch (error) {
    console.error("خطا در هنگام ورود:", error);

    return {
      ...prevState,
      status: "error",
      message: "مشکلی در ارتباط با سرور رخ داده است. لطفا دوباره تلاش کنید.",
      field: null,
    };
  }
  return {
    ...prevState,
    status: "error",
    message: "عملیات نامشخصی انجام شد.",
    field: null,
  };
}

async function checkOtp(
  prevState: otpProps,
  formData: FormData
): Promise<otpProps> {
  const otp0 = getStringValue(formData.get("otp0"));
  const otp1 = getStringValue(formData.get("otp1"));
  const otp2 = getStringValue(formData.get("otp2"));
  const otp3 = getStringValue(formData.get("otp3"));
  const otp4 = getStringValue(formData.get("otp4"));

  if (otp0 === "" || otp1 === "" || otp2 === "" || otp3 === "" || otp4 === "") {
    return {
      ...prevState,
      status: "error",
      message: "کد احراز هویت الزامی است.",
      field: ["otp"],
    };
  }

  const verification_code = otp0 + otp1 + otp2 + otp3 + otp4;

  console.log("sign up verification_code : ", verification_code);

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    const cookieStore = await cookies();
    const signup_token = cookieStore.get("signup_token");

    if (signup_token) {
      const tokenValue = signup_token.value;

      const decodedToken = decodeJWT(tokenValue);

      if (decodedToken) {
        if (decodedToken.created_at) {
        }
        const user = await db.collection("users").findOne({
          username: decodedToken.username,
          mobile_number: decodedToken.mobile_number,
        });

        console.log("sign up decodedToken otp_code : ", user?.otp_code);

        if (user) {
          if (Number(verification_code) === user.otp_code) {
            // time
            const now = new Date();
            if (user.otp_validity_time < now) {
              return {
                ...prevState,
                status: "error",
                message:
                  "زمان اعتبار کد گذشته است ، روی دکمه دریافت مجدد کد کلیک کنید.",
                field: ["otp"],
                error_code: null,
              };
            }

            await db
              .collection("users")
              .updateOne(
                { username: decodedToken.username },
                { $set: { active: true, otp_code: 0 } }
              );
            cookieStore.delete("signup_token");
            return {
              ...prevState,
              status: "success",
              message: "اطلاعات با موفقیت ثبت شد ، وارد شوید.",
              field: [],
            };
          }
        }
      }
    }
    return {
      ...prevState,
      status: "error",
      message: "کد احراز هویت نادرست است.",
      field: ["otp"],
      error_code: null,
    };
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

export { fullNameAndMobile, usernameAndPassword, checkOtp };
