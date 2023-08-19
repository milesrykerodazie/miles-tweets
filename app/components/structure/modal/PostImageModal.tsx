"use client";

import { useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function PostImageModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="postImgModal trans">
      <div className="">
        <div className="postImageModal_wrapper">{children}</div>
      </div>
    </div>
  );
}
