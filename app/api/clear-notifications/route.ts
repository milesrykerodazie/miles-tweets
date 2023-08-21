import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "@/app/lib/auth";

export async function DELETE() {
  //getting the current user from server
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error;
  }

  //DELETE ALL NOTIFICATIONS OF A USER
  await prisma.notification.deleteMany({
    where: {
      userId: currentUser?.user?.id,
    },
  });

  // update the user has notifications
  await prisma.user.update({
    where: {
      id: currentUser?.user?.id,
    },
    data: {
      hasNotification: 0,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Notifications cleared.",
  });
}
