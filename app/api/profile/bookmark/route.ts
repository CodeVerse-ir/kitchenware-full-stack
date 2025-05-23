import { decodeJWT } from "@/utils/helper";
import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getProduct(
  db: Db,
  username: string,
  page: number,
  limit: number
) {
  try {
    let skip = 0;
    if (page) {
      skip = (page - 1) * limit;
    }

    const user = await db
      .collection("users")
      .findOne(
        { username: username },
        { projection: { bookmarked_products: 1 } }
      );

    if (
      !user ||
      !user.bookmarked_products ||
      user.bookmarked_products.length === 0
    ) {
      return [];
    }

    const productCodes = user.bookmarked_products.slice(skip, skip + limit);

    const products = await db
      .collection("products")
      .find(
        {
          code: { $in: productCodes },
        },
        {
          projection: {
            code: 1,
            image: 1,
            product_name: 1,
            price: 1,
            discount: 1,
          },
        }
      )
      .toArray();

    return products;
  } catch (error) {
    console.error("Error in getProduct:", error);
    return [];
  }
}

async function getBookmarkProductsCount(db: Db, username: string) {
  const user = await db
    .collection("users")
    .findOne(
      { username: username },
      { projection: { bookmarked_products: 1 } }
    );

  return user?.bookmarked_products.length;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

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
      { status: 402 }
    );
  }

  const username = decodedToken.username;

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    if (page) {
      const product = await getProduct(db, username, Number(page), 6);
      return Response.json(product);
    } else {
      const bookmark = await getBookmarkProductsCount(db, username);
      return Response.json({ totalProducts: bookmark });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return Response.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function PATCH(request: NextRequest) {
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
  const { code } = body;

  if (!code) {
    return Response.json({ error: "کد محصول الزامی است" }, { status: 400 });
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db();

    const user = await db.collection("users").findOne({
      username,
      bookmarked_products: { $in: [code] },
    });

    if (user) {
      await db
        .collection("users")
        .updateOne({ username }, { $pull: { bookmarked_products: code } });

      await db
        .collection("products")
        .updateOne({ code }, { $inc: { bookmark: -1 } });

      return Response.json(
        {
          message: "محصول از ذخیره شده ها حذف شد.",
          bookmarked: false,
          bookmarked_products: user.bookmarked_products.filter(
            (p: string) => p !== code
          ),
        },
        { status: 200 }
      );
    } else {
      await db
        .collection("users")
        .updateOne({ username }, { $addToSet: { bookmarked_products: code } });

      await db
        .collection("products")
        .updateOne({ code }, { $inc: { bookmark: 1 } });

      const updatedUser = await db.collection("users").findOne({ username });
      return Response.json(
        {
          message: "محصول ذخیره شد.",
          bookmarked: true,
          bookmarked_products: updatedUser?.bookmarked_products || [code],
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in toggling bookmark:", error);
    return Response.json(
      { error: "خطای سرور در پردازش درخواست" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

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
  const product_code = body.code;

  if (!product_code) {
    return Response.json({ error: "کد محصول مورد نیاز است" }, { status: 400 });
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db();

    const result = await db
      .collection("users")
      .updateOne(
        { username },
        { $pull: { bookmarked_products: product_code } }
      );

    if (result.modifiedCount === 0) {
      return Response.json(
        { error: "محصول از لیست ذخیره شده ها حذف نشد" },
        { status: 404 }
      );
    }

    await db
      .collection("products")
      .updateOne({ code: product_code }, { $inc: { bookmark: -1 } });

    return Response.json(
      { message: "محصول با موفقیت از لیست ذخیره شده ها حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE operation:", error);
    return Response.json(
      { error: "خطای سرور در پردازش درخواست" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
