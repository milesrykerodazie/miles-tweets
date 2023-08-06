"use client";
import { Profile, SessionInterface } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import Hero from "./Hero";
import Details from "./Details";

interface UserTypes {
  userData: Profile;
  userId: string;
}

const Profile = ({ userData, userId }: UserTypes) => {
  const router = useRouter();
  const canEdit = userData?.id === userId;
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
      <Hero userData={userData} canEdit={canEdit} />

      {/* section 3 */}
      <Details
        name={userData?.name}
        username={userData?.username}
        bio={userData?.bio}
        dateRegistered={format(userData?.createdAt, "MMM-dd-yyy")}
        followers={userData?.Followers}
      />
    </div>
  );
};

export default Profile;
