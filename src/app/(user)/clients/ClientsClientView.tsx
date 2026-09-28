"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  RotateCcw,
  ArrowRight,
  Loader2,
  Film,
  Building2,
} from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

export interface DbClient {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string | null;
  associatedProjects?: any;
  caseStudyUrl?: string | null;
  displayOrder?: number;
  status?: string;
  createdAt?: any;
}

interface ClientsClientViewProps {
  dbClients?: DbClient[];
}

const SECTOR_CATEGORIES = [
  "All",
  "Film & TV",
  "Fashion",
  "Advertising",
  "Digital",
  "Production",
  "Talent Agency",
];

function getClientCategory(client: DbClient): string {
  if (Array.isArray(client.associatedProjects) && client.associatedProjects.length > 0) {
    const raw = String(client.associatedProjects[0]).trim();
    if (raw) return raw;
  }
  const name = client.name.toLowerCase();
  const desc = (client.description || "").toLowerCase();
  if (name.includes("skyline") || desc.includes("theatrical") || desc.includes("film & tv")) return "FILM & TV";
  if (name.includes("luxe") || desc.includes("fashion") || desc.includes("couture") || desc.includes("runway")) return "FASHION";
  if (name.includes("vertex") || desc.includes("advertising") || desc.includes("commercial")) return "ADVERTISING";
  if (name.includes("pixel") || desc.includes("digital") || desc.includes("vfx") || desc.includes("post-production")) return "DIGITAL";
  if (name.includes("nimble") || desc.includes("production")) return "PRODUCTION";
  if (name.includes("horizon") || desc.includes("talent agency") || desc.includes("management")) return "TALENT AGENCY";
  return "STUDIO PARTNER";
}

export default function ClientsClientView({ dbClients = [] }: ClientsClientViewProps) {
  const [clientsList, setClientsList] = useState<DbClient[]>(dbClients);
  const [loading, setLoading] = useState(dbClients.length === 0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch latest data from database via API to guarantee freshness
  useEffect(() => {
    let isMounted = true;
    async function loadLiveClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.clients)) {
          setClientsList(data.clients);
        }
      } catch (err) {
        console.error("Failed to fetch clients from API:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadLiveClients();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter clients dynamically by search query and category
  const filteredClients = useMemo(() => {
    return clientsList.filter((client) => {
      const category = getClientCategory(client);

      if (selectedCategory !== "All") {
        const normalizedFilter = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
        const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (!normalizedCategory.includes(normalizedFilter) && !normalizedFilter.includes(normalizedCategory)) {
          return false;
        }
      }

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = client.name.toLowerCase().includes(q);
        const matchesDesc = (client.description || "").toLowerCase().includes(q);
        const matchesCategory = category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [clientsList, search, selectedCategory]);

  function handleReset() {
    setSearch("");
    setSelectedCategory("All");
  }

  return (
    <div className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen text-slate-100 space-y-12">
      {/* Cinematic Studio Penthouse Background Atmosphere */}
      <PageAtmosphere variant="clients" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Clean, High-End Editorial Framing                        */}
      {/* ========================================================================= */}
      <section className="text-center space-y-5 pt-4 max-w-3xl mx-auto">
        {/* <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>Industry Network & Studio Partners</span>
        </div> */}

        <h1
          data-reveal="heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]"
        >
          Studios & Global Brand Collaborators
        </h1>

        <p
          data-reveal="tagline"
          className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Tree Media partners with leading motion picture studios, streaming platforms, luxury fashion houses, and commercial agencies to cast and represent elite global talent.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE CONTROLS: Category Pills & Live Search Bar                */}
      {/* ========================================================================= */}
      <section
        data-reveal="fade-up"
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-800/80 shadow-2xl"
      >
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {SECTOR_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-medium tracking-tight whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input & Reset */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search studio or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-xl focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-white transition-all placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {(search || selectedCategory !== "All") && (
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-xl hover:bg-slate-800 transition-colors"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC CLIENT CARDS GRID: Matching Reference Image Card Design         */}
      {/* ========================================================================= */}
      <main className="space-y-6">
        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing{" "}
            <strong className="text-slate-900 font-bold">
              {filteredClients.length}
            </strong>{" "}
            Studio Partner{filteredClients.length === 1 ? "" : "s"}
          </span>
          {selectedCategory !== "All" && (
            <span className="font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
              Filtered: {selectedCategory}
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            <span className="text-xs text-slate-400 font-medium">Loading studio partners from database...</span>
          </div>
        ) : filteredClients.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 p-8 space-y-4">
            <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Studios or Brands Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any partners matching &ldquo;{search}&rdquo;. Try widening your search keyword or clearing the sector filter.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Cards Grid: 3 Columns x 2 Rows */
          <div
            data-reveal="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {filteredClients.map((client) => {
              const category = getClientCategory(client);

              return (
                <div key={client.id} className="h-full">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Studio Collaboration: ${client.name}`)}`}
                    prefetch={true}
                    className="group relative block rounded-2xl overflow-hidden border border-teal-950/60 bg-slate-950 hover:border-teal-400/80 hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.35)] transition-all duration-500 aspect-[16/10] w-full cursor-pointer will-change-transform"
                  >
                    {/* 1. Full-Bleed Cinematic Photography */}
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                    )}

                    {/* 2. Film Noir Vignette & Contrast Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Subtle Top-Left Specular Rim */}
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* 3. Bottom-Left Typography (Matching Reference Layout) */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end space-y-1.5 z-10">
                      {/* Uppercase Category Eyebrow */}
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-slate-300 uppercase font-sans drop-shadow-sm">
                        {category}
                      </span>

                      {/* Client Title in Elegant Editorial Display / Serif */}
                      <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight leading-snug drop-shadow-md group-hover:text-emerald-300 transition-colors duration-300 font-medium">
                        {client.name}
                      </h3>

                      {/* View Profile Action Link */}
                      <div className="pt-0.5 flex items-center gap-1.5 text-xs text-teal-300 group-hover:text-teal-200 transition-colors font-sans font-medium">
                        <span>View profile</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. CALLOUT BANNER: Direct Studio Partnership & Casting Inquiries         */}
      {/* ========================================================================= */}
      <section
        data-reveal="fade-up"
        className="mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Studio Production Partnerships</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Cast Your Next Production?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Connect directly with Tree Media&apos;s casting team to discuss project specs, talent availability, union compliance, and agency co-productions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 relative z-10">
          <Link
            href="/contact"
            prefetch={true}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold tracking-tight shadow-md hover:shadow-emerald-500/25 transition-all text-center"
          >
            Submit Casting Brief
          </Link>
          <Link
            href="/profiles"
            prefetch={true}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold tracking-tight transition-all text-center"
          >
            Explore Talent Directory
          </Link>
        </div>
      </section>
    </div>
  );
}
