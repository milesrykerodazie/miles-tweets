"use client";

import { useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function TweetModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="authmodal trans">
      <div className="flex items-center justify-center">
        <div className="tweetModal_wrapper">
          <div className="sticky top-0 bg-black pl-4 py-4 z-20">
            <button type="button" onClick={onDismiss} className="">
              <IoMdClose className="text-white w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
