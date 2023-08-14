import { PostTypes } from "@/types";
import React, { FC } from "react";
import PostCard from "./PostCard";
import { getCurrentUser } from "@/app/lib/auth";

interface PostPropTypes {
  posts: PostTypes[];
}

const AllPosts: FC<PostPropTypes> = async ({ posts }) => {
  //get the current user
  const session = await getCurrentUser();
  return (
    <div className="">
      {posts?.length > 0 ? (
        <>
          {posts?.map((post) => (
            <PostCard key={post?.id} post={post} userId={session?.user?.id!} />
          ))}
        </>
      ) : (
        <div>No post available.</div>
      )}
    </div>
  );
};

export default AllPosts;
