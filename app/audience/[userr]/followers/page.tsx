import Followers from "@/app/components/audience/Followers";
import { getCurrentUser } from "@/app/lib/auth";
import React from "react";

const FollowersPage = async () => {
  //session
  const session = await getCurrentUser();

  return (
    <div className="text-white">
      <Followers
        followers={session?.user?.Followers}
        following={session?.user?.Following}
      />
    </div>
  );
};

export default FollowersPage;
