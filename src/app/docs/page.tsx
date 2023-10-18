import MenuOption from "@/components/ui/MenuOption";
import {
  Plus,
  MessageSquarePlus,
  MessageSquare,
  Layers,
  FileText,
} from "lucide-react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-bold text-2xl">
        Resereved names in messages (they will be changed to what is in options
        of a plugin)
      </h3>
      <p className="">
        <strong>"ETS_NAME" - </strong>
        will change of the name provieded
      </p>
      <p className="">
        <strong>"ETS_SURNAME" - </strong>
        will change of the name provieded
      </p>
    </div>
  );
};

export default page;
