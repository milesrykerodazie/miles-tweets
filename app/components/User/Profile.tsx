"use client";
import { Follow, Profile, SessionInterface } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import Hero from "./Hero";
import Details from "./Details";
import { toast } from "react-hot-toast";
import axios from "axios";
import AllPosts from "../post/Posts";

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
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2">
          <BiArrowBack
            onClick={() => router.back()}
            color="white"
            size={20}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "
          />

          <h1 className="text-white text-xl font-semibold">{userData?.name}</h1>
        </div>
      </div>
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
      />
      {/* user posts section */}
      <AllPosts posts={userData?.posts} />
    </div>
  );
};

export default Profile;
