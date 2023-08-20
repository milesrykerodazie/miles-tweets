import Link from "next/link";
import React, { FC } from "react";
import { BiCalendar } from "react-icons/bi";

interface DetailsProps {
  name: string;
  username: string;
  bio: string;
  dateRegistered: string;
  followers: {
    id: string;
    name: string;
    username: string;
    userImage: string;
    userId: string;
    followerId: string;
  }[];
  following: {
    id: string;
    name: string;
    username: string;
    userImage: string;
    userId: string;
    followingId: string;
  }[];
}

const Details: FC<DetailsProps> = ({
  name,
  username,
  bio,
  dateRegistered,
  followers,
  following,
}) => {
  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="mt-6 px-4">
        <div className="flex flex-col">
          <p className="text-white text-base md:text-2xl font-semibold">
            {name}
          </p>
          <p className="text-md text-neutral-500 text-sm md:text-base trans">
            @{username ? username : "Miles"}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white text-sm md:text-base trans">
            {bio ? bio : "My bio"}
          </p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar className="h-4 w-4 md:h-5 md:w-5 trans" />
            <p className="text-sm md:text-base trans">
              Joined {dateRegistered}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <Link
            href={`/audience/${username}/followers`}
            className="flex flex-row items-center gap-1 text-sm md:text-base trans"
          >
            <p className="text-white">{followers.length}</p>
            <p className="text-neutral-500">
              {followers?.length === 1 ? "Follower" : "Followers"}
            </p>
          </Link>
          <Link
            href={`/audience/${username}/following`}
            className="flex flex-row items-center gap-1 text-sm md:text-base trans"
          >
            <p className="text-white">{following?.length}</p>
            <p className="text-neutral-500">Following</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
