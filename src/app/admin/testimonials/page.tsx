"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { PlusCircle, Edit2, Trash2, Save, X, Loader2, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  personName: string;
  profileImage?: string | null;
  designation: string;
  company: string;
  testimonial: string;
  rating: number;
  displayOrder: number;
  status: "published" | "draft" | "unpublished";
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (data.success) {
        setItems(data.testimonials);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  function handleStartNew() {
    setEditingItem({
      id: "",
      personName: "",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      designation: "",
      company: "",
      testimonial: "",
      rating: 5,
      displayOrder: items.length + 1,
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
      const url = isNew ? "/api/testimonials" : `/api/testimonials/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (data.success) {
        await fetchTestimonials();
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

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <AdminHeader
        title="Testimonials & Client Reviews"
        subtitle="Manage endorsements and reviews from studio executives, directors, and fashion producers"
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">
            Total Reviews: <strong className="text-slate-900">{items.length}</strong>
          </span>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        </div>

        {/* Modal Editor */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl">
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {isNew ? "Create Testimonial" : `Edit Review: ${editingItem.personName}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Author Name *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.personName}
                      onChange={(e) => setEditingItem({ ...editingItem, personName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Executive Producer"
                      value={editingItem.designation}
                      onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Company / Studio *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paramount International"
                      value={editingItem.company}
                      onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Rating (1 to 5 Stars)</label>
                    <select
                      value={editingItem.rating}
                      onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value={5} className="bg-white text-slate-900">5 Stars ★★★★★</option>
                      <option value={4} className="bg-white text-slate-900">4 Stars ★★★★☆</option>
                      <option value={3} className="bg-white text-slate-900">3 Stars ★★★☆☆</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Review / Quote *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.testimonial}
                    onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                  />
                </div>

                <MediaUploader
                  label="Author Portrait Image"
                  value={editingItem.profileImage || ""}
                  onChange={(url) => setEditingItem({ ...editingItem, profileImage: url })}
                />

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
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
                    <span>Save Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          ) : (
            items.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{t.testimonial}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {t.profileImage ? (
                      <img src={t.profileImage} alt={t.personName} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-700">
                        {t.personName[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.personName}</h4>
                      <p className="text-[10px] text-slate-500">{t.designation}, {t.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingItem(t);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.personName)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
