import { getUserById } from "@/app/actions";
import Followers from "@/app/components/audience/Followers";
import { getCurrentUser } from "@/app/lib/auth";
import { UserProfile } from "@/types";
import React from "react";

interface UserParams {
  username: string;
}

const FollowersPage = async ({ params }: { params: UserParams }) => {
  const session = await getCurrentUser();
  const userData = (await getUserById(params)) as UserProfile;

  return (
    <div className="text-white">
      <Followers
        sessionId={session?.user?.id}
        sessionFollowing={session?.user?.Following}
        followers={userData?.Followers}
      />
    </div>
  );
};

export default FollowersPage;
