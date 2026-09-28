"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  PlusCircle,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  Film,
  Building2,
  Calendar,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  clientName: string;
  completionDate: string;
  coverImage: string;
  caseStudy?: string | null;
  isFeatured: boolean;
  status: "published" | "draft" | "unpublished";
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio?all=true");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function handleStartNew() {
    setEditingItem({
      id: "",
      title: "",
      slug: "",
      category: "Feature Film",
      description: "",
      clientName: "",
      completionDate: "2025",
      coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      caseStudy: "",
      isFeatured: false,
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
      const url = isNew ? "/api/portfolio" : `/api/portfolio/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (data.success) {
        await fetchProjects();
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
    if (!confirm(`Delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <AdminHeader
        title="Portfolio & Production Showcase"
        subtitle="Manage agency film, commercial, fashion, and documentary productions"
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">
            Total Projects: <strong className="text-slate-900">{projects.length}</strong>
          </span>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Modal Editor */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {isNew ? "Create New Project" : `Edit Project: ${editingItem.title}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                        setEditingItem({ ...editingItem, title, slug: isNew ? slug : editingItem.slug });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Slug *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.slug}
                      onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-700 font-mono text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Category *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Feature Film, Commercial"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Client / Studio *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. StudioCanal"
                      value={editingItem.clientName}
                      onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Release Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Fall 2024"
                      value={editingItem.completionDate}
                      onChange={(e) => setEditingItem({ ...editingItem, completionDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Short Synopsis *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Case Study Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe Tree Media's casting, management, and production contributions..."
                    value={editingItem.caseStudy || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, caseStudy: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                  />
                </div>

                <MediaUploader
                  label="Cover Image *"
                  value={editingItem.coverImage}
                  onChange={(url) => setEditingItem({ ...editingItem, coverImage: url })}
                />

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={editingItem.isFeatured}
                        onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Feature on Homepage</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Status:</span>
                      <select
                        value={editingItem.status}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-emerald-700 font-semibold focus:outline-none"
                      >
                        <option value="published" className="bg-white text-slate-900">Published</option>
                        <option value="draft" className="bg-white text-slate-900">Draft</option>
                        <option value="unpublished" className="bg-white text-slate-900">Unpublished</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Project</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          ) : (
            projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-video relative bg-slate-100 overflow-hidden">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {p.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Featured
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white capitalize shadow-xs">
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-4 text-xs text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        {p.clientName}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {p.completionDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{p.category}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(p);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Project"
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
