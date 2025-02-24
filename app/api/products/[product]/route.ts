import { MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ product: string }> }
) {
  const product_code = (await params).product;

  // params
  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    if (product_code) {
      const product = await db.collection("products").findOne({code : product_code});

      await client.close();

      return Response.json(product);
    }

    await client.close();

    return new Response("Invalid request", { status: 404 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return new Response("Failed to connect to MongoDB", { status: 500 });
  } finally {
    await client.close();
  }
}
