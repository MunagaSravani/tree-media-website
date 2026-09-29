"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const defaultServiceId = searchParams.get("serviceId") || "";

  const [contactInfo, setContactInfo] = useState<any>(null);
  const [servicesList, setServicesList] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Representation / Talent Booking Inquiry",
    serviceId: defaultServiceId,
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch organization contact info
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.contact) setContactInfo(data.contact);
      })
      .catch(console.error);

    // Fetch services for dropdown
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services) setServicesList(data.services);
      })
      .catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject,
          message: formData.message,
          serviceId: formData.serviceId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Representation / Talent Booking Inquiry",
        serviceId: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting your message.");
    } finally {
      setSubmitting(false);
    }
  }

  const phone = contactInfo?.phone || "+91 8125524545";
  const email = contactInfo?.email || "info@teensitsolutions.com";
  const address =
    contactInfo?.officeAddress ||
    "Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.";
  const hours = contactInfo?.workingHours || "Mon – Sat: 9 am – 6 pm, Sunday: CLOSED";
  const mapEmbed =
    contactInfo?.googleMapsEmbed ||
    "https://maps.google.com/maps?q=Unit%20No%3A%20303%20B%2C%203rd%20Floor%2C%20New%20Mark%20House%2C%20Plot%20No%3A%2056%2C%20Patrika%20Nagar%2C%20Madhapur%2C%20Hyderabad%20500081&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="grid grid-cols-12 gap-12 items-start">
      {/* Contact Form */}
      <div
        data-reveal="fade-up"
        className="col-span-12 lg:col-span-7 glass-panel bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6"
      >
        <div>
          <span
            data-reveal="eyebrow"
            className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider block"
          >
            Direct Correspondence
          </span>
          <h2
            data-reveal="heading"
            className="text-2xl font-bold text-slate-900 tracking-tight mt-1"
          >
            Representation & Booking Form
          </h2>
        </div>

        {success && (
          <div className="p-5 rounded-2xl bg-[#DC8B20]/10 border border-[#DC8B20]/30 flex items-start gap-3.5 text-xs text-[#915514] animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#DC8B20] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-900 text-sm">Form Submitted Successfully</p>
              <p className="text-slate-600">
                Your inquiry has been logged in our agency database. A dedicated talent agent will review your specifications and contact you within 24 hours.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Christopher Nolan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Work Email *</label>
              <input
                type="email"
                required
                placeholder="producer@studio.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 0000000000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Inquiry Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Related Service (Optional)</label>
            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#DC8B20] focus:outline-none"
            >
              <option value="" className="bg-white text-slate-900">General Agency Consultation</option>
              {servicesList.map((s) => (
                <option key={s.id} value={s.id} className="bg-white text-slate-900">
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Production Scope & Requirements *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Include talent preferences, production dates, shoot locations, budget parameters, and character specs..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-bold text-sm shadow-md shadow-[#DC8B20]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Agency Inquiry</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Agency Information & Map */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        <div
          data-reveal="fade-up"
          data-reveal-delay="150"
          className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6"
        >
          <h3
            data-reveal="heading"
            className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2"
          >
            <span>Official info:</span>
          </h3>

          <div
            data-reveal="stagger"
            className="space-y-4 text-xs text-slate-700"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Corporate Office</span>
                <span className="text-slate-600 leading-relaxed block">{address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#DC8B20] shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Telephone</span>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-slate-600 hover:text-[#DC8B20] transition-colors font-semibold"
                >
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#DC8B20] shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Official Inquiries</span>
                <a
                  href={`mailto:${email}`}
                  className="text-slate-600 hover:text-[#DC8B20] transition-colors font-semibold"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-1 border-t border-slate-100">
              <Clock className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Open Hours:</span>
                <span className="text-slate-600 block">Mon – Sat: 9 am – 6 pm,</span>
                <span className="text-slate-500 font-medium block">Sunday: CLOSED</span>
              </div>
            </div>
          </div>

          {/* Social channels */}
          <div
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="pt-4 border-t border-slate-100 flex items-center gap-3"
          >
            <a
              href={contactInfo?.socialLinks?.instagram || "https://instagram.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-pink-600 border border-slate-200 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={contactInfo?.socialLinks?.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={contactInfo?.socialLinks?.twitter || "https://twitter.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-cyan-600 border border-slate-200 transition-colors"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div
          data-reveal="fade-up"
          data-reveal-delay="250"
          className="rounded-3xl overflow-hidden glass-panel bg-white border border-slate-200 aspect-[4/3] shadow-md"
        >
          <iframe
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tree Media Location"
          />
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative space-y-16 py-12 max-w-7xl mx-auto px-6 min-h-screen">
      {/* VIP Green Room & Beverly Hills Headquarters Atmosphere */}
      <PageAtmosphere variant="contact" />

      <section className="relative text-center py-4 lg:py-8">
        <div className="relative z-10 space-y-4">
          <h1
            data-reveal="heading"
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight"
          >
            Connect With Tree Media Agency
          </h1>
          <p
            data-reveal="tagline"
            className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Submit talent representation inquiries, request custom casting portfolios, or schedule a consultation with our executive team.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-24 text-center text-xs text-slate-500">Loading form...</div>}>
        <ContactFormContent />
      </Suspense>
    </div>
  );
}
