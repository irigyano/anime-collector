"use client";
import { Base64 } from "js-base64";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery) {
      return;
    }

    router.push(`/search?title=${Base64.encode(searchQuery)}`);
  };

  return (
    <form
      onSubmit={onSearch}
      className="max-w-96 md:w-96 m-2 border rounded-3xl flex overflow-hidden"
    >
      <input
        className="h-10 w-4/5 px-4 rounded-none outline-none text-lg border-r dark:bg-[#0f0f0f]"
        type="text"
        placeholder="作品検索"
        maxLength={12}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="w-1/5 flex justify-center items-center hover:text-blue-500 duration-200"
        type="submit"
      >
        <IoSearchOutline className="text-2xl" />
      </button>
    </form>
  );
};
export default SearchInput;