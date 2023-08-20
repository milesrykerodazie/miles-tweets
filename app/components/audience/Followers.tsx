import { Followers, Following } from "@/types";
import React from "react";
import FollowerCard from "./FollowerCard";

const Followers = ({
  followers,
  following,
}: {
  followers: Followers[];
  following: Following[];
}) => {
  return (
    <div className="p-3">
      {followers?.length > 0 ? (
        <div className="space-y-5">
          {followers?.map((follower) => (
            <FollowerCard
              key={follower?.id}
              follower={follower}
              following={following}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-white">No followers yet</p>
        </div>
      )}
    </div>
  );
};

export default Followers;
