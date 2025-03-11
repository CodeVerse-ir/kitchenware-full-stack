import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getProductsPage(db: Db, page: number, limit: number = 12) {
  const skip = (page - 1) * limit;

  return db
    .collection("brands")
    .find({})
    .sort({ flag: -1, _id: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function getProducts(db: Db, limit: number) {
  return db
    .collection("brands")
    .find({})
    .sort({ flag: -1 })
    .limit(limit)
    .toArray();
}

async function getProductsCount(db: Db) {
  return db.collection("brands").countDocuments({});
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const number = searchParams.get("number");
  const page = searchParams.get("page");

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    if (page) {
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
