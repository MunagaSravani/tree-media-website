import Link from "next/link";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import CinematicTilt from "@/components/user/CinematicTilt";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    slug: string;
    category: string;
    location: string;
    gender: string;
    age: number;
    height?: string | null;
    skills?: any;
    shortBio: string;
    profileImage: string;
    isFeatured?: boolean;
  };
  isHome?: boolean;
}

const CATEGORY_DOTS: Record<string, string> = {
  Actor: "bg-emerald-500",
  Model: "bg-rose-500",
  "Voice Artist": "bg-cyan-500",
  Director: "bg-amber-500",
  Musician: "bg-purple-500",
};

export default function ProfileCard({ profile, isHome = false }: ProfileCardProps) {
  const skillsList = Array.isArray(profile.skills) ? profile.skills : [];
  const dotColor = CATEGORY_DOTS[profile.category] || "bg-emerald-500";

  if (isHome) {
    return (
      <div className="h-full">
        <div className="group relative rounded-3xl overflow-hidden flex flex-col justify-between bg-gradient-to-b from-white via-white to-slate-50/50 border border-slate-200/90 hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_-12px_rgba(15,23,42,0.14),0_12px_28px_-8px_rgba(16,185,129,0.15),0_0_0_1px_rgba(16,185,129,0.22)] hover:-translate-y-2 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] w-full h-full will-change-transform ring-1 ring-slate-900/[0.03]">
        {/* Subtle Ambient Card Sheen on Hover */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.04] via-transparent to-emerald-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Top Specular Rim */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Portrait Image Container - Perfectly Framed, Balanced Proportions & Stable Image */}
        <div className="relative h-[275px] sm:h-[285px] shrink-0 overflow-hidden bg-slate-950 shine-sweep">
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="w-full h-full object-cover object-[center_18%]"
            loading="lazy"
          />

          {/* Cinematic Vignette Overlay - Deep contrast at base for specs, crystal clear on talent face */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/10 pointer-events-none" />

          {/* Interactive Light Sheen (Hover effect on overlay, keeping image 100% still) */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />

          {/* Minimal Luxury Glass Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
            {/* Category Badge */}
            <span className="backdrop-blur-md bg-white/95 text-slate-800 border border-white/80 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 transition-all duration-300 group-hover:border-emerald-200/80 group-hover:shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_6px_currentColor]`} />
              <span>{profile.category}</span>
            </span>

            {/* Featured Minimal Luxury Badge */}
            {profile.isFeatured && (
              <span className="backdrop-blur-md bg-slate-950/75 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 transition-all duration-300 group-hover:border-amber-400/60">
                <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300/30" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Quick Specs Overlay at bottom of photo */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
            <div className="flex items-center gap-1.5 text-white/95 text-[11px] font-semibold drop-shadow-sm transition-colors duration-300 group-hover:text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[130px]">{profile.location}</span>
            </div>
            <div className="text-white/85 text-[11px] font-medium tracking-tight drop-shadow-sm">
              {profile.age} yrs {profile.height ? `• ${profile.height}` : ""}
            </div>
          </div>
        </div>

        {/* 2. Card Content & Details - Equal Height & Consistent Alignment */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-white/80 backdrop-blur-xs relative z-10">
          <div className="space-y-1.5">
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300 tracking-tight font-heading leading-snug">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal min-h-[36px]">
              {profile.shortBio}
            </p>
          </div>

          {/* Skills Tags & Portfolio Button Container */}
          <div className="space-y-3.5 pt-3 border-t border-slate-100 flex flex-col justify-between flex-1">
            {/* Consistent Height Skills Row */}
            <div className="min-h-[56px] flex flex-wrap gap-1.5 items-center content-start">
              {skillsList.length > 0 && skillsList.slice(0, 3).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/70 transition-colors duration-300 group-hover:border-slate-300/90 group-hover:bg-slate-100/70"
                >
                  {skill}
                </span>
              ))}
              {skillsList.length > 3 && (
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100/70 text-slate-400 border border-slate-200/50 font-mono">
                  +{skillsList.length - 3}
                </span>
              )}
            </div>

            {/* Premium Portfolio Button with Smooth Micro-Interaction */}
            <Link
              href={`/profiles/${profile.slug || profile.id}`}
              prefetch={true}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50/90 group-hover:bg-emerald-50/70 text-slate-700 group-hover:text-emerald-800 border border-slate-200/80 group-hover:border-emerald-300/80 text-xs font-bold tracking-tight transition-all duration-300 group/btn shadow-2xs hover:!bg-emerald-600 hover:!text-white hover:!border-emerald-600 hover:shadow-md hover:shadow-emerald-600/20 cursor-pointer mt-auto"
            >
              <span>View Full Portfolio</span>
              <span className="w-5 h-5 rounded-md bg-white text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-300 border border-slate-200/80 flex items-center justify-center transition-all duration-300 group-hover/btn:!bg-emerald-700 group-hover/btn:!text-white group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-3 h-3 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="h-full">
      <CinematicTilt className="h-full" maxTilt={3}>
        <div className="group relative rounded-3xl overflow-hidden flex flex-col justify-between bg-gradient-to-b from-white via-white to-slate-50/50 border border-slate-200/90 hover:border-emerald-500/50 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_-12px_rgba(15,23,42,0.14),0_12px_28px_-8px_rgba(16,185,129,0.15),0_0_0_1px_rgba(16,185,129,0.22)] hover:-translate-y-1.5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] w-full h-full will-change-transform ring-1 ring-slate-900/[0.03]">
          {/* Subtle Ambient Card Sheen on Hover */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.04] via-transparent to-emerald-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* Top Specular Rim */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Portrait Image Container - Perfectly Framed */}
          <div className="relative h-[310px] sm:h-[325px] shrink-0 overflow-hidden bg-slate-950 shine-sweep">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover object-[center_18%] group-hover:scale-104 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Soft vignette overlay - darker at bottom for specs, crystal clear over face */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/10 pointer-events-none" />

            {/* Minimal Glass Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
              {/* Category Minimal Badge */}
              <span className="backdrop-blur-md bg-white/95 text-slate-800 border border-white/80 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 transition-all duration-300 group-hover:border-emerald-200/80 group-hover:shadow-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_6px_currentColor]`} />
                <span>{profile.category}</span>
              </span>

              {/* Featured Minimal Luxury Badge */}
              {profile.isFeatured && (
                <span className="backdrop-blur-md bg-slate-950/75 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 transition-all duration-300 group-hover:border-amber-400/60">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300/30" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            {/* Quick Specs Overlay at bottom of photo */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
              <div className="flex items-center gap-1.5 text-white/95 text-[11px] font-semibold drop-shadow-sm transition-colors duration-300 group-hover:text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[130px]">{profile.location}</span>
              </div>
              <div className="text-white/85 text-[11px] font-medium tracking-tight drop-shadow-sm">
                {profile.age} yrs {profile.height ? `• ${profile.height}` : ""}
              </div>
            </div>
          </div>

          {/* Card Content & Details */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-white/80 backdrop-blur-xs relative z-10">
            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300 tracking-tight font-heading leading-snug">
                {profile.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal min-h-[36px]">
                {profile.shortBio}
              </p>
            </div>

            {/* Skills Tags & Portfolio Button */}
            <div className="space-y-3.5 pt-3 border-t border-slate-100 flex flex-col justify-between flex-1">
              <div className="min-h-[56px] flex flex-wrap gap-1.5 items-center content-start">
                {skillsList.length > 0 && skillsList.slice(0, 3).map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/70 transition-colors duration-300 group-hover:border-slate-300/90 group-hover:bg-slate-100/70"
                  >
                    {skill}
                  </span>
                ))}
                {skillsList.length > 3 && (
                  <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100/70 text-slate-400 border border-slate-200/50 font-mono">
                    +{skillsList.length - 3}
                  </span>
                )}
              </div>

              {/* Clean Portfolio Button with Subtle Hover Effect */}
              <Link
                href={`/profiles/${profile.slug || profile.id}`}
                prefetch={true}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50/90 group-hover:bg-emerald-50/70 text-slate-700 group-hover:text-emerald-800 border border-slate-200/80 group-hover:border-emerald-300/80 text-xs font-bold tracking-tight transition-all duration-300 group/btn shadow-2xs hover:!bg-emerald-600 hover:!text-white hover:!border-emerald-600 hover:shadow-md hover:shadow-emerald-600/20 cursor-pointer mt-auto"
              >
                <span>View Full Portfolio</span>
                <span className="w-5 h-5 rounded-md bg-white text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-300 border border-slate-200/80 flex items-center justify-center transition-all duration-300 group-hover/btn:!bg-emerald-700 group-hover/btn:!text-white group-hover/btn:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </CinematicTilt>
    </div>
  );
}
