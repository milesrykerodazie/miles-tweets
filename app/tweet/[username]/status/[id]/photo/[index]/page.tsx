import { getPost } from "@/app/actions";
import PostImageDetails from "@/app/components/post/PostImageDetails";
import PostImageModal from "@/app/components/structure/modal/PostImageModal";
import { getCurrentUser } from "@/app/lib/auth";
import { PostTypes } from "@/types";
import React from "react";

interface PostParams {
  username: string;
  id: string;
}

const PostFullImages = async ({ params }: { params: PostParams }) => {
  // get current user image
  const session = await getCurrentUser();
  //get post details
  const fetchPost = (await getPost(params)) as PostTypes;

  return (
    <PostImageModal>
      <PostImageDetails
        postData={fetchPost}
        userImage={session?.user?.image!}
        userId={session?.user?.id}
      />
    </PostImageModal>
  );
};

export default PostFullImages;
