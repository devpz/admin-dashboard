import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  title: z.string().max(100),
  message: z.string().max(1000),
  categoryID: z.string().max(100),
});

//There is no authorization of the route
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { title, message, categoryID } = reqSchema.parse(body);

    const searchResultTitle = await db.message.findFirst({
      where: { title: title },
    });

    if (searchResultTitle) {
      return res
        .status(409)
        .json({ error: "Message of such title already exists" });
    }

    const searchResultText = await db.message.findFirst({
      where: { message: message },
    });

    if (searchResultText) {
      return res.status(409).json({ error: "Message of text already exists" });
    }

    await db.message.create({
      data: {
        title,
        message,
        category: {
          connect: {
            id: categoryID,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json({ success: true, title, message, categoryID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
