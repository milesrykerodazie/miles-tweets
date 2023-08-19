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
  return <main>{children}</main>;
}
