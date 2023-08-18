"use client";
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";

const Logo = ({ mobile }: { mobile?: boolean }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/home")}
      className={`rounded-full 
       trans
      hover:bg-opacity-10 
      cursor-pointer ${
        mobile
          ? ""
          : "hidden sm:block p-4 h-14 w-14 items-center justify-center hover:bg-blue-300 "
      }`}
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default Logo;
