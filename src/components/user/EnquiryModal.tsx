"use client";

import { useState } from "react";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProfileId?: string;
  defaultProfileName?: string;
  defaultServiceId?: string;
  defaultServiceTitle?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultProfileId,
  defaultProfileName,
  defaultServiceId,
  defaultServiceTitle,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultProfileName
      ? `Booking Inquiry: ${defaultProfileName}`
      : defaultServiceTitle
      ? `Service Inquiry: ${defaultServiceTitle}`
      : "General Agency Consultation",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileId: defaultProfileId || null,
          serviceId: defaultServiceId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSuccess(false);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl p-8 border border-slate-200 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#DC8B20]/10 text-[#DC8B20] flex items-center justify-center mx-auto border border-[#DC8B20]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Form Submitted Successfully</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to Tree Media Agency. Your inquiry has been forwarded to our talent management team, and an agent will follow up within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-semibold text-sm shadow-md shadow-[#DC8B20]/25 transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider">
                Direct Agency Booking
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {defaultProfileName ? `Book ${defaultProfileName}` : "Submit Representation Inquiry"}
              </h2>
              {defaultProfileName && (
                <p className="text-xs text-slate-500 mt-1">
                  Connect with the management team of {defaultProfileName} for auditions, brand partnerships, and productions.
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Christopher Nolan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@production.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Project Details & Requirements *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your production timeline, shooting location, budget range, and creative scope..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-[#DC8B20]/25 flex items-center gap-2 transition-all"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Send Booking Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
