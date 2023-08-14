import { Session, User } from "next-auth";

export interface SessionInterface extends Session {
  user: User & {
    profileImage: {
      public_id: string;
      url: string;
      userId: string;
    };
  };
}

export interface Follow {
  id: string;
  name: string;
  username: string | null;
  userImage: string | null;
  userId: string;
  followerId: string | null;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  userImage: string;
  coverImage: string;
  bio: string;
  createdAt: Date;
  Followers: {
    id: string;
    name: string;
    username: string;
    userImage: string;
    userId: string;
    followerId: string;
  }[];
  posts: PostTypes[];
}

export type FormState = {
  name: string;
  bio: string;
  userImage: string;
  coverImage: string;
};

export interface PostTypes {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    image: string;
    email: string;
    username: string;
  };
  postImages: {
    id: string;
    postId: string;
    public_id: string;
    url: string;
  }[];
  likes: {
    id: string;
    postId: string;
    userId: string;
    User: {
      name: string;
      image: string;
      email: string;
    };
  }[];
  comments: {
    id: string;
    body: string;
    createdAt: Date;
    postId: string;
    user: {
      name: string;
      image: string;
      email: string;
    };
  }[];
}

export type PostsTypes = {
  posts: PostTypes[];
};
