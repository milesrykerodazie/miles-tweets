import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "@/app/lib/auth";

interface UserParams {
  id: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: UserParams }
) {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error;
  }

  //getting the params
  const { id } = params;

  const body = await req.json();

  //validate the user to be followed
  const userValid = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      bio: true,
      coverImage: true,
      userImage: true,
      posts: true,
      Followers: true,
      hasNotification: true,
    },
  });

  if (!userValid) {
    return NextResponse.json({
      success: false,
      message: "User not found.",
    });
  }

  //validate follower
  const validFollower = await prisma.user.findUnique({
    where: {
      id: body?.userId,
    },
  });

  if (!validFollower) {
    return NextResponse.json({
      success: false,
      message: "User not found.",
    });
  }

  if (currentUser?.user?.id !== validFollower?.id) {
    return NextResponse.json({
      success: false,
      message: "User conflict.",
    });
  }

  //checking if user to be followed and follower are the same
  if (userValid?.id === validFollower?.id) {
    return NextResponse.json({
      success: false,
      message: "Follow others!",
    });
  }

  //checking if valid user has already followed
  const followed = userValid?.Followers?.filter(
    (user) => user?.followerId === validFollower?.id
  );

  if (followed.length > 0) {
    //remove follow
    await prisma.followers.delete({
      where: {
        id: followed[0].id,
      },
    });

    //remove following
    await prisma.following.delete({
      where: {
        followingId: userValid?.id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "UnFollowed!.",
    });
  } else {
    //add follower
    await prisma.followers.create({
      data: {
        name: validFollower?.name,
        username: validFollower?.username,
        userImage: validFollower?.userImage,
        bio: validFollower?.bio,
        followerId: validFollower?.id,
        userId: userValid?.id,
      },
    });

    //add following
    await prisma.following.create({
      data: {
        name: userValid?.name,
        username: userValid?.username,
        userImage: userValid?.userImage,
        bio: userValid?.bio,
        followingId: userValid?.id,
        userId: validFollower?.id,
      },
    });

    //follow notification
    //create the notification
    await prisma.notification.create({
      data: {
        body: "followed you!",
        notifierName: validFollower?.name!,
        notifierusername: validFollower?.username!,
        notifierImage: validFollower?.image!,
        userId: userValid?.id!,
      },
    });

    //update user notification
    await prisma.user.update({
      where: {
        id: userValid?.id,
      },
      data: {
        hasNotification: userValid?.hasNotification! + 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Followed!.",
    });
  }
}
