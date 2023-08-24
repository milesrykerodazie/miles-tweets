"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit, AiOutlineRetweet } from "react-icons/ai";

interface RetweetPorpTypes {
  postId: string;
  setOpenRepost: React.Dispatch<React.SetStateAction<boolean>>;
  hasReposted?: boolean;
}

const RetweetModal: FC<RetweetPorpTypes> = ({
  postId,
  setOpenRepost,
  hasReposted,
}) => {
  //next route
  // const router = useRouter();
  // const [reposting, setReposting] = useState(false);

  //handle repost
  // const handleRepost = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   setReposting(true);

  //   try {
  //     const response = await axios.post(`/api/retweet/${postId}`, {
  //       quote: "",
  //     });
  //     if (response?.data) {
  //       if (response?.data?.success === true) {
  //         toast.success(response?.data?.message);
  //         setReposting(false);
  //         setOpenRepost(false);
  //         router.refresh();
  //       }
  //       if (response?.data?.success === false) {
  //         toast.error(response?.data?.message);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setReposting(false);
  //     setOpenRepost(false);
  //   }
  // };

  return (
    <div className="absolute top-0 bg-black p-3 text-white rounded-lg -left-3 space-y-3 shadow-md shadow-gray-500 z-40">
      {/* <button
        type="button"
        disabled={reposting}
        onClick={handleRepost}
        className="flex items-center space-x-3 disabled:opacity-40 disabled:animate-pulse whitespace-nowrap"
      >
        <AiOutlineRetweet className="h-4 w-4" />
        <span className="text-sm">
          {hasReposted ? "Undo Repost" : "Repost"}
        </span>
      </button> */}

      <Link
        href={`/compose/repost/${postId}`}
        className="flex items-center space-x-3 whitespace-nowrap"
      >
        <AiFillEdit className="h-4 w-4" />
        <span className="text-sm">Quote</span>
      </Link>
    </div>
  );
};

export default RetweetModal;
