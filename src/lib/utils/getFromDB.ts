import { Category, Message } from "@prisma/client";
import { db } from "../db";

export async function getAllCategories(): Promise<Category[]> {
  const data = await db.category.findMany();
  return data;
}

export async function getAllMessages(): Promise<Message[]> {
  const data = await db.message.findMany({
    include: {
      category: true,
    },
  });
  return data;
}

export async function getCategoryMessages(
  categoryID: string
): Promise<Message[]> {
  const data = await db.message.findMany({
    where: { categoryID: categoryID },
  });
  return data;
}
