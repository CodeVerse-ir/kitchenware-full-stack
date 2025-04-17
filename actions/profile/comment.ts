"use server";

import { cookies } from "next/headers";
import { axiosFetch } from "@/utils/axios_fetch";
import { revalidatePath } from "next/cache";
import { MongoClient } from "mongodb";
import { decodeJWT } from "@/utils/helper";

const url = process.env.MONGODB_URI;

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

interface User {
  username: string;
  first_name?: string;
  last_name?: string;
  image?: string;
  nickname?: string;
}

interface Comment {
  id: string;
  username: string;
  title: string;
  text: string;
  score: number;
  like: string[];
  dislike: string[];
  created_at: string;
  is_approved: boolean;
  approved_at: string | null;
  name: string;
  image: string;
  nickname: string;
  user_like: boolean;
  user_dislike: boolean;
}

interface ProductWithComments {
  comments: Comment[];
  // سایر فیلدهای محصول اگر نیاز است
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

async function get_comment(code: string): Promise<get_commentProps> {
  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    // دریافت توکن از کوکی‌ها
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return {
        status: "error",
        message: "توکن یافت نشد. لطفاً وارد شوید.",
      };
    }

    const tokenValue = token.value;
    const decodedToken = decodeJWT(tokenValue);

    if (!decodedToken) {
      return {
        status: "error",
        message: "توکن نامعتبر است.",
      };
    }

    // دریافت اطلاعات کاربر جاری از توکن
    const currentUsername = decodedToken.username; // فرض می‌کنیم توکن شامل username است

    // دریافت کامنت‌های محصول
    const product = await db
      .collection<ProductWithComments>("products")
      .findOne(
        { code: code },
        {
          projection: {
            comments: 1,
          },
        }
      );

    if (!product || !product.comments) {
      return {
        status: "error",
        message: "محصول یا کامنت‌ها یافت نشد.",
      };
    }

    // فیلتر کامنت‌های تایید شده
    const approvedComments = product.comments.filter(
      (comment: Comment) => comment.is_approved === true
    );

    // استخراج usernames از کامنت‌های تایید شده
    const usernames = approvedComments.map(
      (comment: Comment) => comment.username
    );

    // اگر هیچ کامنت تایید شده ای وجود نداشت
    if (usernames.length === 0) {
      return {
        status: "success",
        message: "هیچ کامنت تایید شده‌ای یافت نشد.",
        data: [],
      };
    }

    // دریافت اطلاعات کاربران مربوطه
    const users = await db
      .collection<User>("users")
      .find(
        {
          username: { $in: usernames },
        },
        {
          projection: {
            username: 1,
            first_name: 1,
            last_name: 1,
            image: 1,
            nickname: 1,
          },
        }
      )
      .toArray();

    // تبدیل آرایه کاربران به یک شیء برای دسترسی آسان‌تر
    const usersMap: Record<string, User> = users.reduce(
      (acc: Record<string, User>, user: User) => {
        acc[user.username] = user;
        return acc;
      },
      {}
    );

    // اضافه کردن اطلاعات کاربر و وضعیت لایک/دیسلایک به هر کامنت تایید شده
    const enrichedComments = approvedComments.map((comment: Comment) => {
      // بررسی آیا کاربر جاری در لیست لایک‌ها هست یا نه
      const user_like = comment.like?.includes(currentUsername) || false;

      // بررسی آیا کاربر جاری در لیست دیسلایک‌ها هست یا نه
      const user_dislike = comment.dislike?.includes(currentUsername) || false;

      return {
        ...comment,
        user: {
          first_name: usersMap[comment.username]?.first_name || null,
          last_name: usersMap[comment.username]?.last_name || null,
          image: usersMap[comment.username]?.image || null,
          nickname: usersMap[comment.username]?.nickname || null,
        },
        user_like,
        user_dislike,
      };
    });

    console.log(enrichedComments);

    return {
      status: "success",
      message: "کامنت‌های تایید شده با موفقیت دریافت شدند.",
      data: enrichedComments,
    };
  } catch (error) {
    console.error("خطا در دریافت کامنت‌ها:", error);
    return {
      status: "error",
      message: "مشکلی در ارتباط با سرور رخ داده است. لطفا دوباره تلاش کنید.",
    };
  } finally {
    await client.close();
  }
}

async function like_dislike_comment(
  code: string,
  commentId: string, 
  choice: "like" | "dislike" 
): Promise<get_commentProps> {
  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    // دریافت توکن از کوکی‌ها
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return {
        status: "error",
        message: "توکن یافت نشد. لطفاً وارد شوید.",
      };
    }

    const tokenValue = token.value;
    const decodedToken = decodeJWT(tokenValue);

    if (!decodedToken) {
      return {
        status: "error",
        message: "توکن نامعتبر است.",
      };
    }

    const currentUsername = decodedToken.username;

    // یافتن محصول و کامنت مورد نظر
    const product = await db
      .collection<ProductWithComments>("products")
      .findOne({ code: code });

    if (!product || !product.comments) {
      return {
        status: "error",
        message: "محصول یا کامنت‌ها یافت نشد.",
      };
    }

    // پیدا کردن کامنت خاص با commentId
    const commentIndex = product.comments.findIndex(
      (c: Comment) => c.id === commentId
    );

    if (commentIndex === -1) {
      return {
        status: "error",
        message: "کامنت مورد نظر یافت نشد.",
      };
    }

    const comment = product.comments[commentIndex];

    // ایجاد کپی از آرایه‌های like و dislike برای جلوگیری از تغییر مستقیم
    let like = comment.like ? [...comment.like] : [];
    let dislike = comment.dislike ? [...comment.dislike] : [];

    // پردازش بر اساس choice
    if (choice === "like") {
      if (like.includes(currentUsername)) {
        // حذف لایک اگر وجود داشت
        like = like.filter((u) => u !== currentUsername);
      } else {
        // اضافه کردن لایک
        like.push(currentUsername);
        // حذف از دیسلایک اگر وجود داشت
        dislike = dislike.filter((u) => u !== currentUsername);
      }
    } else if (choice === "dislike") {
      if (dislike.includes(currentUsername)) {
        // حذف دیسلایک اگر وجود داشت
        dislike = dislike.filter((u) => u !== currentUsername);
      } else {
        // اضافه کردن دیسلایک
        dislike.push(currentUsername);
        // حذف از لایک اگر وجود داشت
        like = like.filter((u) => u !== currentUsername);
      }
    }

    // آپدیت کامنت در دیتابیس
    await db.collection<ProductWithComments>("products").updateOne(
      { code: code, "comments.id": commentId },
      {
        $set: {
          [`comments.${commentIndex}.like`]: like,
          [`comments.${commentIndex}.dislike`]: dislike,
        },
      }
    );

    // دریافت اطلاعات به‌روز شده
    const updatedProduct = await db
      .collection<ProductWithComments>("products")
      .findOne({ code: code });

    if (!updatedProduct || !updatedProduct.comments) {
      return {
        status: "error",
        message: "خطا در دریافت اطلاعات به‌روز شده.",
      };
    }

    // فیلتر کامنت‌های تایید شده و افزودن اطلاعات کاربر
    const approvedComments = updatedProduct.comments.filter(
      (c: Comment) => c.is_approved
    );

    // دریافت اطلاعات کاربران (مانند قبل)
    const usernames = approvedComments.map((c: Comment) => c.username);
    const users = await db
      .collection<User>("users")
      .find({ username: { $in: usernames } })
      .toArray();

    const usersMap = users.reduce((acc, user) => {
      acc[user.username] = user;
      return acc;
    }, {} as Record<string, User>);

    // ساخت پاسخ نهایی
    const enrichedComments = approvedComments.map((c: Comment) => ({
      ...c,
      user: {
        first_name: usersMap[c.username]?.first_name || null,
        last_name: usersMap[c.username]?.last_name || null,
        image: usersMap[c.username]?.image || null,
        nickname: usersMap[c.username]?.nickname || null,
      },
      user_like: c.like?.includes(currentUsername) || false,
      user_dislike: c.dislike?.includes(currentUsername) || false,
    }));

    return {
      status: "success",
      message: `کامنت با موفقیت ${choice === "like" ? "لایک" : "دیسلایک"} شد.`,
      data: enrichedComments,
    };
  } catch (error) {
    console.error("خطا در پردازش لایک/دیسلایک:", error);
    return {
      status: "error",
      message: "مشکلی در سرور رخ داده است.",
    };
  } finally {
    await client.close();
  }
}

type get_commentProps = {
  status: "success" | "error";
  message: string;
  data?: Array<
    Comment & {
      user: {
        first_name: string | null;
        last_name: string | null;
        image: string | null;
        nickname: string | null;
      };
    }
  >;
};

export { action_comment, get_comment, like_dislike_comment };
