"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";

// Global helper to trigger or finish navigation from any component
export function triggerPageNavigation() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tm:navigation-start"));
  }
}

export function completePageNavigation() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tm:navigation-finish"));
  }
}

function NavigationLoaderCore() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);

  const isNavigatingRef = useRef(false);
  const startTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
  };

  // Start navigation loading: stays active until completePageNavigation is called
  const handleStart = () => {
    clearAllTimers();
    isNavigatingRef.current = true;

    // Immediately activate top progress bar for instant tactile feedback
    setIsNavigating(true);
    setVisible(true);
    setProgress(25);

    // If navigation takes longer than 280ms, fade in the center luxury overlay loader
    overlayTimerRef.current = setTimeout(() => {
      if (isNavigatingRef.current) {
        setShowOverlay(true);
      }
    }, 280);

    // Smooth continuous trickle from 25% up to 88%
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return prev;
        const diff = 88 - prev;
        const step = Math.max(1, Math.round(diff * 0.15));
        return Math.min(88, prev + step);
      });
    }, 150);

    // Safeguard: auto-complete if navigation exceeds 8 seconds
    safetyTimeoutRef.current = setTimeout(() => {
      handleFinish();
    }, 8000);
  };

  // Finish navigation: called immediately when the target page has mounted in the DOM
  const handleFinish = () => {
    if (!isNavigatingRef.current) return;
    isNavigatingRef.current = false;
    clearAllTimers();

    // Fast completion surge to 100%
    setProgress(100);
    setShowOverlay(false);

    // Prompt fade out so the page is immediately interactive without delay
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setIsNavigating(false);
      setProgress(0);
    }, 80);
  };

  useEffect(() => {
    // 1. Intercept internal anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href.startsWith("#")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Ignore external domains
        if (targetUrl.origin !== currentUrl.origin) return;

        // If clicking on current page with same search params:
        // Do NOT start persistent navigation loader to avoid getting stuck!
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        // It is an actual navigation to a new page!
        handleStart();
      } catch {
        if (href.startsWith("/") && href !== window.location.pathname) {
          handleStart();
        }
      }
    };

    // 2. Intercept browser back/forward buttons
    const handlePopState = () => {
      handleStart();
    };

    // 3. Custom event listeners for explicit start / finish triggers
    const onCustomStart = () => handleStart();
    const onCustomFinish = () => handleFinish();

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("tm:navigation-start", onCustomStart);
    window.addEventListener("tm:navigation-finish", onCustomFinish);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("tm:navigation-start", onCustomStart);
      window.removeEventListener("tm:navigation-finish", onCustomFinish);
      clearAllTimers();
    };
  }, []);

  if (!isNavigating && !visible) return null;

  return (
    <>
      {/* 1. Top Radiant Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none z-[999999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="relative h-[3.5px] w-full"
          style={{
            width: `${progress}%`,
            transition:
              progress === 100
                ? "width 0.12s ease-out"
                : "width 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)",
            background:
              "linear-gradient(90deg, #DC8B20 0%, #DC8B20 35%, #d97706 75%, #f59e0b 100%)",
            boxShadow:
              "0 0 16px rgba(220, 139, 32, 0.9), 0 0 8px rgba(217, 119, 6, 0.8)",
          }}
        >
          {/* Glowing Peg at leading edge */}
          <div
            className="absolute top-0 right-0 h-full w-28 pointer-events-none"
            style={{
              boxShadow:
                "0 0 18px 5px rgba(245, 158, 11, 0.95), 0 0 8px 2px #ffffff",
              transform: "rotate(3deg) translate(0px, -4px)",
              opacity: 0.95,
            }}
          />

          {/* Shimmer light sweep */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)",
              animation: "navShimmerSweep 1.1s infinite linear",
            }}
          />
        </div>
      </div>

      {/* 2. Full-Screen Backdrop & Center Luxury Loader (Active while page loads) */}
      <div
        className="fixed inset-0 z-[999998] flex items-center justify-center pointer-events-none transition-all duration-200"
        style={{
          opacity: showOverlay && visible ? 1 : 0,
          backdropFilter: showOverlay && visible ? "blur(3px)" : "blur(0px)",
          backgroundColor: showOverlay && visible ? "rgba(255, 255, 255, 0.55)" : "transparent",
        }}
      >
        <div
          className="flex flex-col items-center gap-4 p-6 sm:px-8 sm:py-7 rounded-3xl bg-white/95 border border-[#DC8B20]/40 shadow-2xl shadow-[#DC8B20]/25 text-slate-800 transition-all duration-200"
          style={{
            transform: showOverlay && visible ? "scale(1)" : "scale(0.95)",
          }}
        >
          {/* Dual Rotating Luxury Rings with Center Emblem */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer Rotating 24K Gold Ring */}
            <div
              className="absolute inset-0 rounded-full border-[2.5px] border-transparent border-t-amber-500 border-r-amber-400 border-b-amber-600/40"
              style={{
                animation: "tmSpin 1s linear infinite",
              }}
            />
            {/* Inner Counter-Rotating Emerald Ring */}
            <div
              className="absolute inset-1.5 rounded-full border-[2px] border-transparent border-b-[#DC8B20] border-l-[#f1b343]"
              style={{
                animation: "tmSpinCounter 0.75s linear infinite",
              }}
            />
            {/* Center Monogram */}
            <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
              <span
                className="font-black text-slate-900 text-xs tracking-wider"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                TM
              </span>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-1 text-center">
            <h3
              className="font-black text-sm uppercase tracking-[0.25em] text-slate-900"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Tree Media
            </h3>
            {/* <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#DC8B20] tracking-wider">
              <span>Navigating</span>
              <span className="flex gap-0.5 text-[#DC8B20] text-sm leading-none">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </div> */}
          </div>

          {/* Micro animated progress line */}
          <div className="w-28 h-1 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200/60">
            <div
              className="h-full w-full rounded-full bg-gradient-to-r from-[#DC8B20] to-amber-500"
              style={{
                animation: "miniTrackSweep 1.2s infinite ease-in-out",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function PageNavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderCore />
    </Suspense>
  );
}
