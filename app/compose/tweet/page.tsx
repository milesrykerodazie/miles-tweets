import NewPost from "@/app/components/post/NewPost";
import TweetModal from "@/app/components/structure/modal/TweetModal";
import { getCurrentUser } from "@/app/lib/auth";
import React from "react";

const ComposeTweet = async () => {
  // get session
  const session = await getCurrentUser();
  return (
    <TweetModal>
      <NewPost userImage={session?.user?.image!} />
    </TweetModal>
  );
};

export default ComposeTweet;
