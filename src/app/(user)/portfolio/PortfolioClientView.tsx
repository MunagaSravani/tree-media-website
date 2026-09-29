"use client";

import { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/user/ProjectCard";
import {
  Sparkles,
  Film,
  Search,
  RotateCcw,
  Clapperboard,
  Award,
  Video,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import LiveStatsCounter, { AgencyStat } from "@/components/user/LiveStatsCounter";

const PORTFOLIO_INDUSTRY_METRICS: AgencyStat[] = [
  {
    id: "portfolio-stat-1",
    value: "45+",
    label: "Commercials Delivered",
    colorClass: "emerald-gradient-text",
  },
  {
    id: "portfolio-stat-2",
    value: "18+",
    label: "Theatrical & Streamer Features",
    colorClass: "text-teal-600",
  },
  {
    id: "portfolio-stat-3",
    value: "14",
    label: "Film Festival Laurels",
    colorClass: "gold-gradient-text",
  },
  {
    id: "portfolio-stat-4",
    value: "100%",
    label: "Union & SAG Compliance",
    colorClass: "emerald-gradient-text",
  },
];

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  clientName: string;
  completionDate: string;
  coverImage: string;
  isFeatured?: boolean;
}

const DEFAULT_PORTFOLIO_PROJECTS: ProjectItem[] = [
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
  {
    id: "a0a5ef67-81e7-4e77-b739-999085658b57",
    title: "The Horizon of Silence — Nordic Thriller",
    slug: "horizon-of-silence-nordic-thriller",
    category: "Feature Film Casting",
    description: "Principal character auditions, multilingual ensemble casting, and on-location dialect coaching for an atmospheric Nordic mystery feature.",
    clientName: "Nordic Cinema Group & StudioCanal",
    completionDate: "Winter Premiere",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "832d053b-e11e-471b-a8d3-ca2c3ac8b3bf",
    title: "Solstice Reverie — Luxury Brand Showcase",
    slug: "solstice-reverie-luxury-brand-showcase",
    category: "Commercial & Advertising",
    description: "High-fashion runway talent scouting, brand ambassador placement, and visual campaign coordination for a global luxury timepiece launch.",
    clientName: "Vanguard Horology Geneva",
    completionDate: "Spring Global Campaign",
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
  },
];

interface PortfolioClientViewProps {
  initialProjects?: ProjectItem[];
}

export default function PortfolioClientView({
  initialProjects = DEFAULT_PORTFOLIO_PROJECTS,
}: PortfolioClientViewProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadPortfolio() {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, []);

  // Dynamically extract unique categories and their counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: projects.length,
    };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const categoriesList = useMemo(() => {
    const unique = Array.from(
      new Set(projects.map((p) => p.category))
    ).filter(Boolean);
    return ["All", ...unique];
  }, [projects]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      if (!matchesCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesClient = p.clientName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        return matchesTitle || matchesClient || matchesDesc;
      }

      return true;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="relative space-y-12 py-8 min-h-screen">
      {/* Silver Screen Screening Room Atmosphere */}
      <PageAtmosphere variant="portfolio" />

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* 1. Header Banner */}
        <section className="text-center space-y-4">
          {/* <div
            data-reveal="eyebrow"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DC8B20]/50 text-[#DC8B20] text-xs font-semibold uppercase tracking-widest shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DC8B20] animate-pulse" />
            <span>Production Portfolio</span>
          </div> */}
          <h1
            data-reveal="heading"
            className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
          >
            Selected Works & Cinematic Case Studies
          </h1>
          <p
            data-reveal="tagline"
            className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Explore international theatrical releases, luxury fashion commercials, and award-winning documentary productions managed and cast by Tree Media.
          </p>
        </section>

        {/* 2. Industry Metrics Highlight Bar with Vertical Animated Rolling Digits */}
        <section>
          <LiveStatsCounter
            stats={PORTFOLIO_INDUSTRY_METRICS}
            showLiveBadge={false}
            enableLiveTicker={false}
            className="p-6 lg:p-8 shadow-sm"
          />
        </section>

      {/* 3. Interactive Filter Tabs & Quick Search */}
      <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoriesWithCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-[#DC8B20] text-white shadow-md shadow-[#DC8B20]/25 scale-[1.02]"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs"
                  }`}
                >
                  <span>{cat === "All" ? "All Works" : cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? "bg-[#DC8B20]/60 text-[#fdf0d5]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or clients..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC8B20] focus:border-[#DC8B20]/300 shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== "All" || searchQuery.trim()) && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
            <span>
              Showing{" "}
              <strong className="text-slate-900">
                {filteredProjects.length}
              </strong>{" "}
              of {projects.length} productions
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#DC8B20] hover:text-[#DC8B20] font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. Projects Grid */}
      <section>
        {filteredProjects.length > 0 ? (
          <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard key={proj.id} project={proj} index={idx} />
            ))}
          </div>
        ) : (
          <div className="glass-panel bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
            <Clapperboard className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              No matching productions found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any productions matching your filter criteria. Try searching for a different keyword or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#DC8B20] text-white text-xs font-bold shadow-xs hover:bg-[#DC8B20] transition-colors"
            >
              Show All Works
            </button>
          </div>
        )}
      </section>

      {/* 5. Production Consultation & Project Briefing Banner */}
      <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="group glass-panel bg-white p-10 lg:p-12 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#DC8B20]/30">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DC8B20]/10 border border-[#DC8B20]/30 text-[#DC8B20] text-xs font-semibold uppercase tracking-wider">
              <span>Executive Production Services</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Have an Upcoming Feature Film or Commercial Shoot?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Tree Media provides full-service casting directors, principal talent representation, and end-to-end cinematography packages tailored to your brand’s shooting schedule.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              prefetch={true}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-bold text-xs shadow-md shadow-[#DC8B20]/25 hover:shadow-[#DC8B20]/25 hover:scale-[1.02] flex items-center justify-center gap-2 transition-all duration-300"
            >
              <span>Initiate Production Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profiles"
              prefetch={true}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center"
            >
              <span>Browse Talent Roster</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </div>
  );
}
