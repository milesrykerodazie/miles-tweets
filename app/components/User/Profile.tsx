"use client";
import { Follow, Profile } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { format } from "date-fns";
import Hero from "./Hero";
import Details from "./Details";
import { toast } from "react-hot-toast";
import axios from "axios";
import AllPosts from "../post/Posts";
import Header from "../structure/Header";

interface UserTypes {
  userData: Profile;
  userId: string;
}

const Profile = ({ userData, userId }: UserTypes) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const canEdit = userData?.id === userId;

  //check if user has followed
  const hasFollowed = userData?.Followers?.some(
    (user) => user?.followerId === userId
  );

  return (
    <div>
      {/* section 1 */}
      <Header title={userData?.name} allowed />
      {/* section 2 */}
      <Hero
        userData={userData}
        canEdit={canEdit}
        userId={userId}
        hasFollowed={hasFollowed}
      />

      {/* section 3 */}
      <Details
        name={userData?.name}
        username={userData?.username}
        bio={userData?.bio}
        dateRegistered={format(userData?.createdAt, "MMM-dd-yyy")}
        followers={userData?.Followers}
        following={userData?.Following}
      />
      {/* user posts section */}
      <AllPosts posts={userData?.posts} userId={userId} />
    </div>
  );
};

export default Profile;
