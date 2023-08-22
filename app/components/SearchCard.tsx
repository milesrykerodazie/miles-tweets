import { miniUser } from "@/types";
import React, { FC } from "react";
import Avatar from "./Avatar";
import Link from "next/link";

interface UserProTypes {
  user: miniUser;
}

const SearchCard: FC<UserProTypes> = ({ user }) => {
  return (
    <div>
      <div className="flex space-x-2 relative">
        <div>
          <Avatar image={user?.image} size="lg:h-10 lg:w-10 h-7 w-7 trans" />
        </div>
        <div className="flex items-center justify-between flex-1">
          <div className="text-sm md:text-base trans">
            <Link href={`/profile/${user?.username}`}>
              <p className="text-white">{user?.name}</p>
            </Link>
            <Link href={`/profile/${user?.username}`}>
              <p className="text-gray-600">{user?.username}</p>
            </Link>
          </div>
        </div>
      </div>
      {user?.bio && (
        <div>
          <p className="text-white text-sm">{user?.bio}</p>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
