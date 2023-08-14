import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "@/app/lib/auth";

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
    return NextResponse.error;
  }

  //getting the params
  const { id } = params;

  const body = await req.json();

  // verify params and request data

  //check if the product exists
  const foundPost = await prisma.post.findUnique({
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

  if (!foundPost) {
    return NextResponse.json({
      success: false,
      message: "Post does not exist.",
    });
  }

  //   validate user
  const userValid = await prisma.user.findUnique({
    where: {
      id: body?.userId,
    },
  });

  if (!userValid) {
    return NextResponse.json({
      success: false,
      message: "User not found.",
    });
  }

  if (currentUser?.user?.id !== userValid?.id) {
    return NextResponse.json({
      success: false,
      message: "User conflict.",
    });
  }

  //   checking for already liked
  const liked = foundPost?.likes?.filter(
    (like) => like?.userId === userValid?.id
  );

  if (liked.length > 0) {
    //delete like
    await prisma.likes.delete({
      where: {
        id: liked[0]?.id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Unliked.",
    });
  } else {
    await prisma.likes.create({
      data: {
        postId: foundPost?.id,
        userId: userValid?.id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Liked.",
    });
  }
}
