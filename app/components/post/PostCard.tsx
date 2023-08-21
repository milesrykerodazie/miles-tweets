"use client";
import { PostTypes } from "@/types";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { format } from "date-fns";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleLike } from "@/app/helper";
import DeleteModal from "../structure/modal/DeleteModal";

interface PostPropType {
  post: PostTypes;
  userId: string;
}

const PostCard: FC<PostPropType> = ({ post, userId }) => {
  //the route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // check if user has liked post
  const hasLiked = post?.likes?.filter((like) => like?.userId === userId);

  return (
    <div onClick={() => setOpen(false)} className="border-b border-neutral-800">
      <div className="flex flex-row gap-2 md:gap-4 p-3 relative">
        {/* profile pics */}
        <div>
          <Avatar
            image={post?.user?.image}
            size="md:h-10 md:w-10 h-7 w-7 trans"
          />
        </div>
        {/* other attributes */}
        <div className="flex-1">
          {/* section 1  */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-2 text-sm md:text-base trans">
              <Link
                href={`/profile/${post?.user?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white">{post?.user?.name}</p>
              </Link>
              <Link
                href={`/profile/${post?.user?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-gray-600">{post?.user?.username}</p>
              </Link>

              <p className="text-gray-600">
                . {format(post?.createdAt, "MMM-dd")}
              </p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpen((current) => !current);
              }}
              className="cursor-pointer"
            >
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
          {/* section 2 */}
          <Link
            href={`/tweet/${post?.user?.username}/status/${post?.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cursor-pointer text-white mt-2">{post?.body}</div>
          </Link>
          {/* image section */}
          {post?.postImages && (
            <div
              className={`mt-3 grid  gap-1 ${
                post?.postImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {post?.postImages?.map((image, index) => (
                <Link
                  href={`/tweet/${post?.user?.username}/status/${
                    post?.id
                  }/photo/${index + 1}`}
                  key={image?.id}
                >
                  <div
                    key={image?.id}
                    className={`relative w-full trans ${
                      post?.postImages.length < 3
                        ? "h-[450px]"
                        : "h-44 md:h-60 lg:h-72"
                    }`}
                  >
                    <Image
                      src={image?.url}
                      alt="postimage"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* actions section */}
          <div className="text-gray-500 p-4 flex items-center justify-between space-x-5">
            <Link href={`/compose/reply/${post?.id}`}>
              <button className="flex items-center space-x-3">
                <FaRegComment className="h-4 w-4 md:h-5 md:w-5 trans" />
                <span className="text-sm md:text-base trans">
                  {post?.comments?.length}
                </span>
              </button>
            </Link>
            <button className="flex items-center space-x-3">
              <AiOutlineRetweet className="h-4 w-4 md:h-5 md:w-5 trans" />
              <span className="text-sm md:text-base trans">0</span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleLike(setIsLoading, userId, post?.id, router);
              }}
              className="flex items-center space-x-3"
            >
              {hasLiked?.length > 0 ? (
                <AiFillHeart className="h-4 w-4 md:h-5 md:w-5 trans text-red-600" />
              ) : (
                <AiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 trans" />
              )}

              <span className="text-sm md:text-base trans">
                {post?.likes?.length}
              </span>
            </button>
          </div>
        </div>
        {open && (
          <DeleteModal
            id={post?.id}
            owner={post?.userId}
            username={post?.user?.username}
            sessionId={userId}
            title="Post"
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
