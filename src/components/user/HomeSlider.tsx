"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface SlideData {
  id: string;
  image: string;
  eyebrow: string;
  statNumber: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

const SLIDES: SlideData[] = [
  {
    id: "slide-1",
    // Local static asset matching reference image
    image: "/images/slider/slide-1-vocalist.jpg",
    eyebrow: "GLOBAL TALENT & ENTERTAINMENT NETWORK",
    statNumber: "OVER 350+",
    title: "SELF-REGISTERED ARTISTS, VOCALISTS & COUNTING...",
    description:
      "Tree Media represents visionary performing artists, renowned singers, and live performers connecting with premier concert tours, global studios, and commercial campaigns.",
    primaryBtnText: "AUDITIONS",
    primaryBtnLink: "/auditions",
    secondaryBtnText: "Explore Talents",
    secondaryBtnLink: "/profiles",
  },
  {
    id: "slide-2",
    // Local static asset: Cinematic production set
    image: "/images/slider/slide-2-cinema.jpg",
    eyebrow: "CINEMATIC FEATURE PRODUCTIONS",
    statNumber: "480+ GLOBAL",
    title: "FILM PRODUCTIONS & PREMIER CASTING DIRECTORS...",
    description:
      "Direct talent casting for award-winning feature films, television dramas, and cinematic brand narratives backed by international studio heads and creative directors.",
    primaryBtnText: "VIEW PROJECTS",
    primaryBtnLink: "/portfolio",
    secondaryBtnText: "Our Services",
    secondaryBtnLink: "/services",
  },
  {
    id: "slide-3",
    // Local static asset: Editorial fashion runway
    image: "/images/slider/slide-3-pageant.jpg",
    eyebrow: "HIGH-FASHION & EDITORIAL MANAGEMENT",
    statNumber: "85+ FORTUNE",
    title: "BRAND CLIENTS & INTERNATIONAL RUNWAY CAMPAIGNS...",
    description:
      "Representing elite editorial models, commercial faces, and visionary creators commanding luxury brand partnerships and magazine cover spreads worldwide.",
    primaryBtnText: "BOOK TALENT",
    primaryBtnLink: "/contact",
    secondaryBtnText: "Discover Roster",
    secondaryBtnLink: "/profiles",
  },
];

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  function prevSlide() {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
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
    <section
      aria-label="Tree Media Featured Showcase Slider"
      className="relative w-full overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => {
          const isActive = currentSlide === index;
          const isPageantSlide = slide.id === "slide-3" || index === SLIDES.length - 1;
          return (
            <div
              key={slide.id}
              className="relative w-full shrink-0 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center"
            >
              {/* Background Image & Cinematic Presentation Layer */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {isPageantSlide ? (
                  <>
                    {/* 1. Base Image: Grand International Beauty Pageant / Premium Casting Stage Film Grade */}
                    {/* Very slow cinematic zoom-in → gentle zoom-out → zoom-in with subtle live camera pan */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center contrast-[1.18] brightness-[0.95] saturate-[1.10] animate-pageant-camera will-change-transform"
                      />
                    </div>

                    {/* 2. Grand Warm Stage Spotlights (3200K Tungsten Key Light Beams on Catwalk & Model) */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-85"
                      style={{
                        background:
                          "radial-gradient(ellipse 48% 65% at 35% 15%, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.10) 42%, transparent 72%), radial-gradient(ellipse 48% 65% at 67% 15%, rgba(245, 158, 11, 0.26) 0%, rgba(217, 119, 6, 0.09) 42%, transparent 72%), radial-gradient(ellipse 38% 28% at 51% 78%, rgba(251, 191, 36, 0.22) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 80%)",
                      }}
                    />

                    {/* 3. Soft Cool Diamond & Ice-Cyan Highlights (5600K Clean Spotlight & Precision Rim) */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-80"
                      style={{
                        background:
                          "radial-gradient(ellipse 26% 55% at 50% 22%, rgba(240, 249, 255, 0.32) 0%, rgba(56, 189, 248, 0.15) 38%, transparent 70%), radial-gradient(ellipse 36% 55% at 14% 45%, rgba(56, 189, 248, 0.10) 0%, transparent 60%), radial-gradient(ellipse 36% 55% at 88% 45%, rgba(56, 189, 248, 0.12) 0%, transparent 60%)",
                      }}
                    />

                    {/* 4. Atmospheric Light Bloom & Controlled Pageant Haze Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-65 animate-pageant-atmosphere"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 50% 36%, rgba(255, 255, 255, 0.22) 0%, rgba(251, 191, 36, 0.14) 30%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)",
                      }}
                    />

                    {/* 5. Overhead Stage Truss Halo & Anamorphic Beam Shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 animate-pageant-beam"
                      style={{
                        background:
                          "radial-gradient(ellipse 60% 8% at 50% 16%, rgba(255, 255, 255, 0.35) 0%, rgba(245, 158, 11, 0.20) 40%, rgba(56, 189, 248, 0.10) 70%, transparent 95%), radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.25) 0%, rgba(245, 158, 11, 0.08) 25%, transparent 55%)",
                      }}
                    />

                    {/* 6. Deep Peripheral Arena Vignette (Draws focus to runway subject, deepens contrast in arena) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 82% 72% at 52% 46%, transparent 34%, rgba(2, 6, 23, 0.42) 68%, rgba(2, 6, 23, 0.88) 100%)",
                      }}
                    />

                    {/* 7. Multi-Stop Dark Directional Gradient Overlay (Preserves 100% Text Readability) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(2, 6, 23, 0.94) 0%, rgba(2, 6, 23, 0.84) 30%, rgba(2, 6, 23, 0.52) 52%, rgba(2, 6, 23, 0.16) 74%, transparent 92%)",
                      }}
                    />

                    {/* 8. Top & Bottom Cinematic Edge Shading */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/75 via-slate-950/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <>
                    {/* 1. Base Image with subtle film grade (elevated contrast, deep rich blacks, natural skin tones) */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`w-full h-full object-cover object-center contrast-[1.08] brightness-[0.97] saturate-[1.05] transition-transform duration-[6000ms] ease-out will-change-transform ${
                        isActive ? "scale-[1.05]" : "scale-[1.01]"
                      }`}
                    />

                    {/* 2. Warm Studio / Key Lighting (3200K tungsten / golden amber key light glow) */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
                      style={{
                        background:
                          "radial-gradient(ellipse 65% 55% at 72% 28%, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.06) 45%, transparent 75%)",
                      }}
                    />

                    {/* 3. Subtle Cool Cinematic Rim Lighting (4800K teal / cyan rim reflection for subject separation) */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-65"
                      style={{
                        background:
                          "radial-gradient(ellipse 55% 65% at 94% 68%, rgba(56, 189, 248, 0.12) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 70%), radial-gradient(ellipse 45% 35% at 48% 6%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)",
                      }}
                    />

                    {/* 4. Atmospheric Light Bloom & Soft Light Falloff */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-50"
                      style={{
                        background:
                          "radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.15) 0%, rgba(245, 158, 11, 0.08) 35%, transparent 70%)",
                      }}
                    />

                    {/* 5. Deep Cinematic Peripheral Vignette (Draws focus to center/subjects, deeper blacks at edges) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 85% 75% at 60% 45%, transparent 40%, rgba(2, 6, 23, 0.35) 70%, rgba(2, 6, 23, 0.85) 100%)",
                      }}
                    />

                    {/* 6. Sophisticated Multi-Stop Dark Directional Gradient Overlay behind text for flawless readability */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(2, 6, 23, 0.92) 0%, rgba(2, 6, 23, 0.82) 28%, rgba(2, 6, 23, 0.55) 50%, rgba(2, 6, 23, 0.18) 72%, transparent 92%)",
                      }}
                    />

                    {/* 7. Subtle Top & Bottom Cinematic Edge Shading */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
                  </>
                )}
              </div>

              {/* Slide Content Box */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16">
                <div
                  key={`slide-text-${slide.id}-${isActive}`}
                  className={`max-w-2xl space-y-4 text-white transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Eyebrow badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC8B20]/20 backdrop-blur-md border border-[#DC8B20]/40 text-[#f7cc74] text-xs font-semibold tracking-wider uppercase ${
                      isActive ? "animate-hero-eyebrow" : ""
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#DC8B20]" />
                    <span>{slide.eyebrow}</span>
                  </div>

                  {/* Big Stat / Heading Overlay (Matching Reference Image) */}
                  <div className="space-y-1">
                    <div
                      className={`text-2xl sm:text-3xl font-mono font-black tracking-widest text-[#DC8B20] ${
                        isActive ? "animate-hero-stat" : ""
                      }`}
                    >
                      {slide.statNumber}
                    </div>
                    <h2
                      className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-md ${
                        isActive ? "animate-hero-title" : ""
                      }`}
                    >
                      {slide.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl font-normal drop-shadow-sm ${
                      isActive ? "animate-hero-desc" : ""
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div
                    className={`flex flex-wrap items-center gap-3 pt-3 ${
                      isActive ? "animate-hero-actions" : ""
                    }`}
                  >
                    <Link
                      href={slide.primaryBtnLink}
                      prefetch={true}
                      className="px-7 py-3 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] active:scale-98 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#DC8B20]/25 hover:shadow-[#DC8B20]/25 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {slide.secondaryBtnText && slide.secondaryBtnLink && (
                      <Link
                        href={slide.secondaryBtnLink}
                        prefetch={true}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/25 hover:border-white/50 transition-all cursor-pointer"
                      >
                        {slide.secondaryBtnText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow: Previous (Matching Reference Image) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/35 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 -ml-0.5" />
      </button>

      {/* Navigation Arrow: Next (Matching Reference Image) */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/35 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 -mr-0.5" />
      </button>

      {/* Slide Indicators / Dots (Bottom Center, matching reference image) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx
                ? "w-7 h-2.5 bg-[#f1b343] shadow-sm shadow-[#DC8B20]/25"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
