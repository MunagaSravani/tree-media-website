"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { PlusCircle, Edit2, Trash2, Save, X, Loader2, Building } from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  logoUrl: string;
  description?: string | null;
  displayOrder: number;
  status: "published" | "draft" | "unpublished";
}

export default function AdminClientsPage() {
  const [items, setItems] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ClientItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchClients() {
    setLoading(true);
    try {
      const res = await fetch("/api/clients?all=true");
      const data = await res.json();
      if (data.success) {
        setItems(data.clients);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  function handleStartNew() {
    setEditingItem({
      id: "",
      name: "",
      logoUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=300&auto=format&fit=crop",
      description: "",
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
      const url = isNew ? "/api/clients" : `/api/clients/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (data.success) {
        await fetchClients();
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
    if (!confirm(`Delete client "${name}"?`)) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <AdminHeader
        title="Clients & Brand Partners"
        subtitle="Manage studio partners, luxury fashion houses, and advertising clients"
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">
            Total Partners: <strong className="text-slate-900">{items.length}</strong>
          </span>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Brand Partner</span>
          </button>
        </div>

        {/* Modal Editor */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl">
              <button
                onClick={() => setEditingItem(null)}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-slate-900 mb-4">
                {isNew ? "Add Brand Partner" : `Edit Partner: ${editingItem.name}`}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Partner / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Partnership Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Details about collaborations, feature productions, or campaign history..."
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                  />
                </div>

                <MediaUploader
                  label="Logo / Brand Mark Image *"
                  value={editingItem.logoUrl}
                  onChange={(url) => setEditingItem({ ...editingItem, logoUrl: url })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Display Order</label>
                    <input
                      type="number"
                      value={editingItem.displayOrder}
                      onChange={(e) => setEditingItem({ ...editingItem, displayOrder: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Status</label>
                    <select
                      value={editingItem.status}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
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
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Partner</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 py-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          ) : (
            items.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="h-24 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-3">
                    <img src={c.logoUrl} alt={c.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                    {c.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{c.description}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-emerald-700 font-mono font-medium">#{c.displayOrder}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingItem(c);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
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
