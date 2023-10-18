import AddMessageForm from "@/components/AddMessageFrom";
import LargeHeading from "@/components/ui/LargeHeading";
import { getAllCategories } from "@/lib/utils/getFromDB";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "ETS SFDC | add message",
};

async function page({}) {
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col gap-8">
      <LargeHeading>Add message</LargeHeading>
      <AddMessageForm categories={categories} />
    </div>
  );
}

export default page;
