"use client";

import { useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function LogoutModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="logoutModal trans">
      <div className="logoutModal_wrapper">{children}</div>
    </div>
  );
}
