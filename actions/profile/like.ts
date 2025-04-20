"use server";

import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface LikeApiResponse {
  message: string;
  bookmarked: boolean;
}

interface toggle_likeProps {
  status: string | null;
  message: string | null;
}

async function toggle_like(code: string): Promise<toggle_likeProps> {
  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const toggleLike = await axiosFetch<LikeApiResponse>({
      fetchType: "patch",
      url: "profile/likes",
      data: {
        code,
      },
      token: tokenValue,
    });

    if (!toggleLike.error && toggleLike.data) {
      revalidatePath("/products");

      return {
        status: "success",
        message: toggleLike.data.message,
      };
    }
    if (toggleLike.error && toggleLike.error.statusCode === 400) {
      return {
        status: "error",
        message: toggleLike.error.message,
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

export { toggle_like };
