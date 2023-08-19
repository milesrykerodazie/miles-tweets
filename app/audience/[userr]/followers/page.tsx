import Followers from "@/app/components/audience/Followers";
import { getCurrentUser } from "@/app/lib/auth";
import React from "react";

const FollowersPage = async () => {
  //session
  const session = await getCurrentUser();

  return (
    <div className="text-white">
      <Followers followers={session?.user?.Followers} />
    </div>
  );
};

export default FollowersPage;
