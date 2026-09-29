"use client";

import React from "react";

export type PageAtmosphereVariant =
  | "home"
  | "about"
  | "services"
  | "auditions"
  | "portfolio"
  | "profiles"
  | "gallery"
  | "clients"
  | "testimonials"
  | "contact";

interface PageAtmosphereProps {
  variant: PageAtmosphereVariant;
  className?: string;
}

interface PageThemeConfig {
  photoUrl: string;
  photoAlt: string;
  photoOpacity: string;
  primaryGlow: string;
  secondaryGlow: string;
  accentGlow: string;
  subtitle: string;
  codeBadge: string;
}

const THEME_CONFIGS: Record<PageAtmosphereVariant, PageThemeConfig> = {
  home: {
    photoUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=2000&auto=format&fit=crop",
    photoAlt: "Cinematic Soundstage with Lighting Grid",
    photoOpacity: "opacity-15",
    primaryGlow: "rgba(220, 139, 32, 0.14)", // Tree Media Emerald
    secondaryGlow: "rgba(217, 140, 25, 0.12)", // Warm Gala Amber
    accentGlow: "rgba(8, 145, 178, 0.08)", // Cyan flare
    subtitle: "2.39:1 CINEMASCOPE • SOUNDSTAGE 01",
    codeBadge: "TREE MEDIA GLOBAL",
  },
  about: {
    photoUrl: "",
    photoAlt: "Modern Cinema Studio & Casting Architecture",
    photoOpacity: "opacity-14",
    primaryGlow: "rgba(180, 83, 9, 0.14)", // Archival Gold
    secondaryGlow: "rgba(220, 139, 32, 0.11)", // Deep Heritage Emerald
    accentGlow: "rgba(71, 85, 105, 0.08)", // Studio Slate
    subtitle: "MODERN TALENT AGENCY • CONTEMPORARY MEDIA",
    codeBadge: "AGENCY & VISION",
  },
  services: {
    photoUrl: "",
    photoAlt: "8K Cinema Camera & Production Setup",
    photoOpacity: "opacity-14",
    primaryGlow: "rgba(8, 145, 178, 0.15)", // Studio Teal
    secondaryGlow: "rgba(220, 139, 32, 0.13)", // Electric Emerald
    accentGlow: "rgba(139, 92, 246, 0.08)", // Gaffer Violet Gel
    subtitle: "8K SENSOR HUD • 50MM T1.3 PRIME • 24.000 FPS",
    codeBadge: "PRODUCTION CAPABILITIES",
  },
  auditions: {
    photoUrl: "",
    photoAlt: "Spotlight on Casting Stage Floor",
    photoOpacity: "opacity-16",
    primaryGlow: "rgba(245, 158, 11, 0.18)", // Radiant Stage Amber
    secondaryGlow: "rgba(220, 139, 32, 0.12)", // Emerald Cue
    accentGlow: "rgba(239, 68, 68, 0.09)", // Tally REC Red
    subtitle: "LIVE CASTING CALL • STAGE POOL • 1.85:1 FLAT",
    codeBadge: "AUDITIONS DISCOVERY",
  },
  portfolio: {
    photoUrl: "",
    photoAlt: "Silver Screen Premiere & Screening Room",
    photoOpacity: "opacity-15",
    primaryGlow: "rgba(99, 102, 241, 0.14)", // Cinema Indigo
    secondaryGlow: "rgba(168, 85, 247, 0.10)", // Royal Velvet
    accentGlow: "rgba(245, 158, 11, 0.12)", // Marquee Champagne
    subtitle: "SCREENING ROOM 03 • THEATRICAL MASTER • DCI-P3",
    codeBadge: "PREMIERED WORKS",
  },
  profiles: {
    photoUrl: "",
    photoAlt: "Editorial Portrait Studio Cyclorama",
    photoOpacity: "opacity-14",
    primaryGlow: "rgba(244, 63, 94, 0.12)", // Editorial Rose-Gold
    secondaryGlow: "rgba(220, 139, 32, 0.12)", // Emerald Jade
    accentGlow: "rgba(251, 146, 60, 0.10)", // Soft Peach Prism
    subtitle: "CYCLORAMA STUDIO • 4:5 EDITORIAL • KEY LIGHT 5600K",
    codeBadge: "TALENT DIRECTORY",
  },
  gallery: {
    photoUrl: "",
    photoAlt: "Photographic Light Table & Negative Film Archive",
    photoOpacity: "opacity-14",
    primaryGlow: "rgba(234, 88, 12, 0.13)", // Darkroom Amber
    secondaryGlow: "rgba(8, 145, 178, 0.12)", // Light-table Cyan
    accentGlow: "rgba(100, 116, 139, 0.08)", // Silver Halide
    subtitle: "CONTACT SHEET • KODAK 5219 VISION3 • PROOF ARCHIVE",
    codeBadge: "STUDIO GALLERY",
  },
  clients: {
    photoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    photoAlt: "Executive Beverly Hills Studio Penthouse Architecture",
    photoOpacity: "opacity-13",
    primaryGlow: "rgba(37, 99, 235, 0.12)", // Studio Sapphire
    secondaryGlow: "rgba(220, 139, 32, 0.11)", // Authority Emerald
    accentGlow: "rgba(148, 163, 184, 0.09)", // Platinum
    subtitle: "EXECUTIVE SUITE • STUDIO NETWORK • GLOBAL DISTRIBUTION",
    codeBadge: "STUDIO PARTNERS",
  },
  testimonials: {
    photoUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop",
    photoAlt: "Awards Gala & Premiere Celebration Lighting",
    photoOpacity: "opacity-15",
    primaryGlow: "rgba(217, 140, 25, 0.18)", // 24K Gala Gold
    secondaryGlow: "rgba(251, 191, 36, 0.12)", // Champagne Sparkle
    accentGlow: "rgba(220, 139, 32, 0.10)", // Emerald Ribbon
    subtitle: "FILM FESTIVAL OVATION • GOLDEN LAUREL • CRITICS ACCLAIM",
    codeBadge: "PRODUCER TRUST",
  },
  contact: {
    photoUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    photoAlt: "Luxury Agency VIP Green Room & Modern Studio Lounge",
    photoOpacity: "opacity-14",
    primaryGlow: "rgba(217, 140, 25, 0.13)", // Warm Amber Sconce
    secondaryGlow: "rgba(220, 139, 32, 0.12)", // Agency Emerald
    accentGlow: "rgba(225, 29, 72, 0.08)", // Terracotta Warmth
    subtitle: "VIP GREEN ROOM • DIRECT AGENT BOOKING • BEVERLY HILLS",
    codeBadge: "HEADQUARTERS",
  },
};

export default function PageAtmosphere({ variant, className = "" }: PageAtmosphereProps) {
  const config = THEME_CONFIGS[variant] || THEME_CONFIGS.home;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 bg-slate-50/70 ${className}`}
    >
      {/* 1. LAYER ONE: Curated Cinematic Photographic Backplate */}
      {config.photoUrl ? (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={config.photoUrl}
            alt={config.photoAlt}
            loading="eager"
            className={`w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.12] ${config.photoOpacity} mix-blend-multiply transition-opacity duration-1000`}
          />
          {/* Soft edge masking gradients so the photo blends seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50/90" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
      ) : null}

      {/* 2. LAYER TWO: Volumetric Studio Lighting Gradients */}
      {/* Primary Studio Spotlight (Top-Left / Top-Center) */}
      <div
        className="absolute -top-32 left-1/4 -translate-x-1/2 w-[750px] h-[550px] rounded-full blur-[140px] animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${config.primaryGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Rim Light (Top-Right / Opposite Flank) */}
      <div
        className="absolute -top-20 right-[-100px] w-[650px] h-[500px] rounded-full blur-[130px] animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${config.secondaryGlow} 0%, transparent 68%)`,
          animationDelay: "3s",
        }}
      />

      {/* Ambient Mid-Tone Floor Glow */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[160px]"
        style={{
          background: `radial-gradient(ellipse at center, ${config.accentGlow} 0%, transparent 75%)`,
        }}
      />

      {/* 3. LAYER THREE: Subtle Studio Film Grid & Spatial Depth */}
      <div className="absolute inset-0 bg-grid-studio opacity-40" />

      {/* Anamorphic Horizontal Highlight Streak (Cinema Flare) */}
      <div
        className="absolute top-[18%] left-0 right-0 h-[2px] opacity-40 animate-anamorphic"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${config.primaryGlow} 30%, ${config.secondaryGlow} 50%, ${config.accentGlow} 70%, transparent 100%)`,
        }}
      />

      {/* 4. LAYER FOUR: 3D Floating Cinematic Dust & Bokeh Accents */}
      <div className="absolute top-24 left-[15%] w-3 h-3 rounded-full bg-amber-400/30 blur-[1px] animate-float-drift" />
      <div
        className="absolute top-48 right-[20%] w-4 h-4 rounded-full bg-[#DC8B20]/20 blur-[2px] animate-float-drift"
        style={{ animationDelay: "4s", animationDuration: "16s" }}
      />
      <div
        className="absolute top-[35%] left-[8%] w-5 h-5 rounded-full bg-teal-400/20 blur-[3px] animate-float-drift"
        style={{ animationDelay: "2s", animationDuration: "14s" }}
      />
      <div
        className="absolute top-[60%] right-[12%] w-3.5 h-3.5 rounded-full bg-amber-300/25 blur-[1.5px] animate-float-drift"
        style={{ animationDelay: "6s", animationDuration: "18s" }}
      />

      {/* 5. LAYER FIVE: Bespoke Studio / Film Technical Motifs */}
      {/* Left Margin: 35mm Celluloid Frame Edge Indicators */}
      <div className="hidden xl:flex absolute top-28 left-4 flex-col gap-6 text-[9px] font-mono tracking-widest text-slate-400/60 uppercase select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC8B20]/20" />
          <span>{config.codeBadge}</span>
        </div>
        <div className="border-l border-slate-300/60 pl-2 space-y-1 text-[8px] text-slate-400/50">
          <p>{config.subtitle}</p>
          <p>FRAME # TM-2026-X</p>
        </div>
        {/* Film sprockets dots */}
        <div className="flex flex-col gap-2 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2.5 h-4 rounded-[2px] border border-slate-500/40 bg-slate-200/20" />
          ))}
        </div>
      </div>

      {/* Right Margin: 35mm Celluloid Frame Edge Indicators */}
      <div className="hidden xl:flex absolute top-28 right-4 flex-col items-end gap-6 text-[9px] font-mono tracking-widest text-slate-400/60 uppercase select-none">
        <div className="flex items-center gap-1.5">
          <span>SYNC • 24.00 FPS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        </div>
        <div className="border-r border-slate-300/60 pr-2 space-y-1 text-[8px] text-slate-400/50 text-right">
          <p>ASPECT: 2.39:1</p>
          <p>MASTER AUDIO: 48kHz / 24b</p>
        </div>
        {/* Film sprockets dots */}
        <div className="flex flex-col gap-2 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2.5 h-4 rounded-[2px] border border-slate-500/40 bg-slate-200/20" />
          ))}
        </div>
      </div>

      {/* Variant-Specific SVG Overlays */}
      {/* 1. Auditions: Viewfinder Crosshairs + Tally REC Mark */}
      {variant === "auditions" && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="relative w-full h-full border border-dashed border-amber-600/30 rounded-3xl p-6">
            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono text-red-600 font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>REC ● [STAGE 01]</span>
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500">
              FRAME GUIDE: 1.85:1
            </div>
            {/* Viewfinder Center Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-amber-600/40" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-amber-600/40" />
              <div className="w-full h-full rounded-full border border-amber-600/30" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-700/60 tracking-widest uppercase">
              [ STAGE MARK X • FOCUS LOCK 3.2M ]
            </div>
          </div>
        </div>
      )}

      {/* 2. Services: Cinema Sensor & Lens Calibrations */}
      {variant === "services" && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 opacity-25 pointer-events-none">
          <div className="w-full h-full border border-teal-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex justify-between text-[9px] font-mono text-teal-800">
              <span>SENSOR: FULL-FRAME 36x24MM</span>
              <span>LUT: TREE_MEDIA_FILM_V4</span>
            </div>
            <div className="flex justify-between items-end text-[9px] font-mono text-[#915514]">
              <span>COLOR GEL: 06B6D4 / 10B981</span>
              <span>AUDIO: -12.4 dB FS</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Portfolio: Letterbox Cinemascope Aspect Guides */}
      {variant === "portfolio" && (
        <div className="absolute top-16 left-0 right-0 flex flex-col items-center opacity-30 pointer-events-none">
          <div className="w-full max-w-6xl flex justify-between px-8 text-[9px] font-mono text-indigo-700/70 tracking-widest">
            <span>DCI 4K SCOPE [4096 × 1716]</span>
            <span>DOLBY VISION 4.0</span>
          </div>
          <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mt-2" />
        </div>
      )}

      {/* 4. Testimonials: Golden Laurel Award Accents */}
      {variant === "testimonials" && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-25 pointer-events-none text-amber-600 flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest">
          <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M12 21c-4.97 0-9-4.03-9-9 0-2.12.74-4.07 1.97-5.61L12 15l7.03-8.61C20.26 7.93 21 9.88 21 12c0 4.97-4.03 9-9 9z" />
          </svg>
          <span>ACADEMY & CANNES SELECTION RECOGNITION</span>
          <svg className="w-6 h-6 stroke-current fill-none transform -scale-x-100" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M12 21c-4.97 0-9-4.03-9-9 0-2.12.74-4.07 1.97-5.61L12 15l7.03-8.61C20.26 7.93 21 9.88 21 12c0 4.97-4.03 9-9 9z" />
          </svg>
        </div>
      )}

      {/* 5. Contact: Studio On-Air Badge Motif */}
      {variant === "contact" && (
        <div className="absolute top-20 right-12 opacity-35 pointer-events-none">
          <div className="px-3 py-1 rounded-md border border-amber-600/40 bg-amber-500/10 text-amber-800 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#DC8B20] animate-pulse" />
            <span>AGENCY LINE ACTIVE • PST</span>
          </div>
        </div>
      )}


    </div>
  );
}
