"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Loader2,
  Briefcase,
  ExternalLink,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedContent: string;
  image?: string | null;
  icon?: string | null;
  displayOrder: number;
  status: "published" | "draft" | "unpublished";
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/services?all=true");
      const data = await res.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function handleStartNew() {
    setEditingItem({
      id: "",
      title: "",
      slug: "",
      shortDescription: "",
      detailedContent: "",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
      icon: "Sparkles",
      displayOrder: services.length + 1,
      status: "published",
    });
    setIsNew(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/services" : `/api/services/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (data.success) {
        await fetchServices();
        setEditingItem(null);
        setIsNew(false);
      } else {
        alert(data.error || "Save failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title="Services Catalog Management"
        subtitle="Configure agency representation, casting, modeling, and audio production offerings"
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="flex items-center justify-between glass-panel bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">
            Total Services: <strong className="text-slate-900">{services.length}</strong>
          </span>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Modal Editor */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {isNew ? "Create New Service" : `Edit Service: ${editingItem.title}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                        setEditingItem({ ...editingItem, title, slug: isNew ? slug : editingItem.slug });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Slug *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.slug}
                      onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#DC8B20] font-mono text-sm focus:border-[#DC8B20] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Short Summary *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.shortDescription}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Comprehensive Scope *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.detailedContent}
                    onChange={(e) => setEditingItem({ ...editingItem, detailedContent: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none resize-none"
                  />
                </div>

                <MediaUploader
                  label="Service Cover Image"
                  value={editingItem.image || ""}
                  onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Display Order</label>
                    <input
                      type="number"
                      value={editingItem.displayOrder}
                      onChange={(e) => setEditingItem({ ...editingItem, displayOrder: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Status</label>
                    <select
                      value={editingItem.status}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="unpublished">Unpublished</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#DC8B20]/25 cursor-pointer"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Service</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services List Grid */}
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
            </div>
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                className="glass-panel bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="h-40 relative bg-slate-100 overflow-hidden">
                    {s.image ? (
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Briefcase className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          s.status === "published"
                            ? "bg-[#DC8B20]/10 text-[#DC8B20] border-[#DC8B20]/30"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {s.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Order: #{s.displayOrder}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(s);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id, s.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
