"use server";

import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface bookmarkProps {
  status: string;
  message: string;
}

async function action_bookmark(
  code:string
): Promise<bookmarkProps> {
  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    console.log(code);
    

    const deleteProduct = await axiosFetch({
      fetchType: "delete",
      url: "profile/bookmark",
      data: { code },
      token: tokenValue,
    });

    if (deleteProduct) {
      revalidatePath("/profile/bookmark");

      return {
        status: "success",
        message: "محصول از لیست ذخیره شده ها حذف شد.",
      };
    }
    return {
      status: "error",
      message: "محصول از لیست ذخیره شده ها حذف نشد.",
    };
  }
  return {
    status: "error",
    message: "توکن احراز هویت وجود ندارد.",
  };
}

export { action_bookmark };
