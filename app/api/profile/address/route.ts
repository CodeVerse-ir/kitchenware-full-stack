import { decodeJWT } from "@/utils/helper";
import { MongoClient, ObjectId, PushOperator, WithId } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

interface UserAddress {
  id: string;
  title: string;
  mobile_number: string;
  postal_code: string;
  state: string;
  city: string;
  address_details: string;
  createdAt: Date;
  isDefault: boolean;
}

interface User {
  _id: ObjectId;
  username: string;
  addresses: UserAddress[];
}

export async function POST(request: NextRequest) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

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
      { status: 403 }
    );
  }

  const username = decodedToken.username;

  const body = await request.json();
  const { title, mobile_number, postal_code, state, city, address_details } =
    body;

  if (
    !title ||
    !mobile_number ||
    !postal_code ||
    !state ||
    !city ||
    !address_details
  ) {
    return Response.json(
      { error: "تمام فیلدهای آدرس الزامی هستند" },
      { status: 400 }
    );
  }

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db();

    const existingAddress = await db.collection("users").findOne({
      username,
      "addresses.postal_code": postal_code,
    });

    if (existingAddress) {
      return Response.json(
        { error: "آدرس با این کد پستی قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const newAddress = {
      id: new ObjectId().toString(),
      title,
      mobile_number,
      postal_code,
      state,
      city,
      address_details,
      createdAt: new Date(),
      isDefault: false,
    };

    const user = await db.collection("users").findOne({ username });
    const hasExistingAddresses = user?.addresses?.length > 0;

    if (!hasExistingAddresses) {
      newAddress.isDefault = true;
    }

    const result = await db
      .collection<WithId<User>>("users")
      .updateOne(
        { username },
        { $push: { addresses: newAddress } as PushOperator<User> }
      );

    if (result.modifiedCount === 0) {
      return Response.json({ error: "آدرس جدید اضافه نشد" }, { status: 404 });
    }

    return Response.json(
      {
        message: "آدرس جدید با موفقیت اضافه شد",
        address: newAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in adding new address:", error);
    return Response.json(
      { error: "خطای سرور در پردازش درخواست" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
