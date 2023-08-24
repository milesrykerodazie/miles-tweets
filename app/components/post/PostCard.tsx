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
import RetweetModal from "../structure/modal/RetweetModal";

interface PostPropType {
  post: PostTypes;
  userId: string;
}

const PostCard: FC<PostPropType> = ({ post, userId }) => {
  //the route
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRepost, setOpenRepost] = useState(false);
  // check if user has liked post
  const hasLiked = post?.likes?.filter((like) => like?.userId === userId);
  const hasReposted = post?.Repost?.some((post) => post?.userId === userId);

  const maxLength = 100;
  const truncatedBody =
    post?.userPostBody !== null && post?.userPostBody.length > maxLength
      ? post?.userPostBody.slice(0, maxLength - 3) + "..."
      : post?.userPostBody;

  return (
    <div
      onClick={() => {
        setOpen(false);
        setOpenRepost(false);
      }}
      className="border-b border-neutral-800"
    >
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
                <p className="text-white truncate whitespace-nowrap">
                  {post?.user?.name}
                </p>
              </Link>
              <Link
                href={`/profile/${post?.user?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-gray-600 truncate whitespace-nowrap">
                  @{post?.user?.username}
                </p>
              </Link>

              <p className="text-gray-600 truncate whitespace-nowrap">
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
            <div className="cursor-pointer text-white mt-2 text-sm md:text-base">
              {post?.body}
            </div>
          </Link>
          {/* image section */}
          {post?.postImages && (
            <div
              className={`my-3 grid gap-1 ${
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
                  <div key={image?.id} className="relative">
                    <Image
                      src={image?.url}
                      alt="postimage"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* the reposted post if available */}
          {post?.userPost && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/tweet/${post?.userPostUsername}/status/${post?.userPost}`
                );
              }}
              className={`border border-neutral-800 rounded-xl ${
                post?.postImages?.length > 0 ? "pb-3" : ""
              }`}
            >
              <div className="text-white flex flex-row gap-1 p-3">
                <div>
                  <Avatar image={post?.userPostImage} size="h-5 w-5" />
                </div>
                {/* other attributes */}
                <div className="flex items-center justify-between ">
                  <div className="flex items-center space-x-2 text-sm md:text-base trans">
                    <Link
                      href={`/profile/${post?.userPostUsername}`}
                      className="text-white"
                    >
                      {post?.userPostName}
                    </Link>
                    <Link
                      href={`/profile/${post?.userPostUsername}`}
                      className="text-gray-600"
                    >
                      @{post?.userPostUsername}
                    </Link>
                    <p className="text-gray-600">
                      . {format(post?.userPostDate, "MMM-dd")}
                    </p>
                  </div>
                </div>
              </div>
              {/* the post text and images */}
              <div
                className={`flex ${
                  post?.postImages?.length > 0
                    ? "flex-row space-x-2 space-y-0"
                    : "flex-col space-y-1"
                }`}
              >
                <div
                  className={`cursor-pointer text-white ${
                    post?.postImages?.length > 0 ? "order-1 px-2 flex-1" : "p-3"
                  }`}
                >
                  {truncatedBody}
                </div>
                <div
                  className={`grid gap-1 ${
                    post?.userPostImages?.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  }`}
                >
                  {post?.userPostImages?.length > 0 &&
                    post?.userPostImages?.map((img) => (
                      <div key={img} className="relative">
                        <Image
                          src={img}
                          alt="postimage"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className={` w-[100%] ${
                            post?.postImages?.length > 0
                              ? "h-16 rounded-lg"
                              : "rounded-b-lg h-44 lg:h-52"
                          }`}
                        />
                      </div>
                    ))}
                </div>
              </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenRepost(true);
              }}
              className="flex items-center space-x-3 relative"
            >
              <AiOutlineRetweet
                className={`h-4 w-4 md:h-5 md:w-5 trans ${
                  hasReposted && "text-green-500"
                }`}
              />
              <span
                className={`text-sm md:text-base trans ${
                  hasReposted && "text-green-500"
                }`}
              >
                {post?.Repost?.length}
              </span>
              {openRepost && (
                <RetweetModal
                  postId={post?.id}
                  setOpenRepost={setOpenRepost}
                  hasReposted={hasReposted}
                />
              )}
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
