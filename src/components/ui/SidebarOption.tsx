import Link from "next/link";
import React, { FC } from "react";

interface SidebarOptionProps {
  link: string;
  text: string;
  icon: React.ElementType;
}

const SidebarOption: FC<SidebarOptionProps> = ({ link, text, icon }) => {
  return (
    <div className="flex">
      <Link
        href={link}
        className="flex flex-row gap-4 w-full align-middle hover:cursor-pointer hover:bg-slate-300 rounded-xl px-6 py-4 active:bg-slate-300"
      >
        {React.createElement(icon)}
        <p className="font-bold truncate">{text}</p>
      </Link>
    </div>
  );
};

export default SidebarOption;
