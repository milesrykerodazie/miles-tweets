import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";
import { getCurrentUser } from "@/app/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

interface UserParams {
  id: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: UserParams }
) {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  //getting the params
  const { id } = params;

  const body = await req.json();

  //validate user
  const exists = await prisma.user.findUnique({
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
      createdAt: true,
      profileImage: true,
      userCoverImage: true,
    },
  });

  if (!exists) {
    return NextResponse.json({
      success: false,
      message: "User not found.",
    });
  }

  //   if user can edit
  if (currentUser?.user?.id !== exists?.id) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized!",
    });
  }

  //update inputs first
  const updateUser = await prisma.user.update({
    where: {
      id: exists?.id,
    },
    data: {
      name: body?.name,
      bio: body?.bio,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (updateUser) {
    //for userImage
    if (body?.userImage) {
      //delete the existing image first before uploading a new one
      if (exists?.profileImage !== null) {
        //delete from cloudinary
        await cloudinary.uploader.destroy(exists?.profileImage?.public_id);
        //delete image from database
        await prisma.profileImage.delete({
          where: {
            id: exists?.profileImage?.id,
          },
        });
      }

      //work on cloudinary image upload
      const uploadedImage = await cloudinary.uploader.upload(body?.userImage, {
        folder: "miles-tweets/users_images",
        transformation: [{ width: 250, height: 250, crop: "scale" }],
      });

      //creating new profile image
      await prisma.profileImage.create({
        data: {
          public_id: uploadedImage?.public_id,
          url: uploadedImage?.secure_url,
          userId: exists?.id,
        },
      });

      //update the user image
      await prisma.user.update({
        where: {
          id: exists?.id,
        },
        data: {
          userImage: uploadedImage?.secure_url,
        },
      });
    }

    //for coverImage
    if (body?.coverImage) {
      //delete the existing image first before uploading a new one
      if (exists?.userCoverImage !== null) {
        //delete from cloudinary
        await cloudinary.uploader.destroy(exists?.userCoverImage?.public_id);
        //delete image from database
        await prisma.coverImage.delete({
          where: {
            id: exists?.userCoverImage?.id,
          },
        });
      }

      //work on cloudinary image upload
      const uploadedImage = await cloudinary.uploader.upload(body?.coverImage, {
        folder: "miles-tweets/cover_images",
        transformation: [{ width: 640, height: 426, crop: "scale" }],
      });

      //creating new profile image
      await prisma.coverImage.create({
        data: {
          public_id: uploadedImage?.public_id,
          url: uploadedImage?.secure_url,
          userId: exists?.id,
        },
      });

      //update the user image
      await prisma.user.update({
        where: {
          id: exists?.id,
        },
        data: {
          coverImage: uploadedImage?.secure_url,
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: "User Updated Successfully.",
    username: exists?.username,
  });
}
