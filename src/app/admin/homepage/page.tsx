"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import { Save, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminHomepageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImage: "",
    heroVideo: "",
    heroPrimaryBtnText: "Explore Talents",
    heroPrimaryBtnLink: "/profiles",
    heroSecondaryBtnText: "Our Services",
    heroSecondaryBtnLink: "/services",
    aboutHeading: "",
    aboutDescription: "",
    aboutImage: "",
    aboutLink: "/about",
    ctaHeading: "",
    ctaDescription: "",
    ctaBtnText: "Book a Consultation",
    ctaBtnLink: "/contact",
    ctaImage: "",
  });

  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHome() {
      try {
        const res = await fetch("/api/homepage");
        const data = await res.json();
        if (data.success) {
          if (data.settings) setSettings(data.settings);
          if (data.stats) setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHome();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, stats }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function handleStatChange(index: number, field: string, val: any) {
    setStats((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  }

  if (loading) {
    return (
      <div>
        <AdminHeader title="Homepage Editor" />
        <div className="p-16 flex flex-col items-center justify-center space-y-2">
          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          <span className="text-xs text-slate-500">Loading homepage settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Homepage Content & Section Editor"
        subtitle="Customize Hero spotlight, Statistics counter, About teaser, and CTA banner"
      />

      <div className="p-8 max-w-5xl space-y-8">
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Homepage settings and statistics updated successfully! Live website refreshed.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Hero Banner */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Hero Spotlight Section
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Main Hero Headline *</label>
                <input
                  type="text"
                  required
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Subtitle / Agency Descriptor</label>
                <input
                  type="text"
                  value={settings.heroSubtitle || ""}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Hero Intro Paragraph *</label>
                <textarea
                  rows={3}
                  required
                  value={settings.heroDescription}
                  onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MediaUploader
                  label="Hero Background Image"
                  value={settings.heroImage || ""}
                  onChange={(url) => setSettings({ ...settings, heroImage: url })}
                />
                <MediaUploader
                  label="Hero Background Video (Optional MP4)"
                  value={settings.heroVideo || ""}
                  onChange={(url) => setSettings({ ...settings, heroVideo: url })}
                />
              </div>

              <div className="grid grid-cols-4 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Primary CTA Text</label>
                  <input
                    type="text"
                    value={settings.heroPrimaryBtnText}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryBtnText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Primary CTA Link</label>
                  <input
                    type="text"
                    value={settings.heroPrimaryBtnLink}
                    onChange={(e) => setSettings({ ...settings, heroPrimaryBtnLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={settings.heroSecondaryBtnText}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryBtnText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Secondary CTA Link</label>
                  <input
                    type="text"
                    value={settings.heroSecondaryBtnLink}
                    onChange={(e) => setSettings({ ...settings, heroSecondaryBtnLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Agency Statistics */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              2. Agency Metrics & Statistics Counters
            </h3>

            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-sm font-bold text-emerald-700 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <label className="flex items-center gap-2 pt-1 text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={stat.isActive}
                      onChange={(e) => handleStatChange(idx, "isActive", e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Active</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: About Teaser */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              3. Homepage About Highlight
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">About Heading *</label>
                <input
                  type="text"
                  required
                  value={settings.aboutHeading}
                  onChange={(e) => setSettings({ ...settings, aboutHeading: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">About Narrative *</label>
                <textarea
                  rows={3}
                  required
                  value={settings.aboutDescription}
                  onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <MediaUploader
                label="About Section Visual Image"
                value={settings.aboutImage || ""}
                onChange={(url) => setSettings({ ...settings, aboutImage: url })}
              />
            </div>
          </div>

          {/* Section 4: Call To Action Banner */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              4. Bottom Conversion CTA Banner
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">CTA Heading *</label>
                  <input
                    type="text"
                    required
                    value={settings.ctaHeading}
                    onChange={(e) => setSettings({ ...settings, ctaHeading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">CTA Button Text *</label>
                  <input
                    type="text"
                    required
                    value={settings.ctaBtnText}
                    onChange={(e) => setSettings({ ...settings, ctaBtnText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">CTA Subtext *</label>
                <textarea
                  rows={2}
                  required
                  value={settings.ctaDescription}
                  onChange={(e) => setSettings({ ...settings, ctaDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <MediaUploader
                label="CTA Background Image"
                value={settings.ctaImage || ""}
                onChange={(url) => setSettings({ ...settings, ctaImage: url })}
              />
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xl">
            <span className="text-xs text-slate-500">
              Changes reflect immediately on the public User Homepage.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Homepage Updates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
