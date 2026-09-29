"use client";

import { useEffect, useState } from "react";
import { Shield, UserCircle, Bell } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [adminEmail, setAdminEmail] = useState("admin@treemedia.agency");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.admin) {
          setAdminEmail(data.admin.email);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-20 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-[#DC8B20] animate-pulse" />
          <UserCircle className="w-4 h-4 text-[#DC8B20]" />
          <span className="text-xs text-slate-700 font-medium">{adminEmail}</span>
        </div>
      </div>
    </header>
  );
}
