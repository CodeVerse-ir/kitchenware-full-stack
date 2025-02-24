import { MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

const url = process.env.MONGODB_URI;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // params number=8&type=default
  const number = searchParams.get("number");
  const type = searchParams.get("type");

  const client = new MongoClient(`${url}`);

  try {
    await client.connect();

    const db = client.db();

    if (type === "default") {
      return Response.json(null);
    } else if (type === "latest") {
      const products = await db
        .collection("products")
        .find({})
        .sort({ created_at: -1 })
        .limit(Number(number))
        .toArray();

      return Response.json(products);
    } else if (type === "discount") {
      const products = await db
        .collection("products")
        .find({})
        .sort({ discount: -1 })
        .limit(Number(number))
        .toArray();

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

// export async function POST(request: NextRequest) {
//   const client = new MongoClient(url);

//   try {
//     await client.connect();

//     const db = client.db();
//     await db.collection("products").insertOne({
//       // product_name: "P001",
//       // product_code: "P001",
//       // product_brand: "Blender",
//       // product_category: "KitchenAid",
//       // product_star: "KitchenAid",
//       // product_like: "KitchenAid",
//       // product_bootmark: "KitchenAid",
//       // "attributes": [
//       //   [
//       //     "قالب :",
//       //     "شهرزاد"
//       //   ],
//       //   [
//       //     "طرح :",
//       //     "کوئین"
//       //   ],
//       //   [
//       //     "تعداد پارچه :",
//       //     35
//       //   ]
//       // ],
//       // "image": [
//       //   "/utils/image/products/product1/product1.jpeg",
//       //   "/utils/image/products/product1/product2.jpeg",
//       //   "/utils/image/products/product1/product3.jpeg",
//       //   "/utils/image/products/product1/product4.jpeg",
//       //   "/utils/image/products/product1/product5.jpeg",
//       //   "/utils/image/products/product1/product6.jpeg",
//       //   "/utils/image/products/product1/product7.jpeg",
//       //   "/utils/image/products/product1/product8.jpeg",
//       //   "/utils/image/products/product1/product9.jpeg",
//       //   "/utils/image/products/product1/product10.jpeg",
//       //   "/utils/image/products/product1/product11.jpeg"
//       // ],
//       // "description": [
//       //   {
//       //     "title": "چینی قالب شهرزاد",
//       //     "text": [
//       //       {
//       //         "paragraph": "شهرزاد را می توان آغاز یک تحول بزرگ در تولید چینی در ایران دانست. چینی زرین ایران با تولید این قالب از تکنولوژی جدید خود در تولید چینی پرده برداری کرد. قوس های اغراق شده و کشیدگی های منحصر به فرد، این سری چینی زرین را متمایز کرده است. طراح قالب شهرزاد از فرم بدن زن الهام گرفته است و با اغراق در فرم های انتزاعی دست به طراحی زده است."
//       //       },
//       //       {
//       //         "paragraph": "ظروف در قالب شهرزاد بزرگتر از دیگر قالب های چینی زرین طراحی شده اند که احساسی از تجمل و شکوه را به بیننده القا می کند و باعث می شود مجلسی تر از دیگر ظروف به نظر آیند."
//       //       }
//       //     ]
//       //   },
//       //   {
//       //     "title": "چینی طرح کوئین",
//       //     "text": [
//       //       {
//       //         "paragraph": "چینی طرح کوئین یکی از طرح های زیبا و ساده چینی زرین است که بر روی قالب شهرزاد خودنمایی میکند، این طرح به شکل یک تاج و نقوش اسلیمی برنگ طلایی است، همچنین نوارهای نازک طلایی هم لبه ظروف را احاطه کرده است. طرح کوئین به لحاظ طرح شباهت هایی به طرح های موناکو و مونت کارلو از سری کواترو دارد، با این تفاوت که کوئین از ظرافت بیشتری در نقوش برخوردار است. در توصیف چینی طرح کوئین می توان گفت این مدل زیبا از ترکیب یک چینی با کیفیت و خوش فرم و طرحی زیبا تشکیل شده است، این سرویس به صورت سرویس های 12 نفره کامل، سرویس چینی 6 نفره غذاخوری و چای خوری تولید می شود."
//       //       }
//       //     ]
//       //   },
//       //   {
//       //     "title": "سایر ویژگی های سرویس غذاخوری چینی زرین شهرزاد طرح کوئین طلایی 6 نفره",
//       //     "text": [
//       //       {
//       //         "paragraph": "سرویس چینی 35 پارچه شهرزاد طرح کوئین طلایی یکی از سرویس های زیبا و پرطرفدار چینی زرین است. این طرح به معنای ملکه است و اخساسی از تجمل و شکوه را القا می کند. نقش این سرویس از نقوش معروف و پرکاربد در تزیینات است که با اندکی تغییر در ظروف مختلف به کار می رود. از سرویس ها مشابه می توان به طرح پرنسس اشاره کرد. کوئین طلایی با طلای ناب دکور می شود به همین دلیل از زیبایی و درحشش ویژه ای برخوردار است."
//       //       }
//       //     ]
//       //   }
//       // color: "Silver",
//       // discount: 5,
//       // sell_price: 100,
//       // clock:
//       // quantity_in_stock: 10,
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     return new Response("Failed to connect to MongoDB", { status: 500 });
//   } finally {
//     await client.close();
//   }
// }
