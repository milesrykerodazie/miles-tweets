"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function EditPostModal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div ref={overlay} className="postImgModal trans">
      <div className="flex justify-center">
        <div className="editPostModal_wrapper">{children}</div>
      </div>
    </div>
  );
}
