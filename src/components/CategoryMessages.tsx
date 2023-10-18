import { getCategoryMessages } from "@/lib/utils/getFromDB";
import { Message } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface CategoryMessagesProps {
  categoryMessages: Message[];
}

const CategoryMessages: FC<CategoryMessagesProps> = ({ categoryMessages }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold mt-6">Messages:</h2>
      {categoryMessages.map((message) => {
        return (
          <div
            key={message.id}
            className="px-6 py-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-2xl focus:outline-none focus:shadow-outline"
          >
            <Link href={"/messages/" + message.id} className="">
              <h4 className="text-white text-center">{message.title}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryMessages;
