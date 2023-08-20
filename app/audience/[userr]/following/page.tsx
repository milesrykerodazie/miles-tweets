import Following from "@/app/components/audience/Following";
import { getCurrentUser } from "@/app/lib/auth";
import React from "react";

const FollowingPage = async () => {
  //session
  const session = await getCurrentUser();
  return (
    <div className="text-white">
      <Following
        following={session?.user?.Following}
        followers={session?.user?.Followers}
      />
    </div>
  );
};

export default FollowingPage;
