import { Category } from "@prisma/client";
import { db } from "../db";

export default async function findCategory(
  id: string
): Promise<Category | null> {
  const result = await db.category.findFirst({ where: { id: id } });

  return result;
}
