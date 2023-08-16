import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prismadb";

interface PostParams {
  id: string;
}

export async function POST(
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

  //find more user details
  //   validate user
  const userValid = await prisma.user.findUnique({
    where: {
      id: currentUser?.user?.id,
    },
  });

  if (!userValid) {
    return NextResponse.json({
      success: false,
      message: "User not found.",
    });
  }

  const { id } = params;
  const body = await req.json();

  //   validating the post id
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          createdAt: true,
          postId: true,
          user: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      },
      likes: {
        select: {
          id: true,
          postId: true,
          userId: true,
          User: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      },
      postImages: {
        select: {
          id: true,
          postId: true,
          public_id: true,
          url: true,
          // owner: true,
        },
      },
      user: {
        select: {
          name: true,
          image: true,
          email: true,
          username: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({
      success: false,
      message: "Post not found!",
    });
  }

  //FINDING THE POST OWNER
  //get post owner
  const postOwner = await prisma.user.findUnique({
    where: {
      id: post?.userId,
    },
  });

  //comment in the post
  const comment = await prisma.comment.create({
    data: {
      body: body?.reply,
      postId: post?.id,
      userId: userValid?.id,
    },
  });

  //create the notification
  await prisma.notification.create({
    data: {
      body: "replied your post!",
      notifierName: userValid?.name!,
      notifierusername: userValid?.username!,
      notifierImage: userValid?.image!,
      userId: postOwner?.id!,
    },
  });

  //update user notification
  await prisma.user.update({
    where: {
      id: postOwner?.id,
    },
    data: {
      hasNotification: postOwner?.hasNotification! + 1,
    },
  });

  if (comment) {
    return NextResponse.json({ success: true, message: "Reply added." });
  } else {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
