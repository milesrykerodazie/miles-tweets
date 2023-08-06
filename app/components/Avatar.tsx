import Image from "next/image";
import React, { FC } from "react";

interface ImageProps {
  image: string | null;
  size?: string;
}

const Avatar: FC<ImageProps> = ({ image, size }) => {
  return (
    <div
      className={`border-2 border-black  rounded-full cursor-pointer hover:opacity-90 trans relative ${
        size ? size : "h-16 w-16"
      }`}
    >
      <Image
        fill
        className="rounded-full object-cover"
        alt="Avatar"
        src={image || "/images/dummy.jpg"}
      />
    </div>
  );
};

export default Avatar;
