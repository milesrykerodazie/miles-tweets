import { getUserById } from "@/app/actions";
import Profile from "@/app/components/User/Profile";
import { getCurrentUser } from "@/app/lib/auth";
import { UserProfile } from "@/types";
import React from "react";

interface UserParams {
  username: string;
}

const UserProfile = async ({ params }: { params: UserParams }) => {
  //get current user id
  const currentUser = await getCurrentUser();
  //get user profile data
  const userData = (await getUserById(params)) as UserProfile;

  return (
    <section>
      {!userData ? (
        <p>No user</p>
      ) : (
        <Profile userData={userData} userId={currentUser?.user?.id} />
      )}
    </section>
  );
};

export default UserProfile;
