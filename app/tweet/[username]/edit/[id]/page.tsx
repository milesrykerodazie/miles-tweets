import { getPost } from "@/app/actions";
import EditPost from "@/app/components/post/EditPost";
import EditPostModal from "@/app/components/structure/modal/EditPostModal";
import { getCurrentUser } from "@/app/lib/auth";
import { PostTypes } from "@/types";
import React from "react";

interface EditPostParams {
  username: string;
  id: string;
}

const EditPostPage = async ({ params }: { params: EditPostParams }) => {
  // get session
  const session = await getCurrentUser();
  const post = (await getPost(params)) as PostTypes;

  return (
    <EditPostModal>
      <div className="p-3">
        <EditPost userImage={session?.user?.image} postData={post} />
      </div>
    </EditPostModal>
  );
};

export default EditPostPage;
