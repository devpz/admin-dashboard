import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  categoryID: z.string().max(100),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { categoryID } = reqSchema.parse(body);
    const messages = await db.message.findMany({
      where: {
        categoryID: categoryID,
      },
    });
    res.status(200).json({
      messages: messages,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods(["POST"], handler);
