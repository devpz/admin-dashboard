import AddCategoryForm from "@/components/AddCategoryForm";
import TableMessages from "@/components/Table-Messages";
import LargeHeading from "@/components/ui/LargeHeading";
import { getAllMessages } from "@/lib/utils/getFromDB";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "ETS SFDC | messages list",
};

async function page() {
  const messages = await getAllMessages();
  return (
    <div className="flex flex-col gap-8">
      <LargeHeading>Messages</LargeHeading>
      <TableMessages messages={messages} />
    </div>
  );
}

export default page;
