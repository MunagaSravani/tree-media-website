import React from "react";

export default function AdminLoading() {
  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      {/* Top Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-lg bg-slate-200/80 animate-pulse" />
          <div className="h-4 w-72 rounded-lg bg-slate-200/50 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#DC8B20] animate-spin" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Loading...
          </span>
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100" />
            <div className="h-3 w-1/2 rounded-full bg-slate-200" />
            <div className="h-6 w-1/3 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Main Content Table/Panel Skeleton */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="h-5 w-40 rounded-lg bg-slate-200 animate-pulse" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center px-4 justify-between animate-pulse"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className="h-3 w-1/4 rounded-full bg-slate-200" />
              <div className="h-3 w-1/6 rounded-full bg-slate-200" />
              <div className="h-3 w-1/12 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
