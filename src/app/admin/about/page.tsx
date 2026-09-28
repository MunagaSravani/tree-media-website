"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, Loader2, CheckCircle2, Info, Plus, Trash2 } from "lucide-react";

export default function AdminAboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [content, setContent] = useState({
    introTitle: "",
    introText: "",
    storyTitle: "",
    storyText: "",
    mission: "",
    vision: "",
    experienceYears: 14,
    experienceSummary: "",
    values: [] as any[],
    achievements: [] as any[],
  });

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("/api/about");
        const data = await res.json();
        if (data.success && data.content) {
          setContent({
            ...data.content,
            values: Array.isArray(data.content.values) ? data.content.values : [],
            achievements: Array.isArray(data.content.achievements) ? data.content.achievements : [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
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

  function handleValueChange(index: number, field: string, val: string) {
    setContent((prev) => {
      const copy = [...prev.values];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, values: copy };
    });
  }

  function handleAddValue() {
    setContent((prev) => ({
      ...prev,
      values: [...prev.values, { title: "New Core Value", description: "Value description...", icon: "Shield" }],
    }));
  }

  function handleRemoveValue(index: number) {
    setContent((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  }

  function handleAchievementChange(index: number, field: string, val: string) {
    setContent((prev) => {
      const copy = [...prev.achievements];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, achievements: copy };
    });
  }

  function handleAddAchievement() {
    setContent((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { year: "2025", title: "New Milestone", description: "Milestone details..." },
      ],
    }));
  }

  function handleRemoveAchievement(index: number) {
    setContent((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  }

  if (loading) {
    return (
      <div>
        <AdminHeader title="About Page Editor" />
        <div className="p-16 flex justify-center">
          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="About Page Content Editor"
        subtitle="Manage company heritage, mission, vision, core values, and industry milestones"
      />

      <div className="p-8 max-w-5xl space-y-8">
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>About Page content updated successfully! Live website refreshed.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Intro & Story */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              1. Agency Story & Overview
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Intro Title *</label>
                  <input
                    type="text"
                    required
                    value={content.introTitle}
                    onChange={(e) => setContent({ ...content, introTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Story Title *</label>
                  <input
                    type="text"
                    required
                    value={content.storyTitle}
                    onChange={(e) => setContent({ ...content, storyTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Intro Summary Paragraph *</label>
                <textarea
                  rows={3}
                  required
                  value={content.introText}
                  onChange={(e) => setContent({ ...content, introText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Full Heritage & Lineage Text *</label>
                <textarea
                  rows={4}
                  required
                  value={content.storyText}
                  onChange={(e) => setContent({ ...content, storyText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Mission & Vision */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              2. Mission & Vision Statements
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-700">Our Mission *</label>
                <textarea
                  rows={3}
                  required
                  value={content.mission}
                  onChange={(e) => setContent({ ...content, mission: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-teal-700">Our Vision *</label>
                <textarea
                  rows={3}
                  required
                  value={content.vision}
                  onChange={(e) => setContent({ ...content, vision: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Core Values */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. Agency Core Values ({content.values.length})
              </h3>
              <button
                type="button"
                onClick={handleAddValue}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Value</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.values.map((v, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveValue(i)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">Value Title</label>
                    <input
                      type="text"
                      value={v.title}
                      onChange={(e) => handleValueChange(i, "title", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">Description</label>
                    <textarea
                      rows={2}
                      value={v.description}
                      onChange={(e) => handleValueChange(i, "description", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Milestones & Achievements */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                4. Milestones & Achievements ({content.achievements.length})
              </h3>
              <button
                type="button"
                onClick={handleAddAchievement}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.achievements.map((ach, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(i)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-500">Year</label>
                      <input
                        type="text"
                        value={ach.year}
                        onChange={(e) => handleAchievementChange(i, "year", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-emerald-700 font-bold focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] text-slate-500">Milestone Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => handleAchievementChange(i, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500">Description</label>
                    <textarea
                      rows={2}
                      value={ach.description}
                      onChange={(e) => handleAchievementChange(i, "description", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xl">
            <span className="text-xs text-slate-500">
              Updates to the About page reflect immediately on the live user site.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save About Page</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
