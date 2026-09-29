"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Film,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  Building,
  Home,
  Info,
  Phone,
  Inbox,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import TreeMediaLogo from "@/components/common/TreeMediaLogo";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries & Bookings", href: "/admin/enquiries", icon: Inbox, badge: "Live" },
  { name: "Talents & Profiles", href: "/admin/profiles", icon: Users },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Portfolio & Cases", href: "/admin/portfolio", icon: Film },
  { name: "Media Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Clients & Brands", href: "/admin/clients", icon: Building },
  { name: "Homepage Editor", href: "/admin/homepage", icon: Home },
  { name: "About Page Editor", href: "/admin/about", icon: Info },
  { name: "Contact & Hours", href: "/admin/contact-info", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col justify-between select-none z-30 shadow-xs">
      {/* Top Header */}
      <div>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <Link href="/admin" className="flex items-center group">
            <TreeMediaLogo size="sm" variant="light" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/30 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#DC8B20]" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${isActive ? "bg-[#DC8B20]/20 text-[#DC8B20]" : "bg-[#DC8B20]/15 text-[#915514]"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
