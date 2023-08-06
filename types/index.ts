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
  name: string;
  username: string | null;
  userImage: string | null;
  id: string;
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
  }[];
}

export type FormState = {
  name: string;
  bio: string;
  userImage: string;
  coverImage: string;
};
