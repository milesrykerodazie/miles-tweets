"use client";
import { miniUser } from "@/types";
import SearchCard from "../SearchCard";
import SearchHeader from "./SearchHeader";
import { FC } from "react";

interface UserProTypes {
  users: miniUser[];
}

const SearchComp: FC<UserProTypes> = ({ users }) => {
  return (
    <div className="p-3">
      <SearchHeader allow />

      {users?.length > 0 ? (
        <div className="space-y-3 mt-5">
          {users?.map((user) => (
            <SearchCard key={user?.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-white">
          Enter a keyword for search
        </div>
      )}
    </div>
  );
};

export default SearchComp;
