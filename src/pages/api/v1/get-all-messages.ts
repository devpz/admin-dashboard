import { corsHeaders } from "@/lib/api-middlewares/cors-headers";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const messages = await db.message.findMany();
    res.status(200).json({
      messages: messages,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods(["POST"], handler);
