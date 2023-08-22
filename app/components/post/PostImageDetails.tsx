"use client";
import { PostTypes } from "@/types";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import DeleteModal from "../structure/modal/DeleteModal";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Avatar from "../Avatar";
import { format } from "date-fns";
import { FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { handleLike } from "@/app/helper";
import ReplyPost from "./ReplyPost";
import ReplyCard from "./ReplyCard";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface PostDataTypes {
  postData: PostTypes;
  userImage: string;
  userId: string;
}

const PostImageDetails: FC<PostDataTypes> = ({
  postData,
  userImage,
  userId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullVeiew, setFullView] = useState(false);
  const [viewPost, setViewPost] = useState(false);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  //has liked post
  const hasLiked = postData?.likes?.filter((like) => like?.userId === userId);
  const id = postData?.id;
  return (
    <div className="text-white grid grid-cols-4 gap-y-3">
      {/* image section */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setViewPost(false);
        }}
        className={`flex flex-col h-screen ${
          fullVeiew
            ? "col-span-4"
            : " col-span-4 md:col-span-2 xl:col-span-3  trans"
        }`}
      >
        {/* action buttons */}
        <div className="flex items-center justify-between px-4 py-2 relative">
          <button type="button" onClick={onDismiss} className="">
            <IoMdClose className="text-white w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewPost((current) => !current);
            }}
            className="md:hidden"
          >
            <BsThreeDots className="text-white w-6 h-6 md:hidden " />
          </button>

          {viewPost && (
            <Link
              href={`/tweet/${postData?.user?.username}/status/${postData?.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="button"
              className="text-xs px-5 py-2 absolute top-9 right-3 bg-black text-white border border-gray-400 rounded-md trans md:hidden"
            >
              View post
            </Link>
          )}

          <button
            type="button"
            onClick={() => setFullView((current) => !current)}
            className="hidden md:block"
          >
            {fullVeiew ? (
              <BiArrowFromRight className="text-white w-6 h-6" />
            ) : (
              <BiArrowFromLeft className="text-white w-6 h-6" />
            )}
          </button>
        </div>
        {/* images start here */}
        <div className="py-3 flex-1">
          <Carousel infiniteLoop={true} showThumbs={false}>
            {postData?.postImages?.map((image) => (
              <div
                key={image?.id}
                className="w-full h-[550px] xl:h-[650px] trans"
              >
                <img
                  src={image?.url}
                  alt="postimage"
                  className="object-contain w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* actions section */}
        <div className="text-white p-6 flex items-center justify-between space-x-5">
          <Link href={`/compose/reply/${postData?.id}`}>
            <button className="flex items-center space-x-3">
              <FaRegComment className="h-4 w-4 md:h-5 md:w-5 trans" />
              <span className="text-sm md:text-base trans">
                {postData?.comments?.length}
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
              handleLike(setIsLoading, userId, postData?.id, router);
            }}
            className="flex items-center space-x-3"
          >
            {hasLiked?.length > 0 ? (
              <AiFillHeart className="h-4 w-4 md:h-5 md:w-5 trans text-red-600" />
            ) : (
              <AiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 trans" />
            )}

            <span className="text-sm md:text-base trans">
              {postData?.likes?.length}
            </span>
          </button>
        </div>
      </div>
      {/* post details section */}
      <div
        className={`trans ${
          fullVeiew
            ? "hidden"
            : "hidden md:bg-black md:block md:col-span-2 xl:col-span-1 md:border-l md:border-neutral-800 md:h-[100vh] md:overflow-y-auto md:pb-5"
        } `}
      >
        <div
          onClick={() => setOpen(false)}
          className="border-b border-neutral-800 p-3"
        >
          <div className="flex space-x-2 relative">
            <div>
              <Avatar
                image={postData?.user?.image}
                size="lg:h-10 lg:w-10 h-7 w-7 trans"
              />
            </div>
            {/* section 2.1 */}
            <div className="flex items-center justify-between flex-1">
              <div className="text-sm md:text-base trans">
                <Link href={`/profile/${postData?.user?.username}`}>
                  <p className="text-white">{postData?.user?.name}</p>
                </Link>
                <Link href={`/profile/${postData?.user?.username}`}>
                  <p className="text-gray-600">{postData?.user?.username}</p>
                </Link>
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

            {open && (
              <DeleteModal
                id={postData?.id}
                owner={postData?.userId}
                sessionId={userId}
                title="Post"
                detail={true}
                username={postData?.user?.username}
              />
            )}
          </div>
          <div className="mt-2 space-y-3">
            <p className="text-white">{postData?.body}</p>
            <p className="text-gray-600">
              {format(postData?.createdAt, "h:mm a")} .{" "}
              {format(postData?.createdAt, "MMM dd, yyyy")}
            </p>
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
                  <ReplyCard
                    key={comment?.id}
                    reply={comment}
                    userId={userId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostImageDetails;
