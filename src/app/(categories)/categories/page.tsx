import TableCategories from "@/components/Table-Categories";
import LargeHeading from "@/components/ui/LargeHeading";
import { toast } from "@/components/ui/toast";
import { getAllCategories } from "@/lib/utils/getFromDB";
import { Metadata } from "next";
import { FC } from "react";
import { useQuery } from "react-query";

export const metadata: Metadata = {
  title: "ETS SFDC | categories list",
};

type CategoryList = {};

async function page() {
  const categories = await getAllCategories();
  // console.log(categories);
  return (
    <div>
      <TableCategories categories={categories} />
    </div>
  );
}

export default page;
