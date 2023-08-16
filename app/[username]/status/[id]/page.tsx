import { getPost } from "@/app/actions";
import PostDetails from "@/app/components/post/PostDetails";
import { getCurrentUser } from "@/app/lib/auth";
import { PostTypes } from "@/types";

interface PostParams {
  username: string;
  id: string;
}

const Post = async ({ params }: { params: PostParams }) => {
  // get current user image
  const session = await getCurrentUser();
  //get post details
  const fetchPost = (await getPost(params)) as PostTypes;
  return (
    <PostDetails
      postData={fetchPost}
      userImage={session?.user?.image!}
      userId={session?.user?.id}
    />
  );
};

export default Post;
