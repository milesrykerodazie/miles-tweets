import { getUserById } from "@/app/actions";
import Following from "@/app/components/audience/Following";
import { Profile } from "@/types";
import React from "react";

interface UserParams {
  username: string;
}

const FollowingPage = async ({ params }: { params: UserParams }) => {
  const userData = (await getUserById(params)) as Profile;

  return (
    <div className="text-white">
      <Following
        following={userData?.Following}
        followers={userData?.Followers}
      />
    </div>
  );
};

export default FollowingPage;
