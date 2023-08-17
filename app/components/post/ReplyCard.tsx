"use client";
import { ReplyTypes } from "@/types";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";
import DeleteModal from "../structure/modal/DeleteModal";

interface ReplyPropTypes {
  reply: ReplyTypes;
  userId: string;
}

const ReplyCard: FC<ReplyPropTypes> = ({ reply, userId }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setOpen((current) => !current);
      }}
      className="border-t border-neutral-800"
    >
      <div className="flex space-x-2 p-3 relative">
        <div>
          <Avatar image={reply?.user?.image} size="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm md:text-base trans">
              <p className="text-white">{reply?.user?.name}</p>
              <p className="text-gray-600">{reply?.user?.username}</p>
              <p className="text-gray-600">
                . {format(reply?.createdAt, "MMM-dd")}
              </p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpen((current) => !current);
              }}
            >
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
          <div className="mt-2">{reply?.body}</div>
        </div>
        {open && (
          <DeleteModal
            id={reply?.id}
            owner={reply?.userId}
            sessionId={userId}
            title="Reply"
          />
        )}
      </div>
    </div>
  );
};

export default ReplyCard;
