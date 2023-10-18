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
    <div className="grid grid-cols-3 gap-4 ">
      <MenuOption link="/categories" text="Categories List" icon={Layers} />
      <MenuOption link="/add_category" text="Add Category" icon={Plus} />
      <MenuOption link="/messages" text="Messages List" icon={MessageSquare} />
      <MenuOption
        link="/add_message"
        text="Add Message"
        icon={MessageSquarePlus}
      />
      <MenuOption link="/docs" text="Docs" icon={FileText} />
    </div>
  );
};

export default page;
