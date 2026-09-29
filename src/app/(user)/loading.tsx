import React from "react";

export default function UserLoading() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#DC8B20]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Emblem & Status Card */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md w-full animate-fade-in-up">
        {/* Animated Gold Ring & Monogram Aura */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/30 via-[#DC8B20]/20 to-amber-300/30 blur-md animate-pulse" />

          {/* Rotating Outer 24K Gold Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-400 border-b-amber-600/40 animate-spin" style={{ animationDuration: "2s" }} />

          {/* Rotating Inner Emerald Ring (Counter) */}
          <div className="absolute inset-2 rounded-full border border-transparent border-t-[#DC8B20] border-l-[#f1b343] animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />

          {/* Center Monogram Emblem */}
          <div className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center">
            <span
              className="font-black text-slate-900 text-lg tracking-wider"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              TM
            </span>
          </div>
        </div>

        {/* Brand Title & Shimmering Indicator */}
        <div className="space-y-2">
          <h2
            className="text-xl font-bold uppercase tracking-[0.25em] text-slate-900"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Tree Media
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC8B20] animate-ping" />
            <p className="text-xs uppercase font-semibold tracking-widest text-[#DC8B20]">
              Loading Experience
            </p>
          </div>
        </div>

        {/* Elegant Skeleton Preview Cards */}
        <div className="w-full pt-4 space-y-3">
          {/* Skeleton Hero Shimmer */}
          <div className="h-4 w-3/4 mx-auto rounded-full bg-slate-200/70 animate-pulse" />
          <div className="h-3 w-1/2 mx-auto rounded-full bg-slate-200/50 animate-pulse" />

          <div className="grid grid-cols-3 gap-3 pt-4 w-full">
            <div className="h-20 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex flex-col p-3 space-y-2 animate-pulse">
              <div className="w-7 h-7 rounded-lg bg-[#DC8B20]/15" />
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
            </div>
            <div className="h-20 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex flex-col p-3 space-y-2 animate-pulse" style={{ animationDelay: "150ms" }}>
              <div className="w-7 h-7 rounded-lg bg-amber-100/60" />
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
            </div>
            <div className="h-20 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex flex-col p-3 space-y-2 animate-pulse" style={{ animationDelay: "300ms" }}>
              <div className="w-7 h-7 rounded-lg bg-teal-100/60" />
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
