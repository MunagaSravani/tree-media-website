"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

const BRAND_LOGOS: BrandItem[] = [
  {
    id: "paramount",
    name: "Paramount Pictures",
    category: "Theatrical Studio",
    svg: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 40 32" className="w-8 h-7 fill-slate-800 group-hover/logo:fill-sky-700 transition-colors">
          <path d="M20 2L23.5 12H34L25.5 18L28.5 28L20 22L11.5 28L14.5 18L6 12H16.5L20 2Z" fillOpacity="0.2" />
          <path d="M20 5L28 27H12L20 5Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M20 10L24 23H16L20 10Z" fill="currentColor" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif tracking-[0.2em] text-xs font-black text-slate-800 group-hover/logo:text-sky-800 transition-colors">
            PARAMOUNT
          </span>
          <span className="text-[9px] tracking-widest text-slate-500 uppercase font-mono">Pictures</span>
        </div>
      </div>
    ),
  },
  {
    id: "warner-bros",
    name: "Warner Bros. Discovery",
    category: "Media Conglomerate",
    svg: (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-8 rounded-b-xl border-2 border-slate-800 group-hover/logo:border-blue-700 flex items-center justify-center bg-slate-900 group-hover/logo:bg-blue-700 text-white font-black text-xs transition-colors shadow-xs">
          WB
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans tracking-wider text-xs font-black text-slate-800 group-hover/logo:text-blue-700 transition-colors">
            WARNER BROS.
          </span>
          <span className="text-[9px] tracking-widest text-slate-500 uppercase font-mono">Pictures</span>
        </div>
      </div>
    ),
  },
  {
    id: "sony-pictures",
    name: "Sony Pictures Entertainment",
    category: "Global Studio",
    svg: (
      <div className="flex items-center gap-2.5">
        <div className="flex flex-col gap-0.5">
          <div className="w-4 h-1.5 bg-slate-800 group-hover/logo:bg-[#DC8B20] transition-colors" />
          <div className="w-4 h-1.5 bg-slate-800 group-hover/logo:bg-[#DC8B20] transition-colors" />
          <div className="w-4 h-1.5 bg-slate-800 group-hover/logo:bg-[#DC8B20] transition-colors" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-mono tracking-[0.25em] text-xs font-black text-slate-800 group-hover/logo:text-slate-900 transition-colors">
            SONY
          </span>
          <span className="text-[9px] tracking-widest text-slate-500 uppercase font-sans font-bold">
            PICTURES
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "universal",
    name: "Universal Studios",
    category: "Theatrical Production",
    svg: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" className="w-7 h-7 text-slate-800 group-hover/logo:text-amber-700 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="16" r="13" />
          <ellipse cx="16" cy="16" rx="13" ry="5" />
          <line x1="16" y1="3" x2="16" y2="29" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif tracking-[0.18em] text-xs font-black text-slate-800 group-hover/logo:text-amber-800 transition-colors">
            UNIVERSAL
          </span>
          <span className="text-[9px] tracking-widest text-slate-500 uppercase font-mono">Studios</span>
        </div>
      </div>
    ),
  },
  {
    id: "a24",
    name: "A24 Films",
    category: "Prestige Independent",
    svg: (
      <div className="flex items-center gap-2">
        <div className="px-2.5 py-1 rounded-md bg-slate-900 group-hover/logo:bg-black text-white font-mono text-sm font-black tracking-widest transition-colors shadow-xs">
          A24
        </div>
        <span className="text-[10px] tracking-widest text-slate-500 uppercase font-mono font-semibold">
          Films
        </span>
      </div>
    ),
  },
  {
    id: "netflix",
    name: "Netflix Studios",
    category: "Streaming Network",
    svg: (
      <div className="flex items-center gap-2">
        <span className="text-rose-600 font-black text-xl tracking-tighter scale-y-110 font-serif">
          N
        </span>
        <div className="flex flex-col text-left">
          <span className="font-sans tracking-widest text-xs font-black text-slate-800 group-hover/logo:text-rose-600 transition-colors">
            NETFLIX
          </span>
          <span className="text-[9px] tracking-widest text-slate-500 uppercase font-mono">Studios</span>
        </div>
      </div>
    ),
  },
  {
    id: "bbc",
    name: "BBC Studios",
    category: "Broadcast & Documentary",
    svg: (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-0.5">
          <div className="w-4 h-4 bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">B</div>
          <div className="w-4 h-4 bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">B</div>
          <div className="w-4 h-4 bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">C</div>
        </div>
        <span className="text-xs tracking-widest font-sans font-bold text-slate-800 group-hover/logo:text-[#DC8B20] transition-colors">
          STUDIOS
        </span>
      </div>
    ),
  },
  {
    id: "lvmh",
    name: "LVMH Luxury Group",
    category: "Haute Couture & Commercials",
    svg: (
      <div className="flex flex-col text-left">
        <span className="font-serif tracking-[0.25em] text-sm font-black text-slate-900 group-hover/logo:text-[#DC8B20] transition-colors">
          LVMH
        </span>
        <span className="text-[8px] tracking-widest text-slate-500 uppercase font-serif">
          Moët Hennessy • Louis Vuitton
        </span>
      </div>
    ),
  },
  {
    id: "apple-studios",
    name: "Apple Original Films",
    category: "Original Productions",
    svg: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-800 group-hover/logo:fill-black transition-colors">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.1-1.89.98-2.99-.95.04-2.1.64-2.77 1.42-.58.68-1.1 1.78-.96 2.87 1.06.08 2.13-.54 2.75-1.3" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-sans text-xs font-bold text-slate-800 group-hover/logo:text-black transition-colors">
            Apple Studios
          </span>
          <span className="text-[8px] tracking-widest text-slate-500 uppercase font-mono">Original Films</span>
        </div>
      </div>
    ),
  },
  {
    id: "vogue",
    name: "Vogue Creative Studio",
    category: "High-Fashion Editorial",
    svg: (
      <div className="flex flex-col text-left">
        <span className="font-serif tracking-[0.25em] text-base font-black text-slate-900 group-hover/logo:text-rose-800 transition-colors">
          VOGUE
        </span>
        <span className="text-[8px] tracking-widest text-slate-500 uppercase font-mono">
          Creative Studio
        </span>
      </div>
    ),
  },
  {
    id: "cannes",
    name: "Festival de Cannes",
    category: "Theatrical Market",
    svg: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-600" fill="currentColor">
          <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif tracking-widest text-xs font-bold text-slate-800 group-hover/logo:text-amber-800 transition-colors">
            FESTIVAL DE CANNES
          </span>
          <span className="text-[8px] tracking-widest text-slate-500 uppercase font-mono">Marché du Film</span>
        </div>
      </div>
    ),
  },
  {
    id: "lionsgate",
    name: "Lionsgate Entertainment",
    category: "Motion Picture Group",
    svg: (
      <div className="flex flex-col text-left">
        <span className="font-sans tracking-[0.28em] text-xs font-black text-slate-900 group-hover/logo:text-[#DC8B20] transition-colors">
          LIONSGATE
        </span>
        <span className="text-[8px] tracking-widest text-slate-500 uppercase font-mono">Motion Pictures</span>
      </div>
    ),
  },
];

interface TrustedBySectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function TrustedBySection({
  className = "",
  title = "Trusted by World-Renowned Studios & Global Production Houses",
  subtitle = "Industry Partnerships & Collaborations",
}: TrustedBySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicated list for infinite seamless scrolling loop
  const displayBrands = [...BRAND_LOGOS, ...BRAND_LOGOS];

  // Smooth continuous horizontal auto-scrolling
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animId: number;

    const scrollStep = () => {
      if (!isPaused && el) {
        el.scrollLeft += 0.75;
        // When halfway through the duplicated content, loop back smoothly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Smooth button scrolling
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className={`max-w-7xl mx-auto px-6 space-y-6 ${className}`}>
      {/* Subtle Cinematic Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DC8B20]/50 text-[#DC8B20] text-[11px] font-semibold uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#DC8B20]" />
          <span>{subtitle}</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
      </div>

      {/* Main Reference-Inspired Layout: [ ← ] | [ Scrolling Logos Track ] [ → ] */}
      <div
        className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 relative overflow-hidden flex items-center group/track"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >

        {/* 1. Left Navigation Arrow Button */}
        <button
          type="button"
          onClick={handleScrollLeft}
          aria-label="Scroll logos left"
          className="p-2 sm:p-3 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all shrink-0 cursor-pointer focus:outline-hidden"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
        </button>

        {/* 2. Distinct Vertical Divider Line (Exact styling from reference image) */}
        <div
          className="w-[2px] h-8 sm:h-10 bg-slate-900/80 mx-2 sm:mx-3 shrink-0 rounded-full"
          aria-hidden="true"
        />

        {/* 3. Horizontal Scrolling Track */}
        <div className="relative flex-1 overflow-hidden">
          {/* Subtle Left & Right Edge Vignette Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Scrolling Logos Row */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-6 sm:gap-10 overflow-x-hidden select-none py-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="group/logo shrink-0 px-4 sm:px-6 py-2.5 rounded-xl   flex items-center justify-center min-w-[150px] sm:min-w-[180px] h-14 sm:h-16"
              >
                {brand.svg}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Right Navigation Arrow Button */}
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll logos right"
          className="p-2 sm:p-3 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all shrink-0 cursor-pointer focus:outline-hidden"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
        </button>
      </div>
    </section>
  );
}
