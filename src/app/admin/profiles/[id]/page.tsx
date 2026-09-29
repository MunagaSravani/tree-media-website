"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";

export default function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Actor",
    location: "",
    gender: "Male",
    age: 25,
    height: "",
    experienceYears: 1,
    shortBio: "",
    fullBio: "",
    profileImage: "",
    skillsString: "",
    languagesString: "",
    instagram: "",
    imdb: "",
    youtube: "",
    isFeatured: false,
    status: "published",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/profiles/${id}`);
        const data = await res.json();
        if (data.success && data.profile) {
          const p = data.profile;
          setFormData({
            name: p.name || "",
            slug: p.slug || "",
            category: p.category || "Actor",
            location: p.location || "",
            gender: p.gender || "Male",
            age: p.age || 25,
            height: p.height || "",
            experienceYears: p.experienceYears || 1,
            shortBio: p.shortBio || "",
            fullBio: p.fullBio || "",
            profileImage: p.profileImage || "",
            skillsString: Array.isArray(p.skills) ? p.skills.join(", ") : "",
            languagesString: Array.isArray(p.languages) ? p.languages.join(", ") : "",
            instagram: p.socialLinks?.instagram || "",
            imdb: p.socialLinks?.imdb || "",
            youtube: p.socialLinks?.youtube || "",
            isFeatured: Boolean(p.isFeatured),
            status: p.status || "published",
          });
        } else {
          setError(data.error || "Profile not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [id]);

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

      const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      router.push("/admin/profiles");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <AdminHeader title="Edit Profile" />
        <div className="p-16 flex flex-col items-center justify-center space-y-2">
          <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
          <span className="text-xs text-slate-500">Loading talent details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <AdminHeader
        title={`Edit Profile: ${formData.name}`}
        subtitle="Modify artist information, portfolio media, and status"
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
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#DC8B20] font-mono text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
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
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
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
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Height</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Base Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Years Experience</label>
              <input
                type="number"
                min={0}
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <MediaUploader
            label="Primary Portrait Image *"
            value={formData.profileImage}
            onChange={(url) => setFormData({ ...formData, profileImage: url })}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Short Synopsis / Tagline *</label>
            <input
              type="text"
              required
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Comprehensive Biography *</label>
            <textarea
              rows={4}
              required
              value={formData.fullBio}
              onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Skills (Comma-separated)</label>
              <input
                type="text"
                value={formData.skillsString}
                onChange={(e) => setFormData({ ...formData, skillsString: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Spoken Languages (Comma-separated)</label>
              <input
                type="text"
                value={formData.languagesString}
                onChange={(e) => setFormData({ ...formData, languagesString: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Instagram</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">IMDb</label>
              <input
                type="text"
                value={formData.imdb}
                onChange={(e) => setFormData({ ...formData, imdb: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">YouTube</label>
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-slate-300 text-[#DC8B20] focus:ring-0"
                />
                <span>Feature on Agency Homepage</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Status:</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-[#DC8B20] font-semibold focus:outline-none"
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
              className="px-6 py-2.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
