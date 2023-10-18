import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await db.category.findMany();
    res.status(200).json({
      categories: categories,
      success: true,
      headers: {
        "Access-Control-Allow-Origin":
          "chrome-extension://fijjcjoogileichchkckjncpchdlpknp",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods(["POST"], handler);
