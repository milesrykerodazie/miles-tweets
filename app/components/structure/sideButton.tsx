"use client";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";

const SideButton = () => {
  return (
    <div className="px-3">
      <Link href={"/compose/tweet"} className="hidden sm:block trans">
        <div
          className="
        mt-6
        md:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
        >
          <AiOutlineSend size={24} color="white" />
        </div>
      </Link>
      <Link href={"/compose/tweet"}>
        <button
          type="button"
          className=" w-full disabled:opacity-30 disabled:cursor-not-allowed
        mt-6
        hidden 
        md:block 
        px-4
        py-1
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      "
        >
          <span
            className="
            hidden 
            md:block 
            text-center
            font-semibold
            text-white 
            text-sm
        "
          >
            Post
          </span>
        </button>
      </Link>
    </div>
  );
};

export default SideButton;
