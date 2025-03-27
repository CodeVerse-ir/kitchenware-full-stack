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
