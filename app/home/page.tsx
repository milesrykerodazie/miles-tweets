import React from "react";
import Form from "../components/Form";
import { allPosts } from "../actions";
import { PostTypes } from "@/types";
import AllPosts from "../components/post/Posts";
import { getCurrentUser } from "../lib/auth";
import Header from "../components/structure/Header";
import MobileHeader from "../components/structure/MobileHeader";

const HomePage = async () => {
  // get session
  const session = await getCurrentUser();

  console.log("the session => ", session);

  //get all posts
  const posts = (await allPosts()) as PostTypes[];
  return (
    <main className="text-white">
      {/* section 1 */}

      <MobileHeader session={session} />
      <Header title="Home" isHome={true} />
      {/* section 2  */}
      <Form
        placeholder="What is happening?!"
        userImage={session?.user?.image!}
      />

      {/* the posts here */}
      <AllPosts posts={posts} userId={session?.user?.id} />
    </main>
  );
};

export default HomePage;
