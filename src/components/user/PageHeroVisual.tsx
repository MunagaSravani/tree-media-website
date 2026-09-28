"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Film, Clapperboard, Camera } from "lucide-react";

export interface HeroVisualSlide {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  badge?: string;
}

interface PageHeroVisualProps {
  slides: [HeroVisualSlide, HeroVisualSlide, HeroVisualSlide];
  pageCategory: string;
  aspectBadge?: string;
  className?: string;
}

export default function PageHeroVisual({
  slides,
  pageCategory,
  aspectBadge = "2.39:1 CINEMASCOPE • SOUNDSTAGE ATMOSPHERE",
  className = "",
}: PageHeroVisualProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance every 5.5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  function prevSlide() {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartX.current = null;
  }

  return (
    <div className={`max-w-7xl mx-auto px-6 mb-12 sm:mb-16 ${className}`}>
      <section
        aria-label={`${pageCategory} Cinematic Visual Showcase`}
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.39/1] min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] bg-slate-950 select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with Cinematic Cross-Fade and Ken Burns Zoom */}
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={slide.image + index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out will-change-transform ${
                  isActive ? "scale-[1.05]" : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* 1. Cinematic Gradient Vignettes for Superior Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-transparent to-slate-950/40 z-20 pointer-events-none" />

        {/* 2. Anamorphic Lens Flare & Ambient Lighting Sweep */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none z-20" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none z-20" />

        {/* 3. Top Film Metadata Badges */}
        <div className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{pageCategory}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/15 text-slate-300 text-[10px] font-mono tracking-widest uppercase">
            <Clapperboard className="w-3 h-3 text-emerald-400" />
            <span>{aspectBadge}</span>
          </div>
        </div>

        {/* 4. Active Slide Text Content (Bottom Left with Staggered Entrance) */}
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          if (!isActive) return null;
          return (
            <div
              key={`caption-${slide.image}-${index}`}
              className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 sm:right-28 z-30 space-y-2.5 max-w-3xl"
            >
              {/* Category / Sub-tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase animate-hero-eyebrow">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{slide.tag}</span>
              </div>

              {/* Slide Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-md animate-hero-title">
                {slide.title}
              </h2>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal max-w-2xl drop-shadow-sm animate-hero-desc">
                {slide.subtitle}
              </p>
            </div>
          );
        })}

        {/* 5. Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous visual slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next visual slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
        </button>

        {/* 6. Slide Indicators / Pagination Dots (Bottom Right) */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to visual slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? "w-7 h-2 bg-emerald-400 shadow-sm shadow-emerald-400/60"
                  : "w-2 h-2 bg-white/45 hover:bg-white/90"
              }`}
            />
          ))}
          <span className="text-[10px] font-mono text-slate-300 ml-1">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </section>
    </div>
  );
}
