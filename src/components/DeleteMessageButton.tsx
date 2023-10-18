"use client";

import { FC, useState } from "react";
import { toast } from "./ui/toast";
import { redirect, useRouter } from "next/navigation";

interface DeleteMessageButtonProps {
  id: String;
}

const DeleteMessageButton: FC<DeleteMessageButtonProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    const data = {
      id: id,
    };
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/v1/delete-message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    if (!res.ok) {
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
      setLoading(false);
      return;
    } else {
      toast({
        title: "Success",
        message: "Message sucessfully deleted",
        type: "success",
      });
      setLoading(false);
      router.replace("/messages");
      router.refresh();
      return;
    }
  }

  return (
    <button
      className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full text-center"
      type="submit"
      onClick={handleDelete}
      disabled={loading}
    >
      Delete
    </button>
  );
};

export default DeleteMessageButton;
