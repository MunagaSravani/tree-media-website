"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProfileCard from "@/components/user/ProfileCard";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import {
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  Users,
  MapPin,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface ProfileItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  gender: string;
  age: number;
  height?: string | null;
  skills?: string[];
  shortBio: string;
  fullBio: string;
  profileImage: string;
  isFeatured: boolean;
  status: "published" | "draft" | "unpublished";
}

const CATEGORIES = ["All", "Actor", "Model", "Voice Artist", "Director", "Musician"];
const GENDERS = ["All", "Male", "Female", "Non-Binary"];

function ProfilesDirectoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams ? searchParams.get("category") : null;

  const [profiles, setProfiles] = useState<ProfileItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [location, setLocation] = useState("");
  const [maxAge, setMaxAge] = useState(60);

  // Synchronize category filter with URL query parameter
  useEffect(() => {
    if (urlCategory) {
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === urlCategory.toLowerCase().trim()
      );
      if (matched) {
        setCategory(matched);
      } else {
        setCategory("All");
      }
    } else {
      setCategory("All");
    }
  }, [urlCategory]);

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      try {
        const res = await fetch("/api/profiles");
        const data = await res.json();
        if (data.success) {
          setProfiles(data.profiles);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  function handleReset() {
    setSearch("");
    setCategory("All");
    setGender("All");
    setLocation("");
    setMaxAge(60);
    router.push("/profiles", { scroll: false });
  }

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const qs = params.toString();
    router.push(qs ? `/profiles?${qs}` : "/profiles", { scroll: false });
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      if (category !== "All" && p.category.toLowerCase() !== category.toLowerCase()) return false;
      if (gender !== "All" && p.gender !== gender) return false;
      if (location.trim() && !p.location.toLowerCase().includes(location.toLowerCase().trim())) {
        return false;
      }
      if (p.age > maxAge) return false;

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBio = p.shortBio.toLowerCase().includes(q);
        const matchesLocation = p.location.toLowerCase().includes(q);
        const matchesSkill = Array.isArray(p.skills) && p.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBio && !matchesLocation && !matchesSkill) {
          return false;
        }
      }

      return true;
    });
  }, [profiles, search, category, gender, location, maxAge]);

  return (
    <div className="relative space-y-12 py-8 min-h-screen">
      {/* Editorial Studio Cyclorama Atmosphere */}
      <PageAtmosphere variant="profiles" />

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Page Header */}
        <section className="text-center space-y-4">
          {/* <div
            data-reveal="eyebrow"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DC8B20]/50 text-[#DC8B20] text-xs font-semibold uppercase tracking-widest shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DC8B20]" />
            <span>Talent Representation</span>
          </div> */}
          <h1
            data-reveal="heading"
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight"
          >
            Tree Media Talent Directory
          </h1>
          <p
            data-reveal="tagline"
            className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover world-class actors, editorial models, voice actors, and directors represented by our agency.
          </p>
        </section>

        {/* Main 2-Column Layout: Sidebar Filters + Profile Results */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar */}
          <aside
            data-reveal="fade-up"
            className="col-span-12 lg:col-span-3 glass-panel bg-white p-6 rounded-3xl border border-slate-200 space-y-6 sticky top-24 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Filter className="w-4 h-4 text-[#DC8B20]" />
                <span>Multi-Facet Filter</span>
              </div>
            <button
              onClick={handleReset}
              className="text-[11px] text-slate-500 hover:text-[#DC8B20] flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Keyword / Skill Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Name, stunt, accent, skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Representation Category</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    category === cat
                      ? "bg-[#DC8B20] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Gender</label>
            <div className="flex flex-wrap gap-1.5">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    gender === g
                      ? "bg-[#DC8B20] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200/80"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Location Base</label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. London, Los Angeles, Tokyo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#DC8B20] focus:outline-none"
              />
            </div>
          </div>

          {/* Maximum Age Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700">Maximum Age</label>
              <span className="text-[#DC8B20] font-bold">{maxAge} yrs</span>
            </div>
            <input
              type="range"
              min={18}
              max={65}
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="w-full accent-[#DC8B20] cursor-pointer"
            />
          </div>
        </aside>

        {/* Right Profiles Results Grid */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between glass-panel bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-600">
              Showing{" "}
              <strong className="text-[#DC8B20] font-bold">
                {filteredProfiles.length}
              </strong>{" "}
              Verified Artists
            </span>

            {category !== "All" && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/30">
                Filtered: {category}
              </span>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#DC8B20] animate-spin" />
              <span className="text-xs text-slate-500">Loading talent directory...</span>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="glass-panel bg-white p-16 text-center rounded-3xl border border-slate-200 space-y-3 shadow-xs">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Talents Match Your Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your keyword search, resetting filters, or adjusting the maximum age slider.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-2 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white text-xs font-bold transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((p) => (
                <ProfileCard key={p.id} profile={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  </div>
  );
}

export default function ProfilesDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex flex-col items-center justify-center space-y-3 min-h-screen">
          <Loader2 className="w-8 h-8 text-[#DC8B20] animate-spin" />
          <span className="text-xs text-slate-500">Loading talent directory...</span>
        </div>
      }
    >
      <ProfilesDirectoryContent />
    </Suspense>
  );
}
