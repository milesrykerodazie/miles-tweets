import { getUserById } from "@/app/actions";
import AudienceHeader from "@/app/components/structure/AudienceHeader";
import { getCurrentUser } from "@/app/lib/auth";
import { UserProfile } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audience",
};

export default async function AudienceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  //get session
  const userData = (await getUserById(params)) as UserProfile;
  return (
    <main>
      <AudienceHeader name={userData?.name} usernamee={userData?.username} />
      {children}
    </main>
  );
}
