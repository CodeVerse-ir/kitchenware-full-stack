"use server";

import { decodeJWT } from "@/utils/helper";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

const url = process.env.MONGODB_URI;

interface informationProps {
  status: string | null;
  message: string | undefined | null;
  field: string[] | null;
  user: {
    first_name: string;
    last_name: string;
    birthdate: string;
    nickname: string;
  };
}

const getStringValue = (value: FormDataEntryValue | null): string => {
  return value === null ? "" : String(value);
};

async function action_information(
  prevState: informationProps,
  formData: FormData
): Promise<informationProps> {
  const not_trim_first_name = getStringValue(formData.get("first_name"));
  const not_trim_last_name = getStringValue(formData.get("last_name"));
  const birthdate = getStringValue(formData.get("birthdate"));
  const not_trim_nickname = getStringValue(formData.get("nickname"));

  console.log("sign up not_trim_first_name : ", not_trim_first_name);
  console.log("sign up not_trim_last_name : ", not_trim_last_name);
  console.log("login birthdate : ", birthdate);
  console.log("login not_trim_nickname : ", not_trim_nickname);

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

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" و ")} الزامی است.`,
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

  const first_name = not_trim_first_name.trim();
  const last_name = not_trim_last_name.trim();
  const nickname = not_trim_nickname.trim();

  console.log("sign up first_name : ", first_name);
  console.log("sign up last_name : ", last_name);
  console.log("sign up nickname : ", nickname);

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    // cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
      const tokenValue = token.value;

      const decodedToken = decodeJWT(tokenValue);

      if (decodedToken) {
        const user = await db.collection("users").updateOne(
          {
            username: decodedToken.username,
          },
          {
            $set: {
              first_name: first_name,
              last_name: last_name,
              birthdate: birthdate,
              nickname: nickname,
            },
          }
        );

        if (user.matchedCount === 1) {
          if (user.modifiedCount === 1) {
            return {
              ...prevState,
              status: "success",
              message: "اطلاعات با موفقیت ویرایش شد.",
              user: {
                first_name: first_name,
                last_name: last_name,
                birthdate: birthdate,
                nickname: nickname,
              },
            };
          } else {
            return {
              ...prevState,
              status: "warning",
              message: "اطلاعات تکراری است.",
              user: {
                first_name: first_name,
                last_name: last_name,
                birthdate: birthdate,
                nickname: nickname,
              },
            };
          }
        }
      }
    }
    return {
      ...prevState,
      status: "error",
      message: "ویرایش اطلاعات ناموفق بود.",
    };
  } catch (error) {
    console.error("خطا در هنگام ورود:", error);

    return {
      ...prevState,
      status: "error",
      message: "مشکلی در ارتباط با سرور رخ داده است. لطفا دوباره تلاش کنید.",
    };
  }
}

export { action_information };
