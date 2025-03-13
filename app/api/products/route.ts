import { Db, MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

interface ProductFilter {
  product_name?: RegExp;
  category?: string;
  brand?: string;
}

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function getProduct(db: Db, code: string) {
  return await db.collection("products").findOne({ code: code });
}

async function getSearchPage(
  db: Db,
  page: number,
  limit: number = 8,
  search: string
) {
  const skip = (page - 1) * limit;

  return await db
    .collection("products")
    .find(
      { product_name: { $regex: new RegExp(search, "i") } },
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

async function getCategoryPage(
  db: Db,
  page: number,
  limit: number = 8,
  category_name: string
) {
  const skip = (page - 1) * limit;

  return await db
    .collection("products")
    .find(
      { category: category_name },
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

async function getBrandPage(
  db: Db,
  page: number,
  limit: number = 8,
  brand_name: string
) {
  const skip = (page - 1) * limit;

  return await db
    .collection("products")
    .find(
      { brand: brand_name },
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

async function getProductsCount(
  db: Db,
  search: string,
  category_name: string,
  brand_name: string
) {
  const filter: ProductFilter = {};

  if (search) {
    filter.product_name = new RegExp(search, "i");
  }

  if (category_name) {
    filter.category = category_name;
  }

  if (brand_name) {
    filter.brand = brand_name;
  }

  return await db.collection("products").countDocuments(filter);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // params number=8&type=discount || page=1 || code="123ab" || search || category || brand

  const code = searchParams.get("code");
  const number = searchParams.get("number");
  const type = searchParams.get("type");
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
    } else if (number && Number(number) > 0) {
      if (type === "discount") {
        const products = await getProductsDiscount(db, Number(number));
        return Response.json(products);
      } else {
        const products = await getProducts(db, Number(number));
        return Response.json(products);
      }
    } else if (page) {
      if (search) {
        const products = await getSearchPage(db, Number(page), 8, search);
        return Response.json(products);
      } else if (category_name) {
        const products = await getCategoryPage(
          db,
          Number(page),
          8,
          category_name
        );

        return Response.json(products);
      } else if (brand_name) {
        const products = await getBrandPage(db, Number(page), 8, brand_name);
        return Response.json(products);
      } else {
        const products = await getProductsPage(db, Number(page), 8);
        return Response.json(products);
      }
    } else {
      if (search) {
        const products_count = await getProductsCount(db, search, "", "");

        return Response.json({ totalProducts: products_count });
      } else if (category_name) {
        const products_count = await getProductsCount(
          db,
          "",
          category_name,
          ""
        );

        return Response.json({ totalProducts: products_count });
      } else if (brand_name) {
        const products_count = await getProductsCount(db, "", "", brand_name);

        return Response.json({ totalProducts: products_count });
      } else {
        const products_count = await getProductsCount(db, "", "", "");
        return Response.json({ totalProducts: products_count });
      }
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
