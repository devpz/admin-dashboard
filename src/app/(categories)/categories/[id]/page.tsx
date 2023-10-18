import CategoryMessages from "@/components/CategoryMessages";
import ChangeCategoryName from "@/components/ChangeCategoryName";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
import LargeHeading from "@/components/ui/LargeHeading";
import IsCategoryEmpty from "@/lib/utils/checkIfCategoryEmpty";
import findCategory from "@/lib/utils/checkIfCategoryExists";
import { getCategoryMessages } from "@/lib/utils/getFromDB";
import { Category } from "@prisma/client";
import { notFound } from "next/navigation";
import { FC } from "react";

async function page({ params }: { params: { id: string } }) {
  //check if category of such id exits if not notFound()
  const category = await findCategory(params.id);

  if (!category) {
    notFound();
  }

  const bCategories = await IsCategoryEmpty(category.id);
  const categoryMessages = await getCategoryMessages(category.id);
  return (
    <div className="">
      <LargeHeading>You&apos;re editing</LargeHeading>
      <div className="flex flex-col gap-6 justify-between py-10">
        <p>
          <strong>id:</strong> {category.id}
        </p>
        <p>
          <strong>Category name:</strong> {category.name}
        </p>
      </div>
      <ChangeCategoryName id={category.id} />
      {bCategories ? (
        <CategoryMessages categoryMessages={categoryMessages} />
      ) : (
        <DeleteCategoryButton id={category.id} />
      )}
    </div>
  );
}

export default page;
