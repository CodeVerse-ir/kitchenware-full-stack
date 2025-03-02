"use server";

import { createHash, createJWT } from "@/utils/helper";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

const url = process.env.MONGODB_URI;

interface loginProps {
  status: string | null;
  message: string | undefined | null;
  field: string[] | null;
}

const getStringValue = (value: FormDataEntryValue | null): string => {
  return value === null ? "" : String(value);
};

async function login(
  prevState: loginProps,
  formData: FormData
): Promise<loginProps> {
  const username = getStringValue(formData.get("username"));
  const password = getStringValue(formData.get("password"));

  console.log("login username : ", username);
  console.log("login password : ", password);

  const emptyFields: string[] = [];
  const message: string[] = [];

  if (username === null || username === "") {
    emptyFields.push("username");
    message.push("نام کاربری");
  }
  if (password === null || password === "") {
    emptyFields.push("password");
    message.push("رمز عبور");
  }

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" و ")} الزامی است.`,
      field: emptyFields,
    };
  }

  if (username.length < 5) {
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
      message: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
      field: ["password"],
    };
  }

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    const user = await db.collection("users").findOne({
      username: username,
      password: createHash(password),
      active: true,
    });

    if (user) {
      // JWT
      const payload = {
        username,
        created_at: new Date(),
      };
      const token = createJWT(payload);

      if (token) {
        const cookieStore = await cookies();
        cookieStore.set({
          name: "token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        return {
          ...prevState,
          status: "success",
          message: "کد ورود برای شما ارسال شد.",
        };
      } else {
        return {
          ...prevState,
          status: "error",
          message: "نام کاربری یا رمز عبور نادرست است.",
        };
      }
    } else {
      return {
        ...prevState,
        status: "error",
        message: "نام کاربری یا رمز عبور نادرست است.",
      };
    }
  } catch (error) {
    console.error("خطا در هنگام ورود:", error);

    return {
      ...prevState,
      status: "error",
      message: "مشکلی در ارتباط با سرور رخ داده است. لطفا دوباره تلاش کنید.",
    };
  }
}

export { login };
