"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileCard from "@/components/user/ProfileCard";
import ProjectCard from "@/components/user/ProjectCard";
import ServiceCard from "@/components/user/ServiceCard";
import HomeSlider from "@/components/user/HomeSlider";
import SearchAuditionsSection from "@/components/user/SearchAuditionsSection";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import TrustedBySection from "@/components/user/TrustedBySection";
import LiveStatsCounter from "@/components/user/LiveStatsCounter";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Star,
  ChevronRight,
  Loader2,
} from "lucide-react";

const FALLBACK_PROJECTS = [
  {
    id: "8b175356-45c3-43b9-a621-dce975fcab90",
    title: "Midnight Echoes — Indie Short Drama",
    slug: "midnight-echoes-indie-short",
    category: "Short Film Casting",
    description: "Lead actor auditions, cast selection, and on-set talent coordination for an award-nominated independent festival drama short.",
    clientName: "Lumina Indie Motion Pictures",
    completionDate: "Recent Festival Debut",
    coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "036855d8-4f35-4aef-b153-2d4a4761c934",
    title: "Aura Atelier — Lookbook & Digital Campaign",
    slug: "aura-atelier-lookbook-campaign",
    category: "Fashion & Commercial",
    description: "Editorial model scouting, test shoot direction, and talent casting for an emerging designer's digital runway lookbook and video launch.",
    clientName: "Atelier Veda / Urban Muse",
    completionDate: "Autumn Showcase",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "7d79884c-f25e-441b-b57e-fabb7ad872f3",
    title: "City Lights Pulse — Artist Music Video",
    slug: "city-lights-pulse-music-video",
    category: "Music Video Casting",
    description: "Featured performer auditions, background dancer casting, and stage coordination for an independent singer-songwriter's breakout release.",
    clientName: "SoundWave Indie Records",
    completionDate: "Summer Debut",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
  },
];

const FALLBACK_STATS = [
  { id: "stat-1", label: "Represented Artists", value: "350+" },
  { id: "stat-2", label: "Commercial Campaigns", value: "45+" },
  { id: "stat-3", label: "Theatrical Releases", value: "18+" },
  { id: "stat-4", label: "Audition Callbacks", value: "99.4%" },
];

export default function HomeClientView() {
  const [settings, setSettings] = useState<any>(null);
  const [stats, setStats] = useState<any[]>(FALLBACK_STATS);
  const [activeServices, setActiveServices] = useState<any[]>([]);
  const [featuredProfiles, setFeaturedProfiles] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingTalents, setLoadingTalents] = useState(true);
  const [recentProductions, setRecentProductions] = useState<any[]>(FALLBACK_PROJECTS);
  const [clientReviews, setClientReviews] = useState<any[]>([]);
  const [, setBrandClients] = useState<any[]>([]);

  useEffect(() => {
    async function loadAllHomeData() {
      try {
        // Trigger all homepage APIs so they appear in Network tab (Fetch/XHR)
        const [
          homepageRes,
          servicesRes,
          profilesRes,
          portfolioRes,
          testimonialsRes,
          clientsRes,
        ] = await Promise.all([
          fetch("/api/homepage").catch(() => null),
          fetch("/api/services").catch(() => null),
          fetch("/api/profiles").catch(() => null),
          fetch("/api/portfolio").catch(() => null),
          fetch("/api/testimonials").catch(() => null),
          fetch("/api/clients").catch(() => null),
        ]);

        if (homepageRes && homepageRes.ok) {
          const homeData = await homepageRes.json();
          if (homeData.success) {
            if (homeData.settings) setSettings(homeData.settings);
            if (Array.isArray(homeData.stats) && homeData.stats.length > 0) {
              setStats(homeData.stats);
            }
          }
        }

        if (servicesRes && servicesRes.ok) {
          const sData = await servicesRes.json();
          if (sData.success && Array.isArray(sData.services)) {
            setActiveServices(sData.services.slice(0, 3));
          }
        }
        setLoadingServices(false);

        if (profilesRes && profilesRes.ok) {
          const pData = await profilesRes.json();
          if (pData.success && Array.isArray(pData.profiles)) {
            const sorted = [...pData.profiles].sort((a: any, b: any) => {
              if (a.isFeatured && !b.isFeatured) return -1;
              if (!a.isFeatured && b.isFeatured) return 1;
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setFeaturedProfiles(sorted.slice(0, 3));
          }
        }
        setLoadingTalents(false);

        if (portfolioRes && portfolioRes.ok) {
          const portData = await portfolioRes.json();
          if (portData.success && Array.isArray(portData.projects) && portData.projects.length > 0) {
            setRecentProductions(portData.projects.slice(0, 3));
          }
        }

        if (testimonialsRes && testimonialsRes.ok) {
          const tData = await testimonialsRes.json();
          if (tData.success && Array.isArray(tData.testimonials)) {
            setClientReviews(tData.testimonials.slice(0, 3));
          }
        }

        if (clientsRes && clientsRes.ok) {
          const cData = await clientsRes.json();
          if (cData.success && Array.isArray(cData.clients)) {
            setBrandClients(cData.clients.slice(0, 6));
          }
        }
      } catch (err) {
        console.error("Failed to load homepage data via APIs:", err);
      } finally {
        setLoadingServices(false);
        setLoadingTalents(false);
      }
    }

    loadAllHomeData();
  }, []);

  return (
    <div className="relative space-y-24 pb-24 min-h-screen">
      {/* Bespoke Cinematic Soundstage Background Atmosphere */}
      <PageAtmosphere variant="home" />

      {/* 1. MAIN IMAGE SLIDER (Directly below Navbar) */}
      <HomeSlider />

      {/* 2. LIVE STATISTICS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <LiveStatsCounter stats={stats} />
      </section>

      {/* 3. ABOUT HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div
              data-reveal="eyebrow"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider"
            >
              <span>About Tree Media</span>
            </div>

            <h2
              data-reveal="heading"
              className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug"
            >
              {settings?.aboutHeading || "Where Artistic Vision Meets Industry Power"}
            </h2>

            <p
              data-reveal="tagline"
              className="text-sm lg:text-base text-slate-600 leading-relaxed"
            >
              {settings?.aboutDescription ||
                "Founded on the philosophy of relentless artistic excellence, Tree Media bridges the gap between emerging creative forces and high-stakes media productions."}
            </p>

            <div
              data-reveal="stagger"
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <h4 className="text-slate-900 text-sm font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Elite Roster</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Classically trained thespians, internationally published models, and award-winning directors.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <h4 className="text-slate-900 text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span>Strategic Reach</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct connections to major casting suites and production studios across four continents.
                </p>
              </div>
            </div>

            <div data-reveal="fade-up" data-reveal-delay="250" className="pt-2">
              <Link
                href="/about"
                prefetch={true}
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
              >
                <span>Discover Our Complete Heritage & Story</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel bg-white border border-slate-200 aspect-[4/3] shadow-xl">
              <img
                src={
                  settings?.aboutImage ||
                  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"
                }
                alt="About Tree Media"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Beverly Hills Headquarters</span>
                    <span className="text-[11px] text-slate-500">Audition Studios & Production Suites</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Global Agency
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex items-end justify-between">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block"
            >
              What We Do
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl font-bold text-slate-900 tracking-tight mt-1"
            >
              End-to-End Representation & Production
            </h2>
          </div>
        </div>

        {loadingServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative rounded-3xl overflow-hidden bg-white/70 border border-slate-200/80 p-8 flex flex-col justify-between space-y-6 min-h-[300px] animate-pulse shadow-xs"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-200/80 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-emerald-600/70 animate-spin" />
                  </div>
                  <div className="h-6 w-3/4 rounded-lg bg-slate-200/80" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3.5 w-full rounded-md bg-slate-200/60" />
                    <div className="h-3.5 w-5/6 rounded-md bg-slate-200/60" />
                    <div className="h-3.5 w-4/6 rounded-md bg-slate-200/60" />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-4 w-28 rounded-md bg-slate-200/70" />
                  <div className="w-7 h-7 rounded-lg bg-slate-200/70" />
                </div>
              </div>
            ))}
          </div>
        ) : activeServices.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-slate-200 p-8 shadow-xs">
            <p className="text-sm text-slate-500">No services currently published.</p>
          </div>
        ) : (
          <div
            data-reveal="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activeServices.slice(0, 3).map((svc, index) => (
              <ServiceCard key={svc.id} service={svc} index={index} />
            ))}
          </div>
        )}

        {/* View All Services Button below cards */}
        <div data-reveal="fade-up" className="flex items-center justify-center pt-2">
          <Link
            href="/services"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 5. FEATURED TALENT ROSTER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex items-end justify-between">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block"
            >
              Represented Artists
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl font-bold text-slate-900 tracking-tight mt-1"
            >
              Featured Agency Talents
            </h2>
          </div>
        </div>

        {loadingTalents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 flex flex-col justify-between min-h-[460px] animate-pulse shadow-xs"
              >
                <div className="relative h-[285px] bg-slate-900/90 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Loading Artist...
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white/80">
                  <div className="space-y-2">
                    <div className="h-5 w-1/2 rounded-md bg-slate-200/80" />
                    <div className="h-3.5 w-full rounded-md bg-slate-200/60" />
                    <div className="h-3.5 w-4/5 rounded-md bg-slate-200/60" />
                  </div>
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex gap-2">
                      <div className="h-5 w-16 rounded-md bg-slate-200/70" />
                      <div className="h-5 w-20 rounded-md bg-slate-200/70" />
                    </div>
                    <div className="h-10 w-full rounded-xl bg-slate-200/80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredProfiles.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-slate-200 p-8 shadow-xs">
            <p className="text-sm text-slate-500">No talents currently featured.</p>
          </div>
        ) : (
          <div
            data-reveal="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          >
            {featuredProfiles.slice(0, 3).map((p) => (
              <ProfileCard key={p.id} profile={p} isHome={true} />
            ))}
          </div>
        )}

        {/* View All Talents Button below cards */}
        <div data-reveal="fade-up" className="flex items-center justify-center pt-2">
          <Link
            href="/profiles"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            <span>View All Talents</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 6. PROMINENT SEARCH AUDITIONS SECTION (Top 3 with View All Navigation) */}
      <SearchAuditionsSection isHome={true} />

      {/* 7. SELECTED PRODUCTIONS & PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span
            data-reveal="eyebrow"
            className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block"
          >
            Early Works & Production Highlights
          </span>
          <h2
            data-reveal="heading"
            className="text-3xl font-bold text-slate-900 tracking-tight"
          >
            Recent Media & Productions
          </h2>
          <p
            data-reveal="tagline"
            className="text-xs sm:text-sm text-slate-500"
          >
            Curated casting and talent coordination projects delivered by Tree Media across indie cinema, fashion lookbooks, and artist productions.
          </p>
        </div>

        {/* Display existing cards in a responsive grid */}
        <div
          data-reveal="stagger"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {recentProductions.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={idx}
            />
          ))}
        </div>

        {/* View All Work Button below cards */}
        <div data-reveal="fade-up" className="flex items-center justify-center pt-2">
          <Link
            href="/portfolio"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            <span>View All Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span
            data-reveal="eyebrow"
            className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block"
          >
            Industry Endorsements
          </span>
          <h2
            data-reveal="heading"
            className="text-3xl font-bold text-slate-900 tracking-tight"
          >
            What Producers & Directors Say
          </h2>
        </div>

        <div
          data-reveal="stagger"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {clientReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{rev.testimonial}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {rev.profileImage ? (
                  <img
                    src={rev.profileImage}
                    alt={rev.personName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    {rev.personName?.[0] || "T"}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.personName}</h4>
                  <p className="text-[11px] text-slate-500">{rev.designation}, {rev.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRUSTED BY SECTION (Smooth Horizontal Scrolling Layout) */}
      <div data-reveal="fade-up">
        <TrustedBySection />
      </div>

      {/* 10. BOTTOM CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-12 lg:p-16 border border-emerald-200 shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span
              data-reveal="eyebrow"
              className="text-xs font-bold text-emerald-700 uppercase tracking-widest block"
            >
              Join the Roster or Book Elite Talent
            </span>
            <h2
              data-reveal="heading"
              className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight"
            >
              {settings?.ctaHeading || "Ready to Elevate Your Next Production?"}
            </h2>
            <p
              data-reveal="tagline"
              className="text-sm text-slate-600 leading-relaxed"
            >
              {settings?.ctaDescription ||
                "Whether you require premier talent casting, comprehensive creative representation, or full-scale media production, our team is ready to deliver extraordinary results."}
            </p>
            <div data-reveal="fade-up" data-reveal-delay="200" className="pt-2">
              <Link
                href={settings?.ctaBtnLink || "/contact"}
                prefetch={true}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:-translate-y-0.5 transition-all"
              >
                <span>{settings?.ctaBtnText || "Book a Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
