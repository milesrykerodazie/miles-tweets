import { ReplyTypes } from "@/types";
import React, { FC } from "react";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";

interface ReplyPropTypes {
  reply: ReplyTypes;
}

const ReplyCard: FC<ReplyPropTypes> = ({ reply }) => {
  return (
    <div className="border-t border-neutral-800">
      <div className="flex space-x-2 p-3">
        <div>
          <Avatar image={reply?.user?.image} size="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-white">{reply?.user?.name}</p>
              <p className="text-gray-600">{reply?.user?.username}</p>
              <p className="text-gray-600">
                . {format(reply?.createdAt, "MMM-dd")}
              </p>
            </div>
            <div>
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
          <div className="mt-1 text-sm">{reply?.body}</div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
