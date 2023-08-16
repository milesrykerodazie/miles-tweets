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

interface PostPropType {
  post: PostTypes;
  userId: string;
}

const PostCard: FC<PostPropType> = ({ post, userId }) => {
  //the route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // check if user has liked post
  const hasLiked = post?.likes?.filter((like) => like?.userId === userId);

  //handle loke post
  // const handleLike = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();

  //   setIsLoading(true);
  //   try {
  //     if (!userId) {
  //       toast.error("Login to like.");
  //       return;
  //     }
  //     const response = await axios.post(`/api/like-post/${post?.id}`, {
  //       userId: userId,
  //     });
  //     if (response?.data) {
  //       if (response?.data?.success === true) {
  //         setIsLoading(false);
  //         toast.success(response?.data?.message);
  //         router.refresh();
  //       }
  //       if (response?.data?.success === false) {
  //         toast.error(response?.data?.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div className="border-b border-neutral-800">
      <div className="flex flex-row gap-4 p-3">
        {/* profile pics */}
        <div>
          <Avatar image={post?.user?.image} size="h-10 w-10" />
        </div>
        {/* other attributes */}
        <div className="flex-1">
          {/* section 1  */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-2">
              <p className="text-white">{post?.user?.name}</p>
              <p className="text-gray-600">{post?.user?.username}</p>
              <p className="text-gray-600">
                . {format(post?.createdAt, "MMM-dd")}
              </p>
            </div>
            <div>
              <BsThreeDots className="text-gray-600" />
            </div>
          </div>
          {/* section 2 */}
          <Link href={`/${post?.user?.username}/status/${post?.id}`}>
            <div className="cursor-pointer text-white">{post?.body}</div>
          </Link>
          {/* image section */}
          {post?.postImages && (
            <div
              className={`mt-3 grid  gap-1 ${
                post?.postImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {post?.postImages?.map((image) => (
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

          {/* actions section */}
          <div className="text-gray-500 p-4 flex items-center justify-between space-x-5">
            <button className="flex items-center space-x-3">
              <FaRegComment className="h-5 w-5" />
              <span>{post?.comments?.length}</span>
            </button>
            <button className="flex items-center space-x-3">
              <AiOutlineRetweet className="h-5 w-5" />
              <span>0</span>
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
                <AiFillHeart className="h-5 w-5 text-red-600" />
              ) : (
                <AiOutlineHeart className="h-5 w-5" />
              )}

              <span>{post?.likes?.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
