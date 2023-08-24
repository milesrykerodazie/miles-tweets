import React, { FC } from "react";
import ReplyPost from "./ReplyPost";
import { SinglePostTypes } from "@/types";
import Avatar from "../Avatar";
import { format } from "date-fns";
import Link from "next/link";

interface ReplyPropTypes {
  postId: string;
  userImage: string;
  postData: SinglePostTypes;
  secondary: boolean;
}

const NewReply: FC<ReplyPropTypes> = ({
  postId,
  userImage,
  postData,
  secondary,
}) => {
  return (
    <div className="p-3">
      <div className="text-white flex flex-row gap-4">
        <div>
          <Avatar
            image={postData?.user?.image}
            size="md:h-10 md:w-10 h-7 w-7 trans"
          />
        </div>
        {/* other attributes */}
        <div className="flex-1">
          {/* section 1  */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-2 text-sm md:text-base trans">
              <Link
                href={`/profile/${postData?.user?.username}`}
                className="text-white"
              >
                {postData?.user?.name}
              </Link>
              <p className="text-gray-600">@{postData?.user?.username}</p>
              <Link
                href={`/profile/${postData?.user?.username}`}
                className="text-gray-600"
              >
                . {format(postData?.createdAt, "MMM-dd")}
              </Link>
            </div>
          </div>
          <div className="cursor-pointer text-white mt-2">{postData?.body}</div>
          <div className="text-gray-600 mt-3 text-sm">
            Replying to{" "}
            <Link href={""}>
              <span className="text-blue-600">{postData?.user?.username}</span>
            </Link>
          </div>
        </div>
      </div>
      <ReplyPost postId={postId} userImage={userImage} secondary={secondary} />
    </div>
  );
};

export default NewReply;
