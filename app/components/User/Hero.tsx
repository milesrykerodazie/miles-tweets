"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import Avatar from "../Avatar";
import { Profile } from "@/types";
import EditProfile from "../structure/modal/EditProfile";

interface HeroProps {
  userData: Profile;
  canEdit: boolean;
}

const Hero: FC<HeroProps> = ({ userData, canEdit }) => {
  //get the modal open
  const [openEdit, setOpenEdit] = useState(false);
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
            className="border border-primarygrey px-3 py-1 rounded-full"
          >
            Edit profile
          </button>
        </div>
      ) : (
        <div className="flex justify-end mr-3 mt-3">
          <button className="bg-white text-primary px-3 py-1 rounded-full">
            Follow
          </button>
        </div>
      )}
      {openEdit && canEdit && (
        <EditProfile setOpenEdit={setOpenEdit} userData={userData} />
      )}
    </div>
  );
};

export default Hero;
