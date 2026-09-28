import React from "react";

interface TreeMediaLogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  emblemOnly?: boolean;
  useImage?: boolean;
}

const SIZE_MAP = {
  sm: {
    height: 36,
    emblemSize: 36,
    textSize: "text-lg",
    subtextSize: "text-[9px]",
    lineWidth: "w-10",
  },
  md: {
    height: 48,
    emblemSize: 48,
    textSize: "text-2xl",
    subtextSize: "text-[11px]",
    lineWidth: "w-14",
  },
  lg: {
    height: 64,
    emblemSize: 64,
    textSize: "text-3xl",
    subtextSize: "text-xs",
    lineWidth: "w-20",
  },
  xl: {
    height: 84,
    emblemSize: 84,
    textSize: "text-4xl",
    subtextSize: "text-sm",
    lineWidth: "w-28",
  },
};

export default function TreeMediaLogo({
  className = "",
  variant = "light",
  size = "md",
  emblemOnly = false,
  useImage = false,
}: TreeMediaLogoProps) {
  const currentSize = SIZE_MAP[size] || SIZE_MAP.md;
  const isDark = variant === "dark";

  // If using high-res raster asset generated to match YouWeMedia luxury 3D rendering
  if (useImage) {
    const imageSrc = isDark
      ? "/images/logo/tree-media-dark-logo.jpg"
      : "/images/logo/tree-media-logo.jpg";

    if (emblemOnly) {
      return (
        <div
          className={`relative overflow-hidden rounded-full shrink-0 ${className}`}
          style={{ width: currentSize.emblemSize, height: currentSize.emblemSize }}
        >
          <img
            src={imageSrc}
            alt="Tree Media Emblem"
            className="w-full h-full object-cover object-[15%_center] scale-160"
          />
        </div>
      );
    }

    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <img
          src={imageSrc}
          alt="Tree Media Logo"
          className="h-auto w-auto object-contain transition-transform"
          style={{ height: currentSize.height }}
        />
      </div>
    );
  }

  // Pure Scalable Vector SVG Implementation
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* 1. Circular Emblem with Gold Ring & Interlocking TM Monogram */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: currentSize.emblemSize, height: currentSize.emblemSize }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich 24K Gold Ring Gradient */}
            <linearGradient id="tmGoldRing" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFB76C" />
              <stop offset="25%" stopColor="#FBF2B7" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#E5C158" />
            </linearGradient>

            {/* Inner Ring Glow / Rim */}
            <linearGradient id="tmInnerGlow" x1="105" y1="105" x2="15" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#AA7C11" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFF2B2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#684A04" stopOpacity="0.4" />
            </linearGradient>

            {/* Radiant Platinum Silver Gradient for 'T' */}
            <linearGradient id="tmSilverPlat" x1="25" y1="25" x2="75" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#E2E8F0" />
              <stop offset="45%" stopColor="#CBD5E1" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="90%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            {/* High-Gloss Gold Gradient for 'M' */}
            <linearGradient id="tmGoldM" x1="45" y1="35" x2="95" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF7C2" />
              <stop offset="25%" stopColor="#F59E0B" />
              <stop offset="55%" stopColor="#D97706" />
              <stop offset="80%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>

            {/* Subtle Specular Highlights */}
            <filter id="tmGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Outer Polished Gold Metallic Ring */}
          <circle
            cx="60"
            cy="60"
            r="53"
            stroke="url(#tmGoldRing)"
            strokeWidth="3.5"
            className="transition-all"
          />

          {/* Delicate Inner Ring Accent */}
          <circle
            cx="60"
            cy="60"
            r="49"
            stroke="url(#tmInnerGlow)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Monogram Group with Soft Depth */}
          <g filter="url(#tmGlow)">
            {/* Letter 'T' in Platinum Silver (Left & Central Anchor) */}
            {/* Top Bar of T */}
            <path
              d="M 28 40 C 28 38.5 29.5 37 32 37 L 68 37 C 70.5 37 72 38.5 72 40 L 71 43 C 69.5 42.5 67 42 63 42 C 60 42 59 43 59 46 L 59 78 C 59 81 60.5 82 63.5 82.5 L 63.5 85 L 36.5 85 L 36.5 82.5 C 39.5 82 41 81 41 78 L 41 46 C 41 43 40 42 37 42 C 33 42 30.5 42.5 29 43 Z"
              fill="url(#tmSilverPlat)"
            />

            {/* Letter 'M' in Rich 24K Gold (Interlocking Right Side) */}
            <path
              d="M 47 85 L 47 82.5 C 49.5 82 51 81 51 77 L 51 51 C 51 47.5 49.5 46.5 47 46 L 47 44 L 59 44 L 69.5 68 L 80 44 L 92 44 L 92 46 C 89.5 46.5 88 47.5 88 51 L 88 77 C 88 81 89.5 82 92 82.5 L 92 85 L 78 85 L 78 82.5 C 80.5 82 82 81 82 77 L 82 52.5 L 72 76.5 L 67 76.5 L 57 52.5 L 57 77 C 57 81 58.5 82 61 82.5 L 61 85 Z"
              fill="url(#tmGoldM)"
            />

            {/* Specular Star Flare at Top Intersection */}
            <circle cx="50" cy="38" r="1.5" fill="#FFFFFF" opacity="0.9" />
            <path
              d="M 50 35 L 50 41 M 47 38 L 53 38"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      {/* 2. Brand Wordmark (Reference-style Two-tier Hierarchy) */}
      {!emblemOnly && (
        <div className="flex flex-col justify-center leading-none">
          {/* Top Tier: "TREE" in Classical Roman Serif Typography */}
          <span
            className={`font-serif tracking-[0.16em] font-black uppercase transition-colors ${currentSize.textSize} ${
              isDark
                ? "text-white group-hover:text-amber-200"
                : "text-slate-900 group-hover:text-amber-700"
            }`}
            style={{
              fontFamily:
                "'Cinzel', 'Trajan Pro', 'Cormorant Garamond', 'Times New Roman', serif",
              letterSpacing: "0.18em",
            }}
          >
            TREE
          </span>

          {/* Bottom Tier: Divider Line + Spaced "MEDIA" */}
          <div className="flex items-center gap-2 mt-1">
            {/* Exact Horizontal Rule extending under left portion */}
            <div
              className={`h-[1.5px] rounded-full transition-colors ${currentSize.lineWidth} ${
                isDark ? "bg-amber-400/80" : "bg-slate-800"
              }`}
            />
            {/* "MEDIA" in smaller widely-spaced serif capitals */}
            <span
              className={`font-serif uppercase font-bold tracking-[0.32em] transition-colors ${currentSize.subtextSize} ${
                isDark ? "text-amber-300/90" : "text-slate-800"
              }`}
              style={{
                fontFamily:
                  "'Cinzel', 'Trajan Pro', 'Cormorant Garamond', 'Times New Roman', serif",
                letterSpacing: "0.32em",
              }}
            >
              MEDIA
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
