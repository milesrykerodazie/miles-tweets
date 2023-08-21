import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "@/app/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

interface ImageParams {
  id: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: ImageParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  // validate image

  const validImage = await prisma.postImage.findUnique({
    where: {
      id: id,
    },
  });

  if (!validImage) {
    return NextResponse.json({ success: false, message: "Image not found." });
  }

  if (currentUser?.user?.id !== validImage?.owner) {
    return NextResponse.json({ success: false, message: "UnAuthorized." });
  }

  // delete from clodinary
  if (validImage?.public_id) {
    await cloudinary.uploader.destroy(validImage?.public_id);
  }

  await prisma.postImage.delete({
    where: {
      id: validImage.id,
    },
  });

  return NextResponse.json({ success: true, message: "Image deleted." });
}
