"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery) return null;
    router.push(`/search?title=${searchQuery}`);
  };

  return (
    <form
      onSubmit={onSearch}
      className="m-2 flex basis-4/5 overflow-hidden rounded-3xl border lg:basis-1/3"
    >
      <input
        className="h-10 w-4/5 rounded-none border-r px-4 text-lg outline-none dark:bg-[#0f0f0f]"
        type="text"
        placeholder="搜尋作品"
        maxLength={12}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="flex w-1/5 items-center justify-center duration-200 hover:text-blue-500"
        type="submit"
      >
        <IoSearchOutline className="text-2xl" />
      </button>
    </form>
  );
};
export default SearchInput;
