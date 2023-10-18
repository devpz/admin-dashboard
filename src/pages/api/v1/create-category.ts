import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  name: z.string().max(100),
});

//There is no authorization of the route
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { name } = reqSchema.parse(body);

    const searchResult = await db.category.findFirst({
      where: {
        name: name,
      },
    });

    if (searchResult) {
      return res.status(409).json({ error: "Category already exists" });
    }

    await db.category.create({
      data: {
        name,
      },
    });

    return res.status(200).json({ success: true, name });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
