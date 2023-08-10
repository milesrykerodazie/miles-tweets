import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "../lib/auth";
interface UserParams {
  id: string;
}

//get user details
export async function getUserById(params: UserParams) {
  //if user is authenticated
  const session = await getCurrentUser();

  if (!session) {
    return;
  }
  //validate the id
  const { id } = params;

  const user = await prisma.user?.findUnique({
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
    },
  });
  if (!user) {
    return null;
  }
  return user;
}

//get users to follow suggestions
export async function followSuggestions() {
  //get the current user
  const currentUser = await getCurrentUser();

  const users = await prisma.user.findMany({
    select: {
      name: true,
      username: true,
      userImage: true,
      id: true,
    },
    take: 4,
  });

  if (users.length < 1) {
    return null;
  }

  //filter out the current user
  const filteredUsers = users?.filter(
    (user) => user?.id !== currentUser?.user?.id
  );

  if (filteredUsers.length > 0) {
    return filteredUsers;
  }
}
