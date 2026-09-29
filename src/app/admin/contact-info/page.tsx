"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, Loader2, CheckCircle2, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

export default function AdminContactInfoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [contact, setContact] = useState({
    phone: "",
    email: "",
    officeAddress: "",
    workingHours: "",
    googleMapsUrl: "",
    googleMapsEmbed: "",
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
      vimeo: "",
    },
  });

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        if (data.success && data.contact) {
          setContact({
            ...data.contact,
            socialLinks: data.contact.socialLinks || {},
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
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

  if (loading) {
    return (
      <div>
        <AdminHeader title="Contact Info Editor" />
        <div className="p-16 flex justify-center">
          <Loader2 className="w-6 h-6 text-[#DC8B20] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Contact & Organization Settings"
        subtitle="Manage office headquarters, phones, emails, working hours, map embeds, and social channels"
      />

      <div className="p-8 max-w-4xl space-y-6">
        {success && (
          <div className="p-4 rounded-xl bg-[#DC8B20]/10 border border-[#DC8B20]/30 flex items-center gap-3 text-xs text-[#915514]">
            <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0" />
            <span>Contact information updated successfully! Live website refreshed.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>Primary Agency Phone *</span>
              </label>
              <input
                type="text"
                required
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>General Inquiries Email *</span>
              </label>
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#DC8B20]" />
              <span>Headquarters Physical Address *</span>
            </label>
            <input
              type="text"
              required
              value={contact.officeAddress}
              onChange={(e) => setContact({ ...contact, officeAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#DC8B20]" />
              <span>Business & Audition Hours *</span>
            </label>
            <input
              type="text"
              required
              value={contact.workingHours}
              onChange={(e) => setContact({ ...contact, workingHours: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Google Maps Direct Link</label>
              <input
                type="text"
                placeholder="https://maps.google.com/..."
                value={contact.googleMapsUrl || ""}
                onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Google Maps Embed URL</label>
              <input
                type="text"
                placeholder="https://www.google.com/maps/embed?pb=..."
                value={contact.googleMapsEmbed || ""}
                onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-2 border-t border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Agency Social Channels
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Instagram</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/..."
                  value={contact.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialLinks: { ...contact.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">LinkedIn</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/company/..."
                  value={contact.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialLinks: { ...contact.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Twitter / X</label>
                <input
                  type="text"
                  placeholder="https://twitter.com/..."
                  value={contact.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialLinks: { ...contact.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500">Vimeo</label>
                <input
                  type="text"
                  placeholder="https://vimeo.com/..."
                  value={contact.socialLinks?.vimeo || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialLinks: { ...contact.socialLinks, vimeo: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#DC8B20] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Contact Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
