import AudienceHeader from "@/app/components/structure/AudienceHeader";
import { getCurrentUser } from "@/app/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audience",
};

export default async function AudienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //get session
  const session = await getCurrentUser();
  return (
    <main>
      <AudienceHeader
        name={session?.user?.name}
        username={session?.user?.username}
      />
      {children}
    </main>
  );
}
