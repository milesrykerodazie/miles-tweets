import { getUserById } from "@/app/actions";
import Following from "@/app/components/audience/Following";
import { getCurrentUser } from "@/app/lib/auth";
import { UserProfile } from "@/types";
import React from "react";

interface UserParams {
  username: string;
}

const FollowingPage = async ({ params }: { params: UserParams }) => {
  const session = await getCurrentUser();
  const userData = (await getUserById(params)) as UserProfile;

  return (
    <div className="text-white">
      <Following
        sessionId={session?.user?.id}
        following={userData?.Following}
        sessionFollowing={session?.user?.Following}
      />
    </div>
  );
};

export default FollowingPage;
