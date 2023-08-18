import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prismadb";

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

  //   validating the reply id
  const comment = await prisma.comment.findUnique({
    where: {
      id: id,
    },
  });

  if (comment?.userId !== currentUser?.user?.id) {
    return NextResponse.json({
      success: false,
      message: "Not Authorized!",
    });
  }

  //   now delete the post
  await prisma.comment.delete({
    where: {
      id: comment?.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Reply Deleted!",
  });
}
