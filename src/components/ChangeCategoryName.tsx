"use client";

import { FC, useState } from "react";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";

interface ChangeCategoryNameProps {
  id: string;
}

const ChangeCategoryName: FC<ChangeCategoryNameProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const data = {
      name: String(event.target.category_name.value),
    };

    const res = await fetch(
      "http://localhost:3000/api/v1/change-category-name",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          id: id,
        }),
      }
    );

    if (!res.ok) {
      if (res.status === 409) {
        toast({
          title: "Error",
          message: "Category Already exists",
          type: "error",
        });
      } else {
        if (res.status === 404) {
          toast({
            title: "No record for this ID",
            message: "Try again later",
            type: "error",
          });
        } else {
          toast({
            title: "Unknown Error",
            message: "Try again later",
            type: "error",
          });
        }
      }
      setLoading(false);
      return;
    } else {
      toast({
        title: "Success",
        message: "Category sucessfully renamed",
        type: "success",
      });
      setLoading(false);

      router.refresh();
      return;
    }
  }
  return (
    <form
      className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <label className="block text-gray-700 text-sm font-bold">
        Category Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="category name"
        type="text"
        id="category_name"
        required
        maxLength={30}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={loading}
      >
        Change category name
      </button>
    </form>
  );
};

export default ChangeCategoryName;
