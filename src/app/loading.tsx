import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden px-4">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-5 animate-fade-in-up">
        {/* Animated Gold and Emerald Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-400 animate-spin" style={{ animationDuration: "1.6s" }} />
          <div className="absolute inset-1.5 rounded-full border border-transparent border-b-emerald-600 border-l-emerald-500 animate-spin" style={{ animationDuration: "1.2s", animationDirection: "reverse" }} />
          <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
            <span
              className="font-serif font-black text-slate-900 text-sm tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              TM
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h2
            className="text-base font-bold uppercase tracking-[0.22em] text-slate-900 font-serif"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Tree Media
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium tracking-wider uppercase">
            <span>Loading</span>
            <span className="animate-pulse">...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
