import { getSinglePost } from "@/app/actions";
import NewReply from "@/app/components/post/NewReply";
import TweetModal from "@/app/components/structure/modal/TweetModal";
import { getCurrentUser } from "@/app/lib/auth";
import { SessionInterface, SinglePostTypes } from "@/types";
import React from "react";

interface PostParams {
  id: string;
}

const ComposeReply = async ({ params }: { params: PostParams }) => {
  // get the current user
  const session = await getCurrentUser();

  const postToReply = (await getSinglePost(params)) as SinglePostTypes;

  return (
    <TweetModal>
      <NewReply
        postId={params?.id}
        userImage={session?.user?.image!}
        postData={postToReply}
        secondary={true}
      />
    </TweetModal>
  );
};

export default ComposeReply;
