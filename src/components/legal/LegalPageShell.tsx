"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  Printer,
  Share2,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Scale,
  Lock,
} from "lucide-react";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageShellProps {
  documentTitle: string;
  documentSubtitle: string;
  documentId: string;
  lastUpdated: string;
  version: string;
  activeDoc: "privacy" | "terms";
  sections: LegalSection[];
}

export default function LegalPageShell({
  documentTitle,
  documentSubtitle,
  documentId,
  lastUpdated,
  version,
  activeDoc,
  sections,
}: LegalPageShellProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          setCopiedShare(true);
          setTimeout(() => setCopiedShare(false), 2500);
        }
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white pt-8 pb-24 selection:bg-[#DC8B20] selection:text-black font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* 1. HEADER BANNER */}
        <header className="border-b border-neutral-800 pb-8 space-y-6">
          {/* Switcher Tabs Between Privacy Policy & Terms */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav
              className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800"
              aria-label="Legal Documents Navigation"
            >
              <Link
                href="/privacy-policy"
                prefetch={true}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeDoc === "privacy"
                    ? "bg-neutral-800 text-white shadow-xs border border-neutral-700 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <Shield className="w-4 h-4 text-[#DC8B20]" />
                <span>Privacy Policy</span>
              </Link>

              <Link
                href="/terms-and-conditions"
                prefetch={true}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeDoc === "terms"
                    ? "bg-neutral-800 text-white shadow-xs border border-neutral-700 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <FileText className="w-4 h-4 text-[#DC8B20]" />
                <span>Terms and Conditions</span>
              </Link>
            </nav>

            {/* Quick Actions (Print & Share) */}
            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-neutral-400" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                title="Copy Link to Clipboard"
              >
                {copiedShare ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DC8B20]" />
                    <span className="text-[#DC8B20]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC8B20]/10 border border-[#DC8B20]/30 text-[#DC8B20] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC8B20]" />
              <span>Tree Media Agency Legal Governance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {documentTitle}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
              {documentSubtitle}
            </p>

            {/* Document Metadata Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 font-medium text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>Effective Date: {lastUpdated}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 font-medium text-neutral-300">
                <FileText className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>Version {version}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 font-medium text-neutral-300">
                <Scale className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>Jurisdiction: Hyderabad, India</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 font-medium text-neutral-300">
                <Lock className="w-3.5 h-3.5 text-[#DC8B20]" />
                <span>Ref: {documentId}</span>
              </span>
            </div>
          </div>
        </header>

        {/* 2. POINT-WISE LEGAL SECTIONS (Direct, clean, no table of contents) */}
        <main className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xs hover:border-neutral-700 transition-colors space-y-4"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-3">
                <span className="text-xs font-mono font-bold text-[#DC8B20] bg-[#DC8B20]/10 border border-[#DC8B20]/30 px-2.5 py-0.5 rounded">
                  {section.number}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>

              {/* Section Content with Clean Points */}
              <div className="text-sm sm:text-base leading-relaxed text-neutral-200 space-y-3">
                {section.content}
              </div>
            </section>
          ))}
        </main>

        {/* 3. RELATED DOCUMENT CROSS-LINK CARD */}
        <section className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 print:hidden">
          <div className="space-y-1 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DC8B20]">
              Related Document
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {activeDoc === "privacy"
                ? "Terms and Conditions of Representation"
                : "Privacy & Data Protection Policy"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              {activeDoc === "privacy"
                ? "Review our terms governing website usage, talent representations, auditions, bookings, rights, and payment terms."
                : "Review how Tree Media collects, uses, protects, and stores talent materials, audition tapes, and client personal data."}
            </p>
          </div>

          <Link
            href={activeDoc === "privacy" ? "/terms-and-conditions" : "/privacy-policy"}
            prefetch={true}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#DC8B20] hover:bg-[#c47517] text-black font-bold text-xs sm:text-sm transition-colors shadow-xs shrink-0"
          >
            <span>{activeDoc === "privacy" ? "Read Terms and Conditions" : "Read Privacy Policy"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* 4. OFFICIAL CONTACT & INQUIRIES */}
        <footer className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Legal & Privacy Contact Information
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              If you have any questions, clarifications, or requests concerning this legal policy, please contact Tree Media Agency:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Registered Address */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MapPin className="w-4 h-4 text-[#DC8B20] shrink-0" />
                <span>Office Address</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.
              </p>
            </div>

            {/* Telephone */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Phone className="w-4 h-4 text-[#DC8B20] shrink-0" />
                <span>Telephone</span>
              </div>
              <p className="text-xs font-semibold text-white">
                <a href="tel:+918125524545" className="hover:text-[#DC8B20] hover:underline">
                  +91 8125524545
                </a>
              </p>
              <p className="text-[11px] text-neutral-400">Mon – Sat: 9:00 AM – 6:00 PM IST</p>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Mail className="w-4 h-4 text-[#DC8B20] shrink-0" />
                <span>Email Support</span>
              </div>
              <p className="text-xs font-semibold text-white">
                <a href="mailto:info@teensitsolutions.com" className="hover:text-[#DC8B20] hover:underline">
                  info@teensitsolutions.com
                </a>
              </p>
              <p className="text-[11px] text-neutral-400">Official written notices accepted</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header nav,
          .print\\:hidden {
            display: none !important;
          }
          section {
            border: 1px solid #e2e8f0 !important;
            background: #ffffff !important;
            page-break-inside: avoid;
            margin-bottom: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
