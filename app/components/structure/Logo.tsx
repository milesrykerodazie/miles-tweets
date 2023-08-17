"use client";
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/home")}
      className="
        rounded-full 
        hidden sm:block trans
        h-14
        w-14
        p-4  
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    "
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default Logo;
