"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { Profile } from "@/types";
import EditProfile from "../structure/modal/EditProfile";
import { handleUserFollow } from "@/app/helper";
import { useRouter } from "next/navigation";

interface HeroProps {
  userData: Profile;
  canEdit: boolean;
  userId: string;
  hasFollowed: boolean;
}

const Hero: FC<HeroProps> = ({ userData, canEdit, userId, hasFollowed }) => {
  //the route
  const router = useRouter();
  //get the modal open
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        <Image
          src={
            userData?.coverImage ? userData?.coverImage : "/images/dummy.jpg"
          }
          fill
          alt="Cover Image"
          style={{ objectFit: "cover" }}
        />

        <div className="absolute -bottom-7 left-4">
          <Avatar image={userData?.userImage} />
        </div>
      </div>
      {canEdit ? (
        <div className="flex justify-end mr-3 mt-3 ">
          <button
            onClick={() => setOpenEdit(true)}
            className="border border-primarygrey px-4 py-1 rounded-full text-white text-sm md:text-base trans"
          >
            Edit profile
          </button>
        </div>
      ) : (
        <div className="flex justify-end mr-3 mt-3">
          {hasFollowed === true ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleUserFollow(userId, userData?.id, setIsLoading, router);
              }}
              className="text-white px-4 py-1 rounded-full text-sm md:text-base bg-black border border-gray-600 hover:text-red-500 hover:border hover:border-red-500 follow-button trans disabled:cursor-not-allowed disabled:opacity-50"
            ></button>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleUserFollow(userId, userData?.id, setIsLoading, router);
              }}
              className="bg-white text-primary px-4 py-1 rounded-full text-sm md:text-base trans border border-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Follow
            </button>
          )}
        </div>
      )}
      {openEdit && canEdit && (
        <EditProfile setOpenEdit={setOpenEdit} userData={userData} />
      )}
    </div>
  );
};

export default Hero;
