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
import DeleteModal from "../structure/modal/DeleteModal";
import Link from "next/link";
import RetweetModal from "../structure/modal/RetweetModal";
import { format } from "date-fns";

interface PostDataTypes {
  postData: PostTypes;
  userImage: string;
  userId: string;
}

const PostDetails: FC<PostDataTypes> = ({ postData, userImage, userId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRepost, setOpenRepost] = useState(false);

  //has liked post
  const hasLiked = postData?.likes?.filter((like) => like?.userId === userId);
  const id = postData?.id;
  const hasReposted = postData?.Repost?.some((post) => post?.userId === userId);

  const maxLength = 100;
  const truncatedBody =
    postData?.userPostBody !== null && postData?.userPostBody.length > maxLength
      ? postData?.userPostBody.slice(0, maxLength - 3) + "..."
      : postData?.userPostBody;

  return (
    <div>
      {/* section 1 */}
      <Header title="Post" allowed />
      {/* section 2 */}
      <div
        onClick={() => {
          setOpen(false);
          setOpenRepost(false);
        }}
        className="p-3 border-b border-neutral-800"
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
                <p className="text-white truncate whitespace-nowrap">
                  {postData?.user?.name}
                </p>
              </Link>
              <Link href={`/profile/${postData?.user?.username}`}>
                <p className="text-gray-600 truncate whitespace-nowrap">
                  @{postData?.user?.username}
                </p>
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
        {/* section 2.2 */}
        <div className="my-2">
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
              {postData?.postImages?.map((image, index) => (
                <Link
                  href={`/tweet/${postData?.user?.username}/status/${
                    postData?.id
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
        </div>

        {/* reposted post section */}
        {postData?.userPost && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/tweet/${postData?.userPostUsername}/status/${postData?.userPost}`
              );
            }}
            className={`border border-neutral-800 rounded-xl ${
              postData?.postImages?.length > 0 ? "pb-3" : ""
            }`}
          >
            <div className="text-white flex flex-row gap-1 p-3">
              <div>
                <Avatar image={postData?.userPostImage} size="h-5 w-5" />
              </div>
              {/* other attributes */}
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-2 text-sm md:text-base trans">
                  <Link
                    href={`/profile/${postData?.userPostUsername}`}
                    className="text-white"
                  >
                    {postData?.userPostName}
                  </Link>
                  <Link
                    href={`/profile/${postData?.userPostUsername}`}
                    className="text-gray-600"
                  >
                    @{postData?.userPostUsername}
                  </Link>
                  <p className="text-gray-600">
                    . {format(postData?.userPostDate, "MMM-dd")}
                  </p>
                </div>
              </div>
            </div>
            {/* the postData text and images */}
            <div
              className={`flex ${
                postData?.postImages?.length > 0
                  ? "flex-row space-x-2 space-y-0"
                  : "flex-col space-y-1"
              }`}
            >
              <div
                className={`cursor-pointer text-white ${
                  postData?.postImages?.length > 0
                    ? "order-1 px-2 flex-1"
                    : "p-3"
                }`}
              >
                {truncatedBody}
              </div>
              <div
                className={`grid gap-1 ${
                  postData?.userPostImages?.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2"
                }`}
              >
                {postData?.userPostImages?.length > 0 &&
                  postData?.userPostImages?.map((img) => (
                    <div key={img} className="relative">
                      <Image
                        src={img}
                        alt="postimage"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={` w-[100%] ${
                          postData?.postImages?.length > 0
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

        {/* section 2.3 */}
        <div className="text-white border-y border-neutral-800 mt-5 py-4 flex items-center space-x-5 text-sm md:text-base trans">
          <div>
            <span>{postData?.Repost?.length}</span>{" "}
            <span className="text-gray-600">
              {postData?.Repost?.length === 1 ? "Repost" : "Reposts"}
            </span>
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
            {openRepost && (
              <RetweetModal
                postId={postData?.id}
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
                <ReplyCard key={comment?.id} reply={comment} userId={userId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
