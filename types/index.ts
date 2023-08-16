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

export interface NotificationTypes {
  id: string;
  body: string;
  notifierName: string;
  notifierusername: string;
  notifierImage: string;
  createdAt: Date;
}

export interface Follow {
  id: string;
  name: string;
  username: string | null;
  userImage: string | null;
  userId: string;
  followerId: string | null;
}

export interface Notification {
  id: string;
  hasNotification: number;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  userImage: string;
  hasNotification: number;
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
  Following: {
    id: string;
    name: string;
    username: string;
    userImage: string;
    userId: string;
    followingId: string;
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
      username: string;
    };
  }[];
}

export type PostsTypes = {
  posts: PostTypes[];
};

export interface ReplyTypes {
  id: string;
  body: string;
  createdAt: Date;
  postId: string;
  user: {
    name: string;
    image: string;
    email: string;
    username: string;
  };
}
