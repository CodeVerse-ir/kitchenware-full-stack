import { MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // params number=8
  const number = searchParams.get("number");

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    if (Number(number) > 0) {
      const products = await db
        .collection("brands")
        .find({})
        .sort({ flag: -1 })
        .limit(Number(number))
        .toArray();

      await client.close();

      return Response.json(products);
    }

    return new Response("Invalid request", { status: 404 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return new Response("Failed to connect to MongoDB", { status: 500 });
  } finally {
    await client.close();
  }
}
