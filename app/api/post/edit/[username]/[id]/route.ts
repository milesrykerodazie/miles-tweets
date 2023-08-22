import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/app/lib/prismadb";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

interface PostParams {
  username: string;
  id: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: PostParams }
) {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  //getting the params
  const { username, id } = params;
  const body = await req.json();

  //validate username
  const validateUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!validateUser) {
    return NextResponse.json({
      success: false,
      message: "Invalid user.",
    });
  }

  // validate post id
  const validPost = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      postImages: true,
      user: true,
    },
  });

  if (!validPost) {
    return NextResponse.json({
      success: false,
      message: "Invalid post.",
    });
  }

  //check if user is authorized to delete
  if (validateUser?.id !== currentUser?.user?.id) {
    return NextResponse.json({
      success: false,
      message: "UnAuthorized.",
    });
  }

  //check if there are images to upload and they are not more than 4

  if (
    body?.images?.length > 0 &&
    body?.images?.length + validPost?.postImages?.length > 4
  ) {
    return NextResponse.json({
      success: false,
      message: "Only 4 images allowed.",
    });
  }

  //if post body and updated and there are images to upload
  if (body?.Images?.length > 0) {
    //update the post body
    const postUpdate = await prisma.post.update({
      where: {
        id: validPost?.id,
      },
      data: {
        body: body?.text,
      },
    });

    if (postUpdate) {
      //uploading images
      const uploadedImages = await Promise.all(
        body?.Images?.map((image: any) =>
          cloudinary.uploader.upload(image, {
            folder: "miles-tweets/post-images",
            transformation: [{ width: 640, height: 426, crop: "scale" }],
          })
        )
      );

      //formatting the images to fit prisma model
      const images = uploadedImages?.map((img) => {
        return {
          postId: postUpdate.id as string,
          public_id: img.public_id as string,
          url: img.secure_url as string,
          owner: currentUser?.user?.id,
        };
      });

      //create all images
      await prisma.postImage.createMany({
        data: images,
      });

      return NextResponse.json({
        success: true,
        message: "Post Updated.",
        postId: postUpdate?.id,
        owner: validPost?.user?.username,
      });
    }
  } else {
    //update the post body
    const postUpdate = await prisma.post.update({
      where: {
        id: validPost?.id,
      },
      data: {
        body: body?.text,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Post Updated.",
      postId: postUpdate?.id,
      owner: validPost?.user?.username,
    });
  }
}
