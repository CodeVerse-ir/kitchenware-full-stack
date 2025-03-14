import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

interface ProductFilter {
  product_name?: RegExp;
  category?: string;
  brand?: string;
  discount?: { $ne: number };
}

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getProduct(db: Db, code: string) {
  return await db.collection("products").findOne({ code: code });
}

async function getProducts(
  db: Db,
  page: number,
  limit: number,
  search?: string,
  category_name?: string,
  brand_name?: string,
  filter?: string
) {
  let skip = 0;
  if (page) {
    skip = (page - 1) * limit;
  }
  const query: ProductFilter = {};

  if (filter) {
    if (filter === "discount") {
      query.discount = { $ne: 0 };
    }
  }
  if (search) {
    query.product_name = new RegExp(search, "i");
  }
  if (category_name) {
    query.category = category_name;
  }
  if (brand_name) {
    query.brand = brand_name;
  }

  return await db
    .collection("products")
    .find(query, {
      projection: {
        code: 1,
        image: 1,
        product_name: 1,
        price: 1,
        discount: 1,
        star: 1,
        clock: 1,
      },
    })
    .sort(filter ? { discount: -1 } : { date: -1, _id: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

async function getProductsCount(
  db: Db,
  search?: string,
  category_name?: string,
  brand_name?: string,
  filter?: string
) {
  const query: ProductFilter = {};

  if (filter) {
    if (filter === "discount") {
      query.discount = { $ne: 0 };
    }
  }
  if (search) {
    query.product_name = new RegExp(search, "i");
  }

  if (category_name) {
    query.category = category_name;
  }

  if (brand_name) {
    query.brand = brand_name;
  }

  return await db.collection("products").countDocuments(query);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // params number=8&filter=discount || page=1 || code="123ab" || search || category || brand

  const code = searchParams.get("code");
  const number = searchParams.get("number");
  const filter = searchParams.get("filter");
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const category_name = searchParams.get("category");
  const brand_name = searchParams.get("brand");

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();
    const db = client.db();

    if (code) {
      const product = await getProduct(db, code);
      return Response.json(product);
    } else if (number || page) {
      const products = await getProducts(
        db,
        Number(page),
        Number(number) || 8,
        search?.toString(),
        category_name?.toString(),
        brand_name?.toString(),
        filter?.toString()
      );
      return Response.json(products);
    } else {
      const products_count = await getProductsCount(
        db,
        search?.toString(),
        category_name?.toString(),
        brand_name?.toString(),
        filter?.toString()
      );
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
