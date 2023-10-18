import AddCategoryForm from "@/components/AddCategoryForm";
import LargeHeading from "@/components/ui/LargeHeading";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "ETS SFDC | Add category",
};

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <LargeHeading>Add category</LargeHeading>
      <AddCategoryForm />
    </div>
  );
};

export default page;
