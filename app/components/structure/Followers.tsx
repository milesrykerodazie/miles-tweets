"use client";
import { Follow } from "@/types";
import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";
import SearchHeader from "./SearchHeader";
import { usePathname } from "next/navigation";

const Followers = ({ users }: { users: Follow[] }) => {
  const pathname = usePathname();
  const free = pathname !== "/search";

  return (
    <div className="px-6 py-4 hidden lg:block col-auto trans w-full">
      <div className="sticky top-3 space-y-3">
        {free && <SearchHeader />}
        <div className="bg-neutral-800 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">You might like</h2>
          <div className="flex flex-col gap-6 mt-4">
            {users.map((user) => (
              <Link
                href={`/profile/${user?.username}`}
                key={user.id}
                className="flex flex-row gap-4"
              >
                <Avatar image={user.userImage} size="h-8 w-8" />

                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    @{user.username ? user?.username : "Miles"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
