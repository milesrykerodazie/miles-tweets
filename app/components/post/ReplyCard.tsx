"use client";
import { ReplyTypes } from "@/types";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";
import DeleteModal from "../structure/modal/DeleteModal";
import Link from "next/link";

interface ReplyPropTypes {
  reply: ReplyTypes;
  userId: string;
}

const ReplyCard: FC<ReplyPropTypes> = ({ reply, userId }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className="border-t border-neutral-800"
    >
      <div className="flex space-x-2 p-3 relative">
        <div>
          <Avatar image={reply?.user?.image} size="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm trans">
              <Link
                href={`/profile/${reply?.user?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white truncate">{reply?.user?.name}</p>
              </Link>
              <Link
                href={`/profile/${reply?.user?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-gray-600 truncate">
                  {reply?.user?.username}
                </p>
              </Link>
              <p className="text-gray-600 truncate">
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
            username={reply?.user?.username}
            sessionId={userId}
            title="Reply"
          />
        )}
      </div>
    </div>
  );
};

export default ReplyCard;
