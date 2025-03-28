"use server";

import { decodeJWT } from "@/utils/helper";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { writeFile, mkdir, access } from "fs/promises";
import { constants } from "fs";
import { join } from "path";
import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";

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

interface imageProps {
  status: string | null;
  message: string | undefined | null;
  field: string[] | null;
  user: {
    image: string;
  };
}

interface deleteProps {
  status: string;
  message: string;
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

  console.log("action_information not_trim_first_name : ", not_trim_first_name);
  console.log("action_information not_trim_last_name : ", not_trim_last_name);
  console.log("action_information birthdate : ", birthdate);
  console.log("action_information not_trim_nickname : ", not_trim_nickname);

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
  if (birthdate === null || birthdate === "") {
    emptyFields.push("birthdate");
    message.push("تاریخ تولد");
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

  console.log("action_information first_name : ", first_name);
  console.log("action_information last_name : ", last_name);
  console.log("action_information nickname : ", nickname);

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

async function action_image(
  prevState: imageProps,
  formData: FormData
): Promise<imageProps> {
  const image = formData.get("image") as File;

  if (!image || image.size === 0) {
    return {
      ...prevState,
      status: "error",
      message: "عکس الزامی است.",
      field: ["image"],
    };
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    const uploadDir = join(process.cwd(), "public/image/profile");
    const filename = `${Date.now()}-${image.name}`;
    const filePath = join(uploadDir, filename);

    try {
      await access(uploadDir, constants.F_OK);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    await client.connect();
    const db = client.db();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return {
        ...prevState,
        status: "error",
        message: "احراز هویت ناموفق بود.",
      };
    }

    const decodedToken = decodeJWT(token.value);
    if (!decodedToken) {
      return {
        ...prevState,
        status: "error",
        message: "توکن نامعتبر است.",
      };
    }

    const result = await db
      .collection("users")
      .updateOne(
        { username: decodedToken.username },
        { $set: { image: `/image/profile/${filename}` } }
      );

    if (result.matchedCount === 0) {
      return {
        ...prevState,
        status: "error",
        message: "کاربر یافت نشد.",
      };
    }

    return {
      ...prevState,
      status: "success",
      message: "عکس با موفقیت ذخیره شد.",
      user: {
        image: `/image/profile/${filename}`,
      },
    };
  } catch (error) {
    console.error("خطا در آپلود تصویر:", error);
    return {
      ...prevState,
      status: "error",
      message: "مشکلی در ذخیره تصویر رخ داد.",
    };
  } finally {
    await client.close();
  }
}

async function action_delete(
  pathname: string,
  code: string
): Promise<deleteProps> {
  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const path = pathname.slice(1); // delete "/"    

    const deleteProduct = await axiosFetch({
      fetchType: "delete",
      url: path,
      data: { code },
      token: tokenValue,
    });

    if (
      deleteProduct &&
      typeof deleteProduct === "object" &&
      "message" in deleteProduct
    ) {
      revalidatePath("/profile/bookmark");

      return {
        status: "success",
        message: deleteProduct?.message as string,
      };
    }
    return {
      status: "error",
      message: "محصول از لیست حذف نشد.",
    };
  }
  return {
    status: "error",
    message: "توکن احراز هویت وجود ندارد.",
  };
}

export { action_information, action_image, action_delete };
