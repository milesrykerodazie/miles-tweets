import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";
import { getCurrentUser } from "@/app/lib/auth";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error;
  }

  const body = await req.json();

  //create the new post
  const newPost = await prisma.post.create({
    data: {
      body: body?.post === "" ? "" : body?.post,
      userId: currentUser?.user?.id,
    },
  });

  if (body?.imageFiles?.length > 0 && newPost) {
    const uploadedImages = await Promise.all(
      body?.imageFiles?.map((image: any) =>
        cloudinary.uploader.upload(image, {
          folder: "miles-tweets/post-images",
          transformation: [{ width: 640, height: 426, crop: "scale" }],
        })
      )
    );

    //formatting the images to fit prisma model
    const images = uploadedImages?.map((img) => {
      return {
        postId: newPost.id as string,
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
      message: "Post Added.",
    });
  }

  if (newPost) {
    return NextResponse.json({
      success: true,
      message: "Post Added.",
    });
  }
}
