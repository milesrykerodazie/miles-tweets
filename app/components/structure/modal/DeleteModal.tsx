"use client";
import React, { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Gi3DGlasses } from "react-icons/gi";

interface DeleteTypes {
  id: string;
  owner: string;
  sessionId: string;
  title: string;
}
const DeleteModal: FC<DeleteTypes> = ({ id, owner, sessionId, title }) => {
  return (
    <div
      className={`absolute right-3 bg-black shadow-md shadow-white w-1/2 rounded-lg py-3 px-2 text-white space-y-3 z-20 ${
        title === "Reply" ? "bottom-0" : "top-3"
      }`}
    >
      {owner === sessionId && (
        <button type="button" className="flex items-center space-x-2">
          <AiFillDelete className="h-4 w-4 md:h-5 md:w-5 trans text-red-600" />
          <span className="text-sm lg:text-base">Delete {title}</span>
        </button>
      )}

      <button className="flex items-center space-x-2">
        <Gi3DGlasses />
        <span className="text-sm lg:text-base">Others coming...</span>
      </button>
    </div>
  );
};

export default DeleteModal;
