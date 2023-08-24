import { getSinglePost } from "@/app/actions";
import Repost from "@/app/components/post/Repost";
import TweetModal from "@/app/components/structure/modal/TweetModal";
import { getCurrentUser } from "@/app/lib/auth";
import { SinglePostTypes } from "@/types";
import React from "react";

interface RepostParams {
  id: string;
}

const RepostPage = async ({ params }: { params: RepostParams }) => {
  // get session
  const session = await getCurrentUser();

  const repostPost = (await getSinglePost(params)) as SinglePostTypes;
  return (
    <TweetModal>
      <Repost
        postId={params?.id}
        userImage={session?.user?.image!}
        postData={repostPost}
        secondary={true}
      />
    </TweetModal>
  );
};

export default RepostPage;
