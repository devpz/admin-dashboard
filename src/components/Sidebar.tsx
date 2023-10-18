import { FC } from "react";
import SidebarOption from "@/ui/SidebarOption";
import {
  Plus,
  MessageSquarePlus,
  MessageSquare,
  Layers,
  FileText,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center justify-center border-b-2 py-2 border-black">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex-1">
          <SidebarOption
            link="/categories"
            text="Categories List"
            icon={Layers}
          />
          <SidebarOption link="/add_category" text="Add Category" icon={Plus} />
          <SidebarOption
            link="/messages"
            text="Messages List"
            icon={MessageSquare}
          />
          <SidebarOption
            link="/add_message"
            text="Add Message"
            icon={MessageSquarePlus}
          />
          <SidebarOption link="/docs" text="Docs" icon={FileText} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
