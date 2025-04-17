import { decodeJWT } from "@/utils/helper";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

interface Product {
  discount: {
    percent: number;
    start_time: string;
    end_time: string;
  };
  image: string[];
  brand: string;
  category: string;
  product_name: string;
  code: string;
  attributes: string[];
  colors: [];
  price: number;
  star: number;
  like: number;
  bootmark: number;
  quantity_in_stock: number;
}

export async function POST(request: NextRequest) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return Response.json(
      { error: "توکن احراز هویت یافت نشد" },
      { status: 401 }
    );
  }

  const decodedToken = decodeJWT(token);
  if (!decodedToken) {
    return Response.json(
      { error: "توکن احراز هویت نامعتبر است" },
      { status: 403 }
    );
  }

  const username = decodedToken.username;

  const body = await request.json();
  const { code, title, text, score } = body;

  if (!code || !title || !text || !score) {
    return Response.json(
      { error: "تمام فیلدهای نظر الزامی هستند" },
      { status: 400 }
    );
  }

  if (score < 1 || score > 5) {
    return Response.json(
      { error: "امتیاز باید بین 1 تا 5 باشد" },
      { status: 400 }
    );
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db();

    const product = await db.collection("products").findOne({ code });

    if (!product) {
      return Response.json(
        { error: "محصولی با این کد یافت نشد" },
        { status: 404 }
      );
    }

    const newComment = {
      id: new ObjectId().toString(),
      username,
      title,
      text,
      score: Number(score),
      like: [],
      dislike: [],
      created_at: new Date(),
      is_approved: false,
      approved_at: null,
    };

    const result = await db
      .collection<WithId<Product>>("products")
      .updateOne({ code }, { $push: { comments: newComment } });

    if (result.modifiedCount === 0) {
      return Response.json({ error: "کامنت اضافه نشد" }, { status: 400 });
    }

    return Response.json(
      {
        message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت نظر:", error);
    return Response.json(
      { error: "خطای سرور در پردازش درخواست" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
