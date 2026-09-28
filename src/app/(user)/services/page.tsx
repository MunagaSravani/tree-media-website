"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Loader2 } from "lucide-react";
import ServiceCard from "@/components/user/ServiceCard";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import TrustedBySection from "@/components/user/TrustedBySection";

const DEFAULT_SERVICES = [
  {
    id: "srv-1",
    title: "Talent Registration & Screening",
    slug: "talent-registration",
    shortDescription: "Secure digital onboarding and screening for aspiring actors, models, dancers, and creative artists across India.",
    image: "/images/services/talent-representation.jpg",
    icon: "UserCheck",
    displayOrder: 1,
    status: "published",
  },
  {
    id: "srv-2",
    title: "Digital Talent Portfolio",
    slug: "digital-talent-portfolio",
    shortDescription: "Industry-standard dynamic talent profiles featuring lookbooks, monologues, showreels, and verified casting specs.",
    image: "/images/services/digital-portfolio.jpg",
    icon: "Sparkles",
    displayOrder: 2,
    status: "published",
  },
  {
    id: "srv-3",
    title: "Casting Calls",
    slug: "casting-calls",
    shortDescription: "Exclusive access to verified casting opportunities across feature films, OTT web series, TV serials, and digital ads.",
    image: "/images/services/casting-direction.jpg",
    icon: "Film",
    displayOrder: 3,
    status: "published",
  },
  {
    id: "srv-4",
    title: "Audition Services",
    slug: "audition-services",
    shortDescription: "Streamlined audition workflows featuring online self-tapes, studio tests, live scheduling, and real-time shortlisting updates.",
    image: "/images/services/audition-services.jpg",
    icon: "Video",
    displayOrder: 4,
    status: "published",
  },
  {
    id: "srv-5",
    title: "Production House Services",
    slug: "production-house-services",
    shortDescription: "Comprehensive B2B casting solutions for filmmakers: character-wise searches, bulk casting, regional talent, and shoot coordination.",
    image: "/images/services/production-house.jpg",
    icon: "Film",
    displayOrder: 5,
    status: "published",
  },
  {
    id: "srv-6",
    title: "Talent Management",
    slug: "talent-management",
    shortDescription: "Full-lifecycle artist representation: booking management, contract coordination, shoot schedules, and long-term career support.",
    image: "/images/services/talent-management.jpg",
    icon: "TrendingUp",
    displayOrder: 6,
    status: "published",
  },
  {
    id: "srv-7",
    title: "Premium Services",
    slug: "premium-services",
    shortDescription: "Exclusive career accelerators: studio portfolio shoots, video intros, showreel production, and verified profile badges.",
    image: "/images/services/fashion-modeling.jpg",
    icon: "Sparkles",
    displayOrder: 7,
    status: "published",
  },
];

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<any[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          setAllServices(data.services);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="relative space-y-16 py-8 min-h-screen">
      {/* 8K Studio Camera & Gaffer Gel Lighting Atmosphere */}
      <PageAtmosphere variant="services" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 text-center space-y-4">
        {/* <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-700 text-xs font-semibold uppercase tracking-widest shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Agency Solutions</span>
        </div> */}
        <h1
          data-reveal="heading"
          className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight"
        >
          Comprehensive Talent & Media Capabilities
        </h1>
        <p
          data-reveal="tagline"
          className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          From casting and artist career management to 8K commercial cinematography and international voiceover localization.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading && allServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Loading Agency Capabilities...
            </span>
          </div>
        ) : (
          <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((svc, index) => (
              <ServiceCard key={svc.id} service={svc} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Consultation Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div
          data-reveal="fade-up"
          className="group glass-panel bg-white p-12 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200"
        >
          <div className="space-y-2">
            <h3
              data-reveal="heading"
              className="text-2xl font-bold text-slate-900"
            >
              Need a Bespoke Production Package?
            </h3>
            <p
              data-reveal="tagline"
              className="text-xs text-slate-600 max-w-xl"
            >
              We tailor custom casting rosters, multi-territory brand ambassadorships, and full commercial film shoots to your production timeline.
            </p>
          </div>
          <Link
            href="/contact"
            prefetch={true}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-[1.02] shrink-0 transition-all duration-300"
          >
            Request Consultation
          </Link>
        </div>
      </section>

      {/* Trusted By Section (Smooth Horizontal Scrolling Layout) */}
      <TrustedBySection />
    </div>
  );
}
