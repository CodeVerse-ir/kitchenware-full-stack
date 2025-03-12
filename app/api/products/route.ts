import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getProduct(db: Db, code: string) {
  return await db.collection("products").findOne({ code: code });
}

async function getProductsPage(db: Db, page: number, limit: number = 8) {
  const skip = (page - 1) * limit;

  return await db
    .collection("products")
    .find(
      {},
      {
        projection: {
          code: 1,
          image: 1,
          product_name: 1,
          price: 1,
          discount: 1,
          star: 1,
          clock: 1,
        },
      }
    )
    .sort({ date: -1, _id: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function getProducts(db: Db, limit: number) {
  return await db
    .collection("products")
    .find(
      {},
      {
        projection: {
          code: 1,
          image: 1,
          product_name: 1,
          price: 1,
          discount: 1,
          star: 1,
          clock: 1,
        },
      }
    )
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();
}

async function getProductsDiscount(db: Db, limit: number) {
  return await db
    .collection("products")
    .find(
      { discount: { $ne: 0 } },
      {
        projection: {
          code: 1,
          image: 1,
          product_name: 1,
          price: 1,
          discount: 1,
          star: 1,
          clock: 1,
        },
      }
    )
    .sort({ discount: -1 })
    .limit(limit)
    .toArray();
}

async function getProductsCount(db: Db) {
  return await db.collection("products").countDocuments({});
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // params number=8&type=discount || page=1 || code="123ab"

  const code = searchParams.get("code");
  const number = searchParams.get("number");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    if (code) {
      const product = await getProduct(db, code);
      return Response.json(product);
    } else if (number && type === "discount") {
      const products = await getProductsDiscount(db, Number(number));
      return Response.json(products);
    } else if (number) {
      const products = await getProducts(db, Number(number));
      return Response.json(products);
    } else if (page) {
      const products = await getProductsPage(db, Number(page));
      return Response.json(products);
    } else if (number && Number(number) > 0) {
      const products = await getProducts(db, Number(number));
      return Response.json(products);
    } else {
      const products_count = await getProductsCount(db);
      return Response.json({ totalProducts: products_count });
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
