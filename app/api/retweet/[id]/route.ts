import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/app/lib/prismadb";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

interface RetweetParams {
  id: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: RetweetParams }
) {
  //get the current user
  const session = await getCurrentUser();

  if (!session) {
    NextResponse.json({
      success: false,
      message: "UnAuthorized.",
    });
  }

  //the post id
  const { id } = params;

  const body = await req.json();

  //validate post id
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
          userId: true,
          user: {
            select: {
              name: true,
              image: true,
              email: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
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
      Repost: {
        select: {
          id: true,
          quote: true,
          postId: true,
          userId: true,
        },
      },
    },
  });

  const postImgs =
    foundPost &&
    foundPost?.postImages?.length > 0 &&
    foundPost?.postImages?.map((image) => image?.url);

  //if there is a quote , create a new post
  if (body?.quote !== "") {
    //create post

    const newPost = await prisma.post.create({
      data: {
        body: body?.quote,
        userId: session?.user?.id,
        userPost: foundPost?.id,
        userPostImage: foundPost?.user?.image,
        userPostName: foundPost?.user?.name,
        userPostUsername: foundPost?.user?.username,
        userPostBody: foundPost?.body,
        userPostDate: foundPost?.createdAt,
        userPostImages: postImgs ? postImgs : [],
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
          owner: session?.user?.id,
        };
      });

      //create all images

      await prisma.postImage.createMany({
        data: images,
      });

      //add the repost
      await prisma.repost.create({
        data: {
          postId: foundPost?.id!,
          userId: session?.user?.id,
          quote: body?.quote,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Reposted.",
      });
    }

    //add the repost
    await prisma.repost.create({
      data: {
        postId: foundPost?.id!,
        userId: session?.user?.id,
        quote: body?.quote,
      },
    });

    if (newPost) {
      return NextResponse.json({
        success: true,
        message: "Reposted.",
      });
    }
  } else {
    const alreadyReposted =
      foundPost &&
      foundPost?.Repost?.length > 0 &&
      foundPost?.Repost?.filter(
        (post) =>
          post?.quote === null &&
          post?.userId === session?.user?.id &&
          post?.postId === foundPost?.id
      );

    console.log("the already reposted post => ", alreadyReposted);

    if (alreadyReposted) {
      await prisma.$transaction(
        alreadyReposted?.map((repost) =>
          prisma.repost.deleteMany({
            where: {
              id: repost?.id,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Undone Repost.",
      });
    } else {
      // create repost
      const newRepost = await prisma.repost.create({
        data: {
          postId: foundPost?.id!,
          userId: session?.user?.id,
        },
      });

      if (newRepost) {
        return NextResponse.json({
          success: true,
          message: "Reposted.",
        });
      }
    }
  }
}
