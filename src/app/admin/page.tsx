import { db } from "@/db";
import {
  profiles,
  services,
  projects,
  enquiries,
  galleryMedia,
  testimonials,
  clients,
} from "@/db/schema";
import { sql, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Users,
  Briefcase,
  Film,
  Inbox,
  Image as ImageIcon,
  MessageSquare,
  Building,
  PlusCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch counts and recent items
  const [totalProfilesRes] = await db.select({ count: sql<number>`count(*)` }).from(profiles);
  const [publishedProfilesRes] = await db
    .select({ count: sql<number>`count(*)` })
    .from(profiles)
    .where(eq(profiles.status, "published"));

  const [totalServicesRes] = await db.select({ count: sql<number>`count(*)` }).from(services);
  const [totalProjectsRes] = await db.select({ count: sql<number>`count(*)` }).from(projects);
  const [totalEnquiriesRes] = await db.select({ count: sql<number>`count(*)` }).from(enquiries);
  const [newEnquiriesRes] = await db
    .select({ count: sql<number>`count(*)` })
    .from(enquiries)
    .where(eq(enquiries.status, "new"));

  const [totalMediaRes] = await db.select({ count: sql<number>`count(*)` }).from(galleryMedia);
  const [totalTestimonialsRes] = await db.select({ count: sql<number>`count(*)` }).from(testimonials);
  const [totalClientsRes] = await db.select({ count: sql<number>`count(*)` }).from(clients);

  const recentEnquiries = await db
    .select()
    .from(enquiries)
    .orderBy(desc(enquiries.createdAt))
    .limit(5);

  const recentProfiles = await db
    .select()
    .from(profiles)
    .orderBy(desc(profiles.createdAt))
    .limit(4);

  const statsCards = [
    {
      title: "Total Talents",
      value: Number(totalProfilesRes?.count || 0),
      subtitle: `${publishedProfilesRes?.count || 0} published`,
      icon: Users,
      href: "/admin/profiles",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Active Inquiries",
      value: Number(totalEnquiriesRes?.count || 0),
      subtitle: `${newEnquiriesRes?.count || 0} awaiting review`,
      icon: Inbox,
      href: "/admin/enquiries",
      color: "text-cyan-700 bg-cyan-50 border-cyan-200",
    },
    {
      title: "Portfolio Cases",
      value: Number(totalProjectsRes?.count || 0),
      subtitle: "Commercial & cinema works",
      icon: Film,
      href: "/admin/portfolio",
      color: "text-purple-700 bg-purple-50 border-purple-200",
    },
    {
      title: "Services Catalog",
      value: Number(totalServicesRes?.count || 0),
      subtitle: "Core agency offerings",
      icon: Briefcase,
      href: "/admin/services",
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title="Executive Control Center"
        subtitle="Tree Media Agency Content & Representation Hub"
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-4 gap-5">
          {statsCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="glass-panel bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                  <div className={`p-2 rounded-xl border ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{card.subtitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Action Buttons */}
        <div className="glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">Quick Operations</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Live PostgreSQL Database</span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <Link
              href="/admin/profiles/new"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Add New Talent</span>
            </Link>

            <Link
              href="/admin/services"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Manage Services</span>
            </Link>

            <Link
              href="/admin/portfolio"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Film className="w-4 h-4 text-purple-600" />
              <span>Manage Portfolio</span>
            </Link>

            <Link
              href="/admin/homepage"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Homepage Editor</span>
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Inbox className="w-4 h-4 text-emerald-600" />
              <span>Inquiry Inbox</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Content: Recent Inquiries & Recent Talents */}
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Inquiries Inbox */}
          <div className="col-span-7 glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Client Inquiries</h3>
                <p className="text-xs text-slate-500">Direct booking and consultation requests</p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View All ({Number(totalEnquiriesRes?.count || 0)})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentEnquiries.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No inquiries received yet</div>
              ) : (
                recentEnquiries.map((enq) => {
                  const statusColors: Record<string, string> = {
                    new: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    in_progress: "bg-amber-50 text-amber-800 border-amber-200",
                    completed: "bg-blue-50 text-blue-700 border-blue-200",
                    closed: "bg-slate-100 text-slate-600 border-slate-200",
                  };
                  return (
                    <Link
                      key={enq.id}
                      href="/admin/enquiries"
                      className="block p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">{enq.name}</span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                            statusColors[enq.status] || statusColors.new
                          }`}
                        >
                          {enq.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-emerald-700 truncate">{enq.subject}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-1">{enq.message}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-200/60">
                        <span>{enq.email}</span>
                        <span>{formatDate(enq.createdAt)}</span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Profiles Showcase */}
          <div className="col-span-5 glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Talent Roster Roster</h3>
                <p className="text-xs text-slate-500">Recently updated artists & actors</p>
              </div>
              <Link
                href="/admin/profiles"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Manage ({Number(totalProfilesRes?.count || 0)})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentProfiles.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.profileImage}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[10px] text-emerald-700 font-medium">{p.category} • {p.location}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                      p.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/admin/profiles/new"
                className="w-full py-2.5 rounded-xl border border-dashed border-emerald-400 hover:bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Another Artist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
