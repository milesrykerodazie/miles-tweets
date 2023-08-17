"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Avatar from "../Avatar";
import TextareaAutosize from "react-textarea-autosize";
import { FaSpinner } from "react-icons/fa";

interface ReplyPropTypes {
  postId: string;
  userImage: string;
  secondary?: boolean;
}

const ReplyPost: FC<ReplyPropTypes> = ({ postId, userImage, secondary }) => {
  const router = useRouter();
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const canSubmit = reply !== "";

  // handle reply post
  const handleReply = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setReplying(true);
    if (!canSubmit) {
      toast.error("Input needed!.");
      return;
    }

    try {
      const response = await axios.post(`/api/post/comment/${postId}`, {
        reply,
      });
      if (response?.data) {
        if (response?.data?.success === true) {
          setReplying(false);
          toast.success(response?.data?.message);
          setReply("");
          if (secondary === true) {
            router.back();
          } else {
            router.refresh();
          }
        }
        if (response?.data?.success === false) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setReplying(false);
    }
  };
  return (
    <div className="py-4 flex space-x-3">
      <div>
        <Avatar image={userImage} size="md:h-10 md:w-10 h-7 w-7 trans" />
      </div>
      <div className="text-white flex-1">
        <TextareaAutosize
          name="postReply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          cacheMeasurements
          className="disabled:opacity-80 peer resize-none w-full mb-4 bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white overflow-y-hidden placeholder:text-sm placeholder:md:text-base"
          placeholder="Post your reply!"
        />
        {/* post button */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={replying}
            onClick={handleReply}
            className={`trans disabled:opacity-30 disabled:cursor-not-allowed mt-6 px-4 py-1 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer text-sm md:text-base text-white ${
              !canSubmit && "opacity-30 cursor-not-allowed"
            }`}
          >
            {replying ? <FaSpinner className="animate-spin" /> : "Reply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyPost;
