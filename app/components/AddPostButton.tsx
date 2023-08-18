import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddPostButton = () => {
  return (
    <Link href={"/compose/tweet"} className="sm:hidden trans">
      <div
        className="
        fixed
        right-5
        bottom-28
        sm:hidden 
        rounded-full 
        z-40
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-blue-500 
        shadow-sm
        shadow-white
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <AiOutlinePlus size={24} color="white" />
      </div>
    </Link>
  );
};

export default AddPostButton;
