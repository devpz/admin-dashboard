import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import IsCategoryEmpty from "@/lib/utils/checkIfCategoryEmpty";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  id: z.string().max(100),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as string;

  try {
    const { id } = reqSchema.parse(body);

    const searchResult = await db.category.findFirst({
      where: { id: id },
    });

    if (!searchResult) {
      return res.status(404).json({ error: "Could not find the category" });
    }

    if (await IsCategoryEmpty(id)) {
      return res
        .status(400)
        .json({ error: "There are still messages of this category" });
    }

    await db.category.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
