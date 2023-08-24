"use client";
import { UserProfile } from "@/types";
import { format } from "date-fns";
import Hero from "./Hero";
import Details from "./Details";
import AllPosts from "../post/Posts";
import Header from "../structure/Header";

interface UserTypes {
  userData: UserProfile;
  userId: string;
}

const Profile = ({ userData, userId }: UserTypes) => {
  const canEdit = userData?.id === userId;

  //check if user has followed
  const hasFollowed = userData?.Followers?.some(
    (user) => user?.followerId === userId
  );

  // const posts = userData?.posts as PostTypes[];
  // const reposts = userData?.Repost as Repost[];

  // const filteredRepost = reposts?.filter?.((repost) => repost?.quote === null);

  // //@ts-expect-error
  // const combinedArray = posts.concat(filteredRepost);

  // // sorted array

  // const sorted = combinedArray.sort(
  //   //@ts-expect-error
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  return (
    <div>
      {/* section 1 */}
      <Header title={userData?.name} allowed />
      {/* section 2 */}
      <Hero
        userData={userData}
        canEdit={canEdit}
        userId={userId}
        hasFollowed={hasFollowed}
      />

      {/* section 3 */}
      <Details
        name={userData?.name}
        username={userData?.username}
        bio={userData?.bio}
        dateRegistered={format(userData?.createdAt, "MMM-dd-yyy")}
        followers={userData?.Followers}
        following={userData?.Following}
      />
      {/* user posts section */}
      <AllPosts posts={userData?.posts} userId={userId} />
    </div>
  );
};

export default Profile;
