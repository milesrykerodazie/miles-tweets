"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSend } from "react-icons/ai";

interface ButtonProps {
  canSubmit?: boolean;
  disable?: boolean;
}

const SideButton = ({ canSubmit, disable }: ButtonProps) => {
  const router = useRouter();

  return (
    <div>
      <div
        className="
        mt-6
        lg:hidden 
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
      <button
        type="button"
        disabled={disable}
        className=" w-full disabled:opacity-30 disabled:cursor-not-allowed
        mt-6
        hidden 
        lg:block 
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
            lg:block 
            text-center
            font-semibold
            text-white 
            text-sm
        "
        >
          Post
        </span>
      </button>
    </div>
  );
};

export default SideButton;
