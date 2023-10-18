import Link from "next/link";
import React, { FC } from "react";

interface MenuOptionProps {
  link: string;
  text: string;
  icon: React.ElementType;
}

const MenuOption: FC<MenuOptionProps> = ({ link, text, icon }) => {
  return (
    <div className="p-8">
      <Link
        href={link}
        className="flex flex-row min-w-[300px] min-h-[300px] border-8 border-black rounded-3xl hover:border-blue-700 group"
      >
        <div className="flex flex-col justify-around items-center w-full p-4">
          {React.createElement(icon, {
            className: "h-[120px] w-[120px] group-hover:stroke-blue-700",
          })}
          <p className="text-center font-bold truncate text-2xl group-hover:text-blue-700">
            {text}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MenuOption;
