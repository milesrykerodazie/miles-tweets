"use client";
import { PostTypes } from "@/types";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { FaRegComment, FaSpinner } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";

interface PostDataTypes {
  postData: PostTypes;
  userImage: string;
}

const PostDetails: FC<PostDataTypes> = ({ postData, userImage }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = "";
  return (
    <div>
      {/* section 1 */}
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2">
          <BiArrowBack
            onClick={() => router.back()}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />

          <h1 className="text-white text-xl font-semibold">Post</h1>
        </div>
      </div>

      {/* section 2 */}
      <div className="p-3 border-b border-neutral-800">
        <div className="flex space-x-2">
          <div>
            <Avatar image={postData?.user?.image} size="h-10 w-10" />
          </div>
          {/* section 2.1 */}
          <div className="flex items-center justify-between flex-1">
            <div className="">
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
        <div className="text-white border-y border-neutral-800 mt-5 py-4 flex items-center space-x-5">
          <div>
            <span>0</span> <span className="text-gray-600">Reposts</span>
          </div>
          <div>
            <span>{postData?.comments.length}</span>{" "}
            <span className="text-gray-600">Replies</span>
          </div>
          <div>
            <span>{postData?.likes.length}</span>{" "}
            <span className="text-gray-600">Likes</span>
          </div>
        </div>
        {/* section 2.4 */}
        <div className="text-gray-500  border-b border-neutral-800 p-4 flex items-center justify-between space-x-5">
          <FaRegComment className="h-5 w-5" />
          <AiOutlineRetweet className="h-5 w-5" />
          <AiOutlineHeart className="h-5 w-5" />
        </div>

        {/* section 2.5  */}
        <div className="py-4 flex space-x-3">
          <div>
            <Avatar image={userImage} size="h-10 w-10" />
          </div>
          <div className="text-white flex-1">
            <TextareaAutosize
              name="postReply"
              // value={postText}
              // onChange={handleChange}
              cacheMeasurements
              className="disabled:opacity-80 peer resize-none w-full mb-4 bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white overflow-y-hidden"
              placeholder="Post your reply!"
            />
            {/* post button */}
            <div className="flex justify-end">
              <button
                type="button"
                className={`trans disabled:opacity-30 disabled:cursor-not-allowed mt-6 px-4 py-1 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer ${
                  !canSubmit && "opacity-30 cursor-not-allowed"
                }`}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* section 3- comment session */}
      <div className="text-white border-b border-neutral-800">
        <div className="p-3">comments here</div>
      </div>
    </div>
  );
};

export default PostDetails;
