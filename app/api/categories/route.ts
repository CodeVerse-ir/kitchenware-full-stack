import { Db, MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getCategories(db: Db) {
  return await db.collection("categories").find({}).toArray();
}

export async function GET() {
  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    const products = await getCategories(db);
    return Response.json(products);
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
