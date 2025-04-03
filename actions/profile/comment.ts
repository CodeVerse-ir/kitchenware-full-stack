"use server";

import { cookies } from "next/headers";
import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";

interface action_commentProps {
  status: string | null;
  message: string | undefined | null;
  field?: string[] | null;
  comment?: {
    title: string;
    text: string;
    score: number;
  };
}

const getStringValue = (value: FormDataEntryValue | null): string => {
  return value === null ? "" : String(value);
};

async function action_comment(
  prevState: action_commentProps,
  formData: FormData
): Promise<action_commentProps> {
  const code = getStringValue(formData.get("code"));
  const not_trim_title = getStringValue(formData.get("title"));
  const not_trim_text = getStringValue(formData.get("text"));
  const score = Number(formData.get("score"));

  console.log("action_comment code : ", code);
  console.log("action_comment not_trim_title : ", not_trim_title);
  console.log("action_comment not_trim_text : ", not_trim_text);
  console.log("action_comment score : ", score);

  const emptyFields: string[] = [];
  const message: string[] = [];

  if (not_trim_title === null || not_trim_title === "") {
    emptyFields.push("title");
    message.push("عنوان");
  }
  if (not_trim_text === null || not_trim_text === "") {
    emptyFields.push("text");
    message.push("نظر");
  }
  if (score === null || score < 1 || score > 5) {
    emptyFields.push("score");
    message.push("امتیاز");
  }

  if (emptyFields.length > 0) {
    return {
      ...prevState,
      status: "error",
      message: `${message.join(" و ")} الزامی است.`,
      field: emptyFields,
    };
  }

  if (not_trim_title.length < 3) {
    return {
      ...prevState,
      status: "error",
      message: "عنوان باید حداقل 3 کاراکتر باشد.",
      field: ["title"],
    };
  }

  if (not_trim_text.length < 10) {
    return {
      ...prevState,
      status: "error",
      message: "نظر باید حداقل 10 کاراکتر باشد.",
      field: ["text"],
    };
  }

  const title = not_trim_title.trim();
  const text = not_trim_text.trim();

  console.log("action_comment title : ", title);
  console.log("action_comment text : ", text);

  // cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenValue = token.value;

    const toggleLike = await axiosFetch({
      fetchType: "post",
      url: "comments",
      data: {
        code,
        title,
        text,
        score,
      },
      token: tokenValue,
    });

    if (!toggleLike.error && toggleLike.data) {
      revalidatePath("/products");
      return {
        ...prevState,
        status: "success",
        message: "نظر با موفقیت ثبت شد.",
      };
    }
    return {
      status: "error",
      message: "نظر ثبت نشد.",
    };
  }
  return {
    status: "error",
    message: "توکن احراز هویت وجود ندارد.",
  };
}

export { action_comment };
