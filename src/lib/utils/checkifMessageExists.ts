import { Message } from "@prisma/client";
import { db } from "../db";

export default async function findMessage(id: string): Promise<Message | null> {
  const result = await db.message.findFirst({
    where: { id: id },
    include: {
      category: true,
    },
  });

  return result;
}
