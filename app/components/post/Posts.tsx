"use client";
import { PostTypes } from "@/types";
import React, { FC } from "react";
import PostCard from "./PostCard";

interface PostPropTypes {
  posts: PostTypes[];
  userId?: string;
}

const AllPosts: FC<PostPropTypes> = async ({ posts, userId }) => {
  return (
    <div className="">
      {posts?.length > 0 ? (
        <>
          {posts?.map((post) => (
            <PostCard key={post?.id} post={post} userId={userId} />
          ))}
        </>
      ) : (
        <div>No post available.</div>
      )}
    </div>
  );
};

export default AllPosts;
