"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const SearchHeader = ({ allow }: { allow?: boolean }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof searchText !== "string") {
      return;
    }

    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (searchText) {
      searchParams.set("keyword", searchText);
    } else {
      searchParams.delete("keyword");
    }

    const exactPath = window.location.pathname === "/" ? "/search" : "/search";

    // Generate the new pathname with the updated search parameters
    const newPathname = `${exactPath}?${searchParams.toString()}`;

    // const encodedSearchQuery = encodeURI(searchQuery);
    router.push(newPathname);

    setSearchText("");
  };
  return (
    <form onSubmit={submitHandler} className="sticky top-0 bg-black z-40">
      <div className="relative flex items-center justify-between bg-black/90 py-3">
        {allow && (
          <BiArrowBack
            onClick={() => router.back()}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="w-full py-2 bg-black border-gray-700 border text-white text-sm rounded-full px-10 outline-none "
          />
          <FiSearch className="absolute top-2 text-gray-700 w-5 h-5 left-3 z-40" />
          {searchText !== "" && (
            <AiFillCloseCircle
              onClick={() => setSearchText("")}
              className="absolute top-2 text-gray-700 w-5 h-5 right-3 trans cursor-pointer"
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchHeader;
