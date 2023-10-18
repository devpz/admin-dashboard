import ChangeMessage from "@/components/ChangeMessage";
import LargeHeading from "@/components/ui/LargeHeading";
import findMessage from "@/lib/utils/checkifMessageExists";
import { getAllCategories } from "@/lib/utils/getFromDB";
import { notFound } from "next/navigation";
import DeleteMessageButton from "@/components/DeleteMessageButton";

async function page({ params }: { params: { id: string } }) {
  //check if category of such id exits if not notFound()
  const message = await findMessage(params.id);
  if (!message) {
    notFound();
  }
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col gap-10">
      <LargeHeading>You&apos;re editing</LargeHeading>
      <div className="flex flex-col gap-6 justify-between py-10">
        <p>
          <strong>id:</strong> {message.id}
        </p>
        <p>
          <strong>Message title:</strong> {message.title}
        </p>
        <p>
          <strong>Message text:</strong> {message.message}
        </p>
        <p>
          {/* below there is no error TS does not import Cateogry with message
           from prisma (don't know why) also I do not know how to dsiable TS for that line*/}
          <strong>Message category:</strong> {message.category.name}
        </p>
      </div>
      <ChangeMessage
        id={message.id}
        categories={categories}
        currentCategoryID={message.categoryID}
      />
      <DeleteMessageButton id={message.id} />
    </div>
  );
}

export default page;
