"use server";

import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface BookmarkApiResponse {
  message: string;
  bookmarked: boolean;
}

interface toggle_bookmarkProps {
  status: string | null;
  message: string | null;
}

async function toggle_bookmark(code: string): Promise<toggle_bookmarkProps> {
  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const addBookmark = await axiosFetch<BookmarkApiResponse>({
      fetchType: "patch",
      url: "profile/bookmark",
      data: {
        code,
      },
      token: tokenValue,
    });

    if (!addBookmark.error && addBookmark.data) {
      revalidatePath("/products");

      return {
        status: "success",
        message: addBookmark.data.message,
      };
    }
    if (addBookmark.error && addBookmark.error.statusCode === 400) {
      return {
        status: "error",
        message: addBookmark.error.message,
      };
    }
    return {
      status: "error",
      message: "محصول ذخیره نشد.",
    };
  }
  return {
    status: "error",
    message: "توکن احراز هویت وجود ندارد.",
  };
}

export { toggle_bookmark };
