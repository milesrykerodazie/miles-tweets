import { Followers, Following } from "@/types";
import React from "react";
import FollowingCard from "./FollowingCard";

const Following = ({
  sessionId,
  following,
  sessionFollowing,
}: {
  sessionId: string;

  following: Following[];

  sessionFollowing: Following[];
}) => {
  return (
    <div className="p-3">
      {following?.length > 0 ? (
        <div className="space-y-5">
          {following?.map((follow) => (
            <FollowingCard
              key={follow?.id}
              follow={follow}
              sessionId={sessionId}
              sessionFollowing={sessionFollowing}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-white">Not following anyone</p>
        </div>
      )}
    </div>
  );
};

export default Following;
