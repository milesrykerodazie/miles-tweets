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
  const hasFollowed = userData?.Followers?.filter(
    (user) => user?.followerId === userId
  ) as Follow[];

  //handle follow user
  const handleUserFollow = async () => {
    try {
      if (!userId) {
        toast.error("Login to follow!");
        return;
      }

      const response = await axios.post(`/api/follow-user/${userData?.id}`, {
        userId: userId,
      });
      if (response?.data) {
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          setIsLoading(false);
          router.refresh();
        }
        if (response?.data?.success === false) {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* section 1 */}
      <Header title={userData?.name} allowed />
      {/* section 2 */}
      <Hero
        userData={userData}
        canEdit={canEdit}
        follow={handleUserFollow}
        hasFollowed={hasFollowed}
        disable={isLoading}
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
