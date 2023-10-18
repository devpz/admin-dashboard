import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  title: z.string().max(100),
  message: z.string().max(1000),
  categoryID: z.string().max(100),
  id: z.string().max(100),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { title, message, categoryID, id } = reqSchema.parse(body);

    const searchResult = await db.message.findFirst({
      where: { id: id },
    });

    if (!searchResult) {
      return res.status(404).json({ error: "Could not find the message" });
    }

    await db.message.update({
      where: {
        id: id,
      },
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

    return res
      .status(200)
      .json({ success: true, title, message, categoryID, id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
