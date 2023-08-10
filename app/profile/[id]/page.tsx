import { getUserById } from "@/app/actions";
import Profile from "@/app/components/User/Profile";
import { getCurrentUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface UserParams {
  id: string;
}

const UserProfile = async ({ params }: { params: UserParams }) => {
  //get current user id
  const currentUser = await getCurrentUser();
  //get user profile data
  const userData = await getUserById(params);

  // if (!currentUser) {
  //   redirect("/");
  // }

  return (
    <section>
      {!userData ? (
        <p>No user</p>
      ) : (
        //@ts-expect-error
        <Profile userData={userData} userId={currentUser?.user?.id} />
      )}
    </section>
  );
};

export default UserProfile;
