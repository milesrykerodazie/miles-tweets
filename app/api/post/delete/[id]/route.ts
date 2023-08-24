import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

interface PostParams {
  id: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: PostParams }
) {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({
      success: false,
      message: "Login to continue!",
    });
  }

  const { id } = params;

  //   validating the post id
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (post?.userId !== currentUser?.user?.id) {
    return NextResponse.json({
      success: false,
      message: "Not Authorized!",
    });
  }

  //check if post has images
  const postImgs = await prisma.postImage.findMany({
    where: {
      postId: post?.id,
    },
  });

  //delete all images from cloudinary
  if (postImgs?.length > 0) {
    await Promise.all(
      postImgs.map((img) => cloudinary.uploader.destroy(img.public_id))
    );
  }

  //delete reposts with userpostid and userId
  if (post?.userPost !== null) {
    //find reposts that i own
    const reposts = await prisma.repost.findMany({
      where: {
        postId: post?.userPost,
        userId: currentUser?.user?.id,
      },
    });

    //find the ones that their reposts have quote == null
    const notNullReposts = reposts?.filter((repost) => repost?.quote !== null);

    // delete many with the id and username
    await prisma.$transaction(
      notNullReposts?.map((repost) =>
        prisma.repost.deleteMany({
          where: {
            id: repost?.id,
          },
        })
      )
    );
  }

  //   now delete the post
  await prisma.post.delete({
    where: {
      id: post?.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Post Deleted!",
  });
}
