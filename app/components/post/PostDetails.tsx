"use client";
import { PostTypes } from "@/types";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { handleLike } from "@/app/helper";
import ReplyCard from "./ReplyCard";
import Header from "../structure/Header";
import ReplyPost from "./ReplyPost";

interface PostDataTypes {
  postData: PostTypes;
  userImage: string;
  userId: string;
}

const PostDetails: FC<PostDataTypes> = ({ postData, userImage, userId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //has liked post
  const hasLiked = postData?.likes?.filter((like) => like?.userId === userId);
  const id = postData?.id;

  return (
    <div>
      {/* section 1 */}
      <Header title="Post" />
      {/* section 2 */}
      <div className="p-3 border-b border-neutral-800">
        <div className="flex space-x-2">
          <div>
            <Avatar
              image={postData?.user?.image}
              size="lg:h-10 lg:w-10 h-7 w-7 trans"
            />
          </div>
          {/* section 2.1 */}
          <div className="flex items-center justify-between flex-1">
            <div className="text-sm md:text-base trans">
              <p className="text-white">{postData?.user?.name}</p>
              <p className="text-gray-600">@miles_ryker</p>
            </div>
            <div>
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
        </div>
        {/* section 2.2 */}
        <div className="mt-2">
          <p className="text-white">{postData?.body}</p>
          {/* image section */}
          {postData?.postImages && (
            <div
              className={`mt-3 grid  gap-1 ${
                postData?.postImages.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-2"
              }`}
            >
              {postData?.postImages?.map((image) => (
                <div
                  key={image?.id}
                  className="relative w-full h-24 sm:h-36 md:h-60 lg:h-72 trans"
                >
                  <Image
                    src={image?.url}
                    alt="postimage"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* section 2.3 */}
        <div className="text-white border-y border-neutral-800 mt-5 py-4 flex items-center space-x-5 text-sm md:text-base trans">
          <div>
            <span>0</span> <span className="text-gray-600">Reposts</span>
          </div>
          <div>
            <span>{postData?.comments.length}</span>{" "}
            <span className="text-gray-600">Replies</span>
          </div>
          <div>
            <span>{postData?.likes.length}</span>{" "}
            <span className="text-gray-600">
              {postData?.likes.length === 1 ? "Like" : "Likes"}
            </span>
          </div>
        </div>
        {/* section 2.4 */}
        <div className="text-gray-500  border-b border-neutral-800 p-4 flex items-center justify-between space-x-5">
          <FaRegComment className="h-4 w-4 md:h-5 md:w-5 trans" />
          <AiOutlineRetweet className="h-4 w-4 md:h-5 md:w-5 trans" />
          <button
            type="button"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleLike(setIsLoading, userId, id, router);
            }}
          >
            {hasLiked?.length > 0 ? (
              <AiFillHeart className="h-4 w-4 md:h-5 md:w-5 trans text-red-600" />
            ) : (
              <AiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 trans" />
            )}
          </button>
        </div>

        {/* section 2.5  */}
        <ReplyPost postId={postData?.id} userImage={userImage} />
      </div>
      {/* section 3- comment session */}
      <div className="text-white border-b border-neutral-800">
        <div className="">
          {postData?.comments?.length > 0 && (
            <div className="space-y-3">
              {postData?.comments?.map((comment) => (
                <ReplyCard key={comment?.id} reply={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
