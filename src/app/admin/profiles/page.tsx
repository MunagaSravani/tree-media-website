"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  PlusCircle,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Star,
} from "lucide-react";

interface ProfileItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  gender: string;
  age: number;
  height?: string | null;
  profileImage: string;
  isFeatured: boolean;
  status: "published" | "draft" | "unpublished";
  skills?: string[];
  createdAt: string;
}

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<ProfileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");

  async function fetchProfiles() {
    setLoading(true);
    try {
      const res = await fetch("/api/profiles?all=true");
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function handleToggleStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === "published" ? "unpublished" : "published";
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profiles.find((p) => p.id === id),
          status: nextStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: nextStatus as any } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete profile "${name}"?`)) return;
    try {
      const res = await fetch(`/api/profiles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProfiles((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = profiles.filter((p) => {
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title="Talent & Artist Roster"
        subtitle="Manage represented actors, models, voice talents, and directors"
      />

      <div className="p-8 max-w-7xl space-y-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-4 glass-panel bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search talent..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-700 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Actor">Actors</option>
              <option value="Model">Models</option>
              <option value="Voice Artist">Voice Artists</option>
              <option value="Director">Directors</option>
              <option value="Musician">Musicians</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* <Link
            href="/admin/profiles/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Talent</span>
          </Link> */}
        </div>

        {/* Data Table */}
        <div className="glass-panel bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
              <span className="text-xs text-slate-500">Loading talent roster...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No talent profiles found matching your criteria.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="py-3 px-6">Talent</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Specs</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.profileImage}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{p.name}</span>
                            {p.isFeatured && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">{p.category}</td>
                    <td className="py-3.5 px-4 text-slate-500">{p.location}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {p.age} yrs {p.height ? `• ${p.height}` : ""}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                          p.status === "published"
                            ? "bg-[#DC8B20]/10 text-[#DC8B20] border-[#DC8B20]/30 hover:bg-[#DC8B20]/15"
                            : p.status === "draft"
                            ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {p.status === "published" ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span className="capitalize">{p.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/profiles/${p.slug || p.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#DC8B20] hover:bg-slate-100 transition-colors"
                          title="View on Public Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/profiles/${p.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="Edit Profile"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
