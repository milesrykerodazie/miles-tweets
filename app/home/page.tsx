import React from "react";
import Form from "../components/Form";
import { allPosts } from "../actions";
import { PostTypes } from "@/types";
import AllPosts from "../components/post/Posts";

const HomePage = async () => {
  //get all posts
  const posts = (await allPosts()) as PostTypes[];
  return (
    <main className="text-white">
      {/* section 1 */}
      <div className="border-b-[1px] border-neutral-800 p-3">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-white text-xl font-semibold">Home</h1>
        </div>
      </div>
      {/* section 2  */}
      <Form placeholder="What is happening?!" />
      {/* the posts here */}
      <AllPosts posts={posts} />
    </main>
  );
};

export default HomePage;
