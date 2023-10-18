import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  name: z.string().max(100),
  id: z.string().max(100),
});

//There is no authorization of the route
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { name, id } = reqSchema.parse(body);

    const idSearchResult = await db.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!idSearchResult) {
      return res.status(404).json({ error: "Category not found" });
    }

    const nameSearchResult = await db.category.findFirst({
      where: { name: name },
    });

    if (nameSearchResult) {
      return res.status(409).json({
        error: "Category Name is already taken",
      });
    }

    await db.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    return res.status(200).json({ success: true, name });
  } catch (error) {
    // console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
