import React from "react";
import SearchComp from "../components/structure/SearchComp";
import { getMiniUsersList } from "../actions";
import { miniUser } from "@/types";

interface SearchParams {
  searchParams: {
    keyword: string;
  };
}

const SearchPage = async ({ searchParams }: SearchParams) => {
  //   get the mini users list
  const users = (await getMiniUsersList(searchParams)) as miniUser[];

  return <SearchComp users={users} />;
};

export default SearchPage;
