"use client";

import React, { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { completePageNavigation } from "@/components/common/PageNavigationLoader";

function NavigationObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Runs on initial mount and on every subsequent page mount
  useEffect(() => {
    completePageNavigation();
  }, [pathname, searchParams]);

  return null;
}

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-enter-transition w-full flex-1 flex flex-col">
      <Suspense fallback={null}>
        <NavigationObserver />
      </Suspense>
      {children}
    </div>
  );
}
