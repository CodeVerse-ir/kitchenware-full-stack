import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

interface DiscountFilter {
  percent?: number | { $gt?: number; $ne?: number };
  start_time?: Date | string | { $lte?: Date | string };
  end_time?: Date | string | { $gte?: Date | string };
}

interface ProductFilter {
  product_name?: RegExp;
  category?: string;
  brand?: string;
  discount?: DiscountFilter;
  "discount.percent"?: { $gt?: number; $ne?: number };
  "discount.start_time"?: { $lte?: Date | string };
  "discount.end_time"?: { $gte?: Date | string };
}

interface SortOptions {
  [key: string]: 1 | -1;
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

  if (search) {
    query.product_name = new RegExp(search, "i");
  }
  if (category_name) {
    query.category = category_name;
  }
  if (brand_name) {
    query.brand = brand_name;
  }

  let sortOptions: SortOptions = { created_at: -1, _id: 1 };

  if (filter) {
    switch (filter) {
      case "discount":
      case "discount":
        const now = new Date();
        query["discount.percent"] = { $ne: 0 };
        query["discount.start_time"] = { $lte: now.toISOString() };
        query["discount.end_time"] = { $gte: now.toISOString() };
        sortOptions = { "discount.percent": -1 };
        break;
      case "price_asc":
        sortOptions = { price: 1 };
        break;
      case "price_desc":
        sortOptions = { price: -1 };
        break;
      // case "best_selling":
      //   sortOptions = { sales_count: -1 };
      //   break;
      case "newest":
        sortOptions = { created_at: -1 };
        break;
      default:
        break;
    }
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
        // sales_count: 1,
        created_at: 1,
      },
    })
    .sort(sortOptions)
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
      const now = new Date();
      query["discount.percent"] = { $ne: 0 };
      query["discount.start_time"] = { $lte: now.toISOString() };
      query["discount.end_time"] = { $gte: now.toISOString() };
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

      console.log(products);

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
