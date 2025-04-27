"use client";

import { useEffect } from "react";

export default function PreventRefreshProvider({
  shouldPrevent = true,
  children,
}: {
  shouldPrevent?: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only prevent refresh if `shouldPrevent` is true
    if (!shouldPrevent) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave, hii?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldPrevent]);

  return <>{children}</>;
}
