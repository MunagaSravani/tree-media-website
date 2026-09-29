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
  Image as ImageIcon,
  Film,
  Tag,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description?: string | null;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnailUrl?: string | null;
  tags?: string[];
  displayOrder: number;
  status: "published" | "draft" | "unpublished";
}

export default function AdminGalleryPage() {
  const [media, setMedia] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagsString, setTagsString] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery?all=true");
      const data = await res.json();
      if (data.success) {
        setMedia(data.media);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  function handleStartNew() {
    setEditingItem({
      id: "",
      title: "",
      description: "",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
      thumbnailUrl: "",
      displayOrder: media.length + 1,
      status: "published",
    });
    setTagsString("Editorial, BTS");
    setIsNew(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    try {
      const tags = tagsString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...editingItem,
        tags,
      };

      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/gallery" : `/api/gallery/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await fetchMedia();
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
    if (!confirm(`Delete media asset "${title}"?`)) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <AdminHeader
        title="Media Gallery Management"
        subtitle="Manage photo showcases, behind-the-scenes shoots, and cinematic video reels"
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">
            Total Media Assets: <strong className="text-slate-900">{media.length}</strong>
          </span>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Media Asset</span>
          </button>
        </div>

        {/* Modal Editor */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {isNew ? "Add Media Asset" : `Edit Asset: ${editingItem.title}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Asset Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Media Type *</label>
                    <select
                      value={editingItem.mediaType}
                      onChange={(e) => setEditingItem({ ...editingItem, mediaType: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                    >
                      <option value="image" className="bg-white text-slate-900">Image / Photography</option>
                      <option value="video" className="bg-white text-slate-900">Video / Showreel</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Description</label>
                  <input
                    type="text"
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                  />
                </div>

                <MediaUploader
                  label="Media URL or File Upload *"
                  value={editingItem.mediaUrl}
                  onChange={(url) => setEditingItem({ ...editingItem, mediaUrl: url })}
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="BTS, Runway, Commercial, 4K"
                    value={tagsString}
                    onChange={(e) => setTagsString(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
                  />
                </div>

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
                      <option value="published" className="bg-white text-slate-900">Published</option>
                      <option value="draft" className="bg-white text-slate-900">Draft</option>
                      <option value="unpublished" className="bg-white text-slate-900">Unpublished</option>
                    </select>
                  </div>
                </div>

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
                    className="px-6 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Asset</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
            </div>
          ) : (
            media.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                    {m.mediaType === "video" ? (
                      <video src={m.mediaUrl} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={m.mediaUrl} alt={m.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white uppercase flex items-center gap-1 shadow-xs">
                        {m.mediaType === "video" ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        <span>{m.mediaType}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                    {m.description && (
                      <p className="text-xs text-slate-600 line-clamp-2">{m.description}</p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">#{m.displayOrder}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(m);
                        setTagsString(Array.isArray(m.tags) ? m.tags.join(", ") : "");
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      title="Edit Asset"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete Asset"
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
