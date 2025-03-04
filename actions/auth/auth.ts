"use server";

import {
  createHash,
  createJWT,
  decodeJWT,
  generateRandomOTP,
} from "@/utils/helper";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

const url = process.env.MONGODB_URI;

interface loginProps {
  status: string | null;
  message: string | undefined | null;
  field: string[] | null;
}

interface checkOtpProps {
  status: string | null;
  message: string | undefined | null;
  field: string[] | null;
  user: {
    first_name: string;
    last_name: string;
    mobile_number: string;
    username: string;
  };
}

interface meProps {
  user: {
    first_name: string;
    last_name: string;
    mobile_number: string;
    username: string;
  } | null;
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

    const user = await db.collection("users").updateOne(
      { username: username, password: createHash(password), active: true },
      {
        $set: {
          otp_code: generateRandomOTP(),
        },
      }
    );

    if (user.matchedCount === 1 && user.modifiedCount === 1) {
      // JWT
      const payload = {
        username,
        created_at: new Date(),
      };
      const token = createJWT(payload);

      if (token) {
        const cookieStore = await cookies();
        cookieStore.set({
          name: "login_token",
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

async function checkOtp(
  prevState: checkOtpProps,
  formData: FormData
): Promise<checkOtpProps> {
  const otp0 = getStringValue(formData.get("otp0"));
  const otp1 = getStringValue(formData.get("otp1"));
  const otp2 = getStringValue(formData.get("otp2"));
  const otp3 = getStringValue(formData.get("otp3"));
  const otp4 = getStringValue(formData.get("otp4"));

  if (otp0 === "" || otp1 === "" || otp2 === "" || otp3 === "" || otp4 === "") {
    return {
      ...prevState,
      status: "error",
      message: "کد ورود الزامی است.",
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
    const login_token = cookieStore.get("login_token");

    if (login_token) {
      const tokenValue = login_token.value;

      const decodedToken = decodeJWT(tokenValue);

      if (decodedToken) {
        const user = await db.collection("users").findOne({
          username: decodedToken.username,
        });

        console.log("login otp_code : ", user?.otp_code);

        if (user) {
          if (Number(verification_code) === user.otp_code) {
            await db
              .collection("users")
              .updateOne(
                { username: decodedToken.username },
                { $set: { otp_code: 0 } }
              );
            cookieStore.delete("login_token");

            // JWT
            const payload = {
              username: decodedToken.username,
              created_at: new Date(),
            };
            const token = createJWT(payload);

            if (token) {
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
                message: "شما با موفقیت وارد شدید.",
                field: [],
                user: {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  mobile_number: user.mobile_number,
                  username: user.username,
                },
              };
            }
          }
        }
      }
    }
    return {
      ...prevState,
      status: "error",
      message: "کد ورود نادرست است.",
      field: ["otp"],
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

async function me(): Promise<meProps> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const client = new MongoClient(`${url}`);

    try {
      await client.connect();

      const db = client.db();
      const tokenValue = token.value;
      const decodedToken = decodeJWT(tokenValue);

      if (decodedToken) {
        const user = await db.collection("users").findOne({
          username: decodedToken.username,
        });

        if (user) {
          return {
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              mobile_number: user.mobile_number,
              username: user.username,
            },
          };
        }
      }

      return {
        user: null,
      };
    } catch (error) {
      console.error("خطا در هنگام ورود:", error);
      return {
        user: null,
      };
    } finally {
      await client.close();
    }
  } else {
    return {
      user: null,
    };
  }
}

async function logout() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("token");

  if (hasCookie) {
    cookieStore.delete("token");
  }
}

export { login, checkOtp, me, logout };
