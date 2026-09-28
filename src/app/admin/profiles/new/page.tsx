"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";

export default function NewProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Actor",
    location: "Los Angeles, CA",
    gender: "Male",
    age: 28,
    height: "5'11\" (180 cm)",
    experienceYears: 5,
    shortBio: "",
    fullBio: "",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    skillsString: "Method Acting, Screenplay Analysis, Stage Combat",
    languagesString: "English, French",
    instagram: "",
    imdb: "",
    youtube: "",
    isFeatured: false,
    status: "published",
  });

  function handleNameChange(name: string) {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, name, slug }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const skills = formData.skillsString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const languages = formData.languagesString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        location: formData.location,
        gender: formData.gender,
        age: Number(formData.age),
        height: formData.height,
        experienceYears: Number(formData.experienceYears),
        shortBio: formData.shortBio,
        fullBio: formData.fullBio,
        profileImage: formData.profileImage,
        skills,
        languages,
        socialLinks: {
          instagram: formData.instagram || undefined,
          imdb: formData.imdb || undefined,
          youtube: formData.youtube || undefined,
        },
        isFeatured: formData.isFeatured,
        status: formData.status,
      };

      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create talent profile");
      }

      router.push("/admin/profiles");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title="Add New Talent Profile"
        subtitle="Create a new actor, model, voice artist, or director entry in the agency roster"
      />

      <div className="p-8 max-w-4xl space-y-6">
        <Link
          href="/admin/profiles"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Profiles List</span>
        </Link>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 glass-panel bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          {/* Basic Identification */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Christian Bale"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-emerald-700 font-mono text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
              >
                <option value="Actor">Actor</option>
                <option value="Model">Model</option>
                <option value="Voice Artist">Voice Artist</option>
                <option value="Director">Director</option>
                <option value="Musician">Musician</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Age *</label>
              <input
                type="number"
                min={1}
                max={120}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Height</label>
              <input
                type="text"
                placeholder={'6\'0" (183 cm)'}
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Base Location *</label>
              <input
                type="text"
                placeholder="e.g. London, UK / New York, NY"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Years of Experience</label>
              <input
                type="number"
                min={0}
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Media Uploader */}
          <MediaUploader
            label="Primary Portrait Image *"
            value={formData.profileImage}
            onChange={(url) => setFormData({ ...formData, profileImage: url })}
            helperText="High-resolution headshot or editorial photo (aspect ratio 3:4 recommended)."
          />

          {/* Bios */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Short Synopsis / Tagline *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dramatic lead actor recognized for intense psychological thrillers."
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Comprehensive Biography *</label>
            <textarea
              rows={4}
              required
              placeholder="Classically trained background, career highlights, prestigious projects, accolades..."
              value={formData.fullBio}
              onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none resize-none"
            />
          </div>

          {/* Skills and Languages */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Skills (Comma-separated)</label>
              <input
                type="text"
                placeholder="Method Acting, Stage Combat, Stunts"
                value={formData.skillsString}
                onChange={(e) => setFormData({ ...formData, skillsString: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Spoken Languages (Comma-separated)</label>
              <input
                type="text"
                placeholder="English, French, German"
                value={formData.languagesString}
                onChange={(e) => setFormData({ ...formData, languagesString: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Instagram URL</label>
              <input
                type="text"
                placeholder="https://instagram.com/..."
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">IMDb URL</label>
              <input
                type="text"
                placeholder="https://imdb.com/name/..."
                value={formData.imdb}
                onChange={(e) => setFormData({ ...formData, imdb: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">YouTube / Reel URL</label>
              <input
                type="text"
                placeholder="https://youtube.com/..."
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Publishing and Features */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-0"
                />
                <span>Feature on Agency Homepage</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Status:</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-emerald-700 font-semibold focus:outline-none"
                >
                  <option value="published">Published (Live)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="unpublished">Unpublished (Archived)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Publish Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
