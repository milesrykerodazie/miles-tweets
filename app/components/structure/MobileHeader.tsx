"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Logo from "./Logo";
import MobileSidebar from "../sidebar/MobileSidebar";
import { SessionInterface } from "@/types";

const MobileHeader = ({
  title,
  session,
}: {
  title?: string;
  session: SessionInterface;
}) => {
  const [navMobile, setNavMobile] = useState(false);
  return (
    <div className="border-b-[1px] border-neutral-800 p-3 sticky top-0 bg-black z-80 sm:hidden">
      <div className="flex items-center justify-between">
        <div onClick={() => setNavMobile((current) => !current)}>
          <Avatar image={""} size="lg:h-10 lg:w-10 h-9 w-9 trans" />
        </div>
        {!title && <Logo mobile={true} />}
        {title && <h1 className="text-white font-semibold">{title}</h1>}
        <div></div>
      </div>

      <MobileSidebar
        navMobile={navMobile}
        setNavMobile={setNavMobile}
        session={session}
      />
    </div>
  );
};

export default MobileHeader;
