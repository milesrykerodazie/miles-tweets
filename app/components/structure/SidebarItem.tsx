"use client";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SessionInterface } from "@/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const items = [
  {
    id: 1,
    icon: BsHouseFill,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: BsBellFill,
    label: "Notifications",
    href: "/notifications",
    auth: true,
    alert: false,
  },
  {
    id: 3,
    icon: FaUser,
    label: "Profile",
    href: "/profile",
    auth: true,
  },
];

interface SessionProp {
  currentUser: SessionInterface;
}

const SidebarItem = ({ currentUser }: SessionProp) => {
  const items = [
    {
      id: 1,
      icon: BsHouseFill,
      label: "Home",
      href: "/home",
    },
    {
      id: 2,
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: false,
    },
    {
      id: 3,
      icon: FaUser,
      label: "Profile",
      href: `/profile/${currentUser?.user?.id}`,
      auth: true,
    },
  ];
  const route = useRouter();
  const loginModal = useLoginModal();

  return (
    <div>
      {items?.map((item) => (
        <div
          key={item?.id}
          className="flex flex-row items-center"
          onClick={() => route.push(`${item?.href}`)}
        >
          <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
            <item.icon size={28} color="white" />
            {item?.alert ? (
              <BsDot
                className="text-sky-500 absolute -top-4 left-0"
                size={70}
              />
            ) : null}
          </div>
          <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
            <item.icon size={28} color="white" />
            <p className="hidden lg:block text-white text-xl">{item?.label}</p>
            {item?.alert ? (
              <BsDot
                className="text-sky-500 absolute -top-4 left-0"
                size={70}
              />
            ) : null}
          </div>
        </div>
      ))}
      {currentUser ? (
        <div className="flex flex-row items-center">
          <div
            className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
            onClick={() => signOut()}
          >
            <BiLogOut size={28} color="white" />
          </div>
          <div
            className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center"
            onClick={() => signOut()}
          >
            <BiLogOut size={28} color="white" />
            <p className="hidden lg:block text-white text-xl">Logout</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div
            onClick={loginModal.onOpen}
            className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
          >
            <BiLogOut size={28} color="white" />
          </div>
          <Link href="/login">
            <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-fullhover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
              <BiLogOut size={28} color="white" />
              <p className="hidden lg:block text-white text-xl">Login</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
