"use client";

import { FC, useState } from "react";
import { toast } from "./ui/toast";
import { Category } from "@prisma/client";
import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface AddMessageFormProps {
  categories: Category[];
}

const AddMessageForm: FC<AddMessageFormProps> = ({ categories }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const data = {
      title: String(event.target.message_title.value),
      message: String(event.target.message_text.value),
      categoryID: String(selectedCategory.id),
      category: selectedCategory,
    };

    const res = await fetch("http://localhost:3000/api/v1/create-message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 409) {
        toast({
          title: "Error",
          message: "Message of title or text already exists",
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
        message: "Message sucessfully created",
        type: "success",
      });
      setLoading(false);
      router.refresh();
      return;
    }
  }

  //listing obects for listbox
  const options: Category[] = [];
  for (let i = 0; i < categories.length; i++) {
    options.push({
      id: categories[i].id,
      name: categories[i].name,
    });
  }
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    options[0]
  );

  // console.log(selectedCategory);
  return (
    <form
      className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <label className="block text-gray-700 text-sm font-bold">
        Message title
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="message title"
        type="text"
        id="message_title"
        required
        maxLength={30}
      />
      <textarea
        id="message_text"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter message text"
      ></textarea>
      {/* ListBox Area */}
      <Listbox
        value={selectedCategory}
        onChange={setSelectedCategory}
        name="categoryName"
      >
        {({ open }) => (
          <>
            <Listbox.Button>
              <div className="w-full h-full py-4 px-6 bg-rose-700 hover:cursor-pointer hover:bg-rose-900 rounded-2xl">
                <h4 className="text-white text-center font-bold">
                  {selectedCategory.name}
                </h4>
              </div>
            </Listbox.Button>
            {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {/*
              Don't forget to add `static` to your `Listbox.Options`!
            */}
              <Listbox.Options static>
                {options.map((option) => (
                  <Listbox.Option key={option.id} value={option}>
                    <div className="w-full h-full py-2 px-6 my-2 bg-rose-400 hover:bg-rose-600 hover:cursor-pointer rounded-2xl">
                      <h6 className="text-white text-center font-normal">
                        {option.name}
                      </h6>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={loading}
      >
        Create New Message
      </button>
    </form>
  );
};

export default AddMessageForm;
