import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getBlogsPage(db: Db, page: number, limit: number = 8) {
  const skip = (page - 1) * limit;

  return db
    .collection("blogs")
    .find({}, { projection: { image: 1, title: 1, text: 1, date: 1 } })
    .sort({ date: -1, _id: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function getBlogs(db: Db, limit: number) {
  return await db
    .collection("blogs")
    .find({}, { projection: { image: 1, title: 1, text: 1, date: 1 } })
    .sort({ date: -1, _id: 1 })
    .limit(limit)
    .toArray();
}

async function getBlogsCount(db: Db) {
  return db.collection("blogs").countDocuments({});
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const number = searchParams.get("number");
  const page = searchParams.get("page");

  const client = new MongoClient(`${url}`);

  // params number=8 || page=1
  try {
    await client.connect();
    const db = client.db();

    if (page) {
      const products = await getBlogsPage(db, Number(page));
      return Response.json(products);
    } else if (number && Number(number) > 0) {
      const products = await getBlogs(db, Number(number));
      return Response.json(products);
    } else {
      const products_count = await getBlogsCount(db);
      return Response.json({ totalBlogs: products_count });
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
