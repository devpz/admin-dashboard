import { Message } from "@prisma/client";
import { db } from "../db";

export default async function IsCategoryEmpty(
  categoryID: string
): Promise<boolean | null> {
  const result = await db.message.findFirst({
    where: { categoryID: categoryID },
  });
  if (!result) {
    return false;
  }

  return true;
}
