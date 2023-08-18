"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Gi3DGlasses } from "react-icons/gi";

interface DeleteTypes {
  id: string;
  owner: string;
  sessionId: string;
  title: string;
  detail?: boolean;
  username: string;
}
const DeleteModal: FC<DeleteTypes> = ({
  id,
  owner,
  sessionId,
  title,
  detail,
  username,
}) => {
  //next route
  const router = useRouter();
  //if title is post use this
  const deletePost = `/api/post/delete/${id}`;
  const deleteReply = `/api/post/delete-reply/${id}`;
  const [deleting, setDeleting] = useState(false);

  //delete product function
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleting(true);

    try {
      const deleteRes = await axios.delete(
        `${
          title === "Post" ? deletePost : title === "Reply" ? deleteReply : ""
        }`
      );
      if (deleteRes?.data) {
        if (deleteRes?.data?.success === true) {
          toast.success(deleteRes?.data?.message);
          if (title === "Post" && detail !== true) {
            router.refresh();
          } else if (title === "Post" && detail === true) {
            router.back();
          } else if (title === "Reply") {
            router.refresh();
          } else {
            null;
          }
        }
        if (deleteRes?.data?.success === false) {
          toast.error(deleteRes?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`absolute right-3 bg-black shadow-md shadow-white w-1/2 rounded-lg py-3 px-2 text-white space-y-3 z-20 ${
        title === "Reply" ? "bottom-0" : "top-3"
      }`}
    >
      {owner === sessionId && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className={`flex items-center space-x-2 ${deleting && "opacity-50"}`}
        >
          <AiFillDelete
            className={`h-4 w-4 md:h-5 md:w-5 trans text-red-600 ${
              deleting && "animate-spin"
            }`}
          />
          <span className="text-sm lg:text-base">Delete {title}</span>
        </button>
      )}

      {owner === sessionId && title === "Post" && (
        <div>
          <Link
            href={`/tweet/${username}/edit/${id}`}
            className="flex items-center space-x-2"
          >
            <AiFillEdit />
            <span className="text-sm lg:text-base">Edit Post</span>
          </Link>
        </div>
      )}

      <button className="flex items-center space-x-2">
        <Gi3DGlasses />
        <span className="text-sm lg:text-base">Others coming...</span>
      </button>
    </div>
  );
};

export default DeleteModal;
