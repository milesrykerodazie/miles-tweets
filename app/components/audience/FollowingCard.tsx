import Link from "next/link";
import React, { FC } from "react";
import Avatar from "../Avatar";
import { Followers, Following } from "@/types";
import { BsThreeDots } from "react-icons/bs";

interface AudienceTypes {
  followers: Followers[];
  follow: Following;
}

const FollowingCard: FC<AudienceTypes> = ({ followers, follow }) => {
  //check if i am following the following
  const checkFollowing = followers?.some(
    (follower) => follower?.followerId === follow?.followingId
  );

  return (
    <div>
      <div className="flex space-x-2 relative">
        <div>
          <Avatar
            image={follow?.userImage}
            size="lg:h-10 lg:w-10 h-7 w-7 trans"
          />
        </div>
        {/* section 2.1 */}
        <div className="flex items-center justify-between flex-1">
          <div className="text-sm md:text-base trans">
            <Link href={`/profile/${follow?.username}`}>
              <p className="text-white">{follow?.name}</p>
            </Link>
            <Link href={`/profile/${follow?.username}`}>
              <p className="text-gray-600">{follow?.username}</p>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {checkFollowing === true ? (
              <button
                type="button"
                className="text-white px-4 py-1 rounded-full text-sm md:text-base bg-black border border-gray-600 hover:text-red-500 hover:border hover:border-red-500 follow-button trans"
              ></button>
            ) : (
              <button
                type="button"
                className="bg-white text-primary px-3 py-1 rounded-full text-sm md:text-base trans"
              >
                Follow
              </button>
            )}

            <BsThreeDots className="text-gray-600" />
          </div>
        </div>
      </div>
      {follow?.bio && (
        <div>
          <p className="text-white text-sm">{follow?.bio}</p>
        </div>
      )}
    </div>
  );
};

export default FollowingCard;
