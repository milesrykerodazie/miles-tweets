import prisma from "@/app/lib/prismadb";
import { getCurrentUser } from "../lib/auth";
import { PostTypes } from "@/types";

interface UserParams {
  id: string;
}

interface PostParams {
  username: string;
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
      posts: {
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
        orderBy: {
          createdAt: "desc",
        },
      },
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

//get all posts from db
export async function allPosts() {
  //get the current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  //getting all posts and ordering them by latest first

  const posts = await prisma.post.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

//get a post
export async function getPost(params: PostParams) {
  // get current session
  const session = await getCurrentUser();

  if (!session) {
    return;
  }
  const { username, id } = params;

  // validate the user name
  const userExists = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userExists) {
    return;
  }

  // validating postId

  const post = await prisma.post.findUnique({
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

  if (!post) {
    return null;
  }

  return post;
}
