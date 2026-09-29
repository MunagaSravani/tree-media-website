"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

export interface AgencyStat {
  id: string;
  label: string;
  value: string;
  displayOrder?: number;
  isActive?: boolean;
  colorClass?: string;
}

interface LiveStatsCounterProps {
  stats: AgencyStat[];
  className?: string;
  showLiveBadge?: boolean;
  enableLiveTicker?: boolean;
}

// 4 complete cycles of 0..9 (40 digits total)
// Cycle 0: 0-9, Cycle 1: 10-19, Cycle 2: 20-29 (standard landing cycle), Cycle 3: 30-39
const REEL_DIGITS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

interface Token {
  id: string;
  type: "digit" | "symbol";
  char: string;
  digit?: number;
}

function parseTokens(str: string): Token[] {
  return str.split("").map((char, index) => {
    const isDigit = /\d/.test(char);
    return {
      id: `${index}-${char}`,
      type: isDigit ? "digit" : "symbol",
      char,
      digit: isDigit ? parseInt(char, 10) : undefined,
    };
  });
}

/**
 * VerticalDigitReel
 * Single digit with a vertical rolling odometer strip.
 */
function VerticalDigitReel({
  digit,
  isAnimated,
  delayMs = 0,
  durationMs = 1400,
  isLiveUpdate = false,
  colorClass = "emerald-gradient-text",
}: {
  digit: number;
  isAnimated: boolean;
  delayMs?: number;
  durationMs?: number;
  isLiveUpdate?: boolean;
  colorClass?: string;
}) {
  // Target index in cycle 2 (index 20 to 29)
  const clampedDigit = Math.max(0, Math.min(9, digit));
  const targetIndex = 20 + clampedDigit;
  const activeIndex = isAnimated ? targetIndex : 0;
  const total = REEL_DIGITS.length;

  return (
    <span
      className="inline-block relative overflow-hidden align-baseline tabular-nums select-none"
      style={{
        height: "1.18em",
        lineHeight: "1.18em",
        verticalAlign: "-0.06em",
        width: "0.62em",
        textAlign: "center",
      }}
    >
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: `translateY(-${(activeIndex / total) * 100}%)`,
          transitionProperty: "transform",
          transitionDuration: isLiveUpdate ? "450ms" : `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: isLiveUpdate ? "0ms" : `${delayMs}ms`,
        }}
      >
        {REEL_DIGITS.map((d, i) => (
          <span
            key={i}
            className={`flex items-center justify-center font-black ${colorClass}`}
            style={{
              height: "1.18em",
              lineHeight: "1.18em",
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * StatCounterCard
 * Individual column displaying the vertically animated live value and label.
 */
function StatCounterCard({
  stat,
  cardIndex,
  isParentVisible,
  onReRoll,
  liveIncrement = 0,
}: {
  stat: AgencyStat;
  cardIndex: number;
  isParentVisible: boolean;
  onReRoll?: () => void;
  liveIncrement?: number;
}) {
  const [internalAnimated, setInternalAnimated] = useState(false);
  const [recentLiveTick, setRecentLiveTick] = useState(false);

  // Apply live increment to base number if active
  const displayValue = useMemo(() => {
    if (!liveIncrement) return stat.value;
    const match = stat.value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return stat.value;
    const [, prefix, numStr, suffix] = match;
    const newNum = parseInt(numStr, 10) + liveIncrement;
    return `${prefix}${newNum}${suffix}`;
  }, [stat.value, liveIncrement]);

  const tokens = useMemo(() => parseTokens(displayValue), [displayValue]);

  useEffect(() => {
    if (isParentVisible) {
      setInternalAnimated(true);
    }
  }, [isParentVisible]);

  useEffect(() => {
    if (liveIncrement > 0) {
      setRecentLiveTick(true);
      const timer = setTimeout(() => setRecentLiveTick(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [liveIncrement]);

  const handleCardClick = () => {
    setInternalAnimated(false);
    setTimeout(() => setInternalAnimated(true), 60);
    if (onReRoll) onReRoll();
  };

  const cardBaseDelay = cardIndex * 150;

  return (
    <div
      onClick={handleCardClick}
      className="group relative text-center px-4 sm:px-6 first:pl-0 last:pr-0 space-y-1 cursor-pointer select-none transition-transform duration-300 hover:-translate-y-1"
      title="Click to re-animate live count"
    >
      {/* Live tick notification micro-pill */}
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 z-30 ${
          recentLiveTick ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90"
        }`}
      >
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DC8B20] text-white text-[10px] font-bold shadow-md shadow-[#DC8B20]/25">
          <Sparkles className="w-2.5 h-2.5 animate-spin" />
          <span>+1 LIVE</span>
        </span>
      </div>

      {/* Main Counter Display with Vertical Rolling Digits */}
      <div className="relative inline-flex items-center justify-center text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
        {tokens.map((token, idx) => {
          if (token.type === "digit") {
            const digitDelay = cardBaseDelay + idx * 110;
            const digitDuration = 1200 + idx * 140;

            return (
              <VerticalDigitReel
                key={token.id}
                digit={token.digit!}
                isAnimated={internalAnimated}
                delayMs={digitDelay}
                durationMs={digitDuration}
                isLiveUpdate={recentLiveTick}
                colorClass={stat.colorClass}
              />
            );
          }

          // Non-digit symbol (e.g. '+', '%', '$')
          return (
            <span
              key={token.id}
              className={`inline-block font-black transition-all duration-700 ease-out select-none ${
                stat.colorClass || "emerald-gradient-text"
              }`}
              style={{
                transform: internalAnimated ? "translateY(0) scale(1)" : "translateY(8px) scale(0.85)",
                opacity: internalAnimated ? 1 : 0.2,
                transitionDelay: `${cardBaseDelay + 320}ms`,
                marginLeft: "0.06em",
              }}
            >
              {token.char}
            </span>
          );
        })}
      </div>

      {/* Metric Label matching the exact screenshot design */}
      <div className="text-xs uppercase font-extrabold tracking-wider text-slate-500 group-hover:text-[#DC8B20] transition-colors duration-200">
        {stat.label}
      </div>
    </div>
  );
}

/**
 * LiveStatsCounter
 * Drop-in, responsive, vertically-animated live statistics bar.
 * Matches the exact card aesthetic from the design while powering vertical number animation.
 */
export default function LiveStatsCounter({
  stats,
  className = "",
  showLiveBadge = true,
  enableLiveTicker = true,
}: LiveStatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [liveIncrements, setLiveIncrements] = useState<Record<string, number>>({});

  // Viewport intersection observer to start vertical animation smoothly
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);

    // If visible on initial mount, trigger quickly
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), 80);
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  // Periodic subtle live counter updates:
  // Every 12 seconds, subtly updates one counter with vertical roll animation
  useEffect(() => {
    if (!isVisible || !enableLiveTicker || !stats || stats.length === 0) return;

    const interval = setInterval(() => {
      const eligibleStats = stats.filter((s) => /\d+/.test(s.value));
      if (eligibleStats.length === 0) return;

      const randomStat = eligibleStats[Math.floor(Math.random() * eligibleStats.length)];
      setLiveIncrements((prev) => {
        const currentInc = prev[randomStat.id] || 0;
        const nextInc = currentInc >= 3 ? 1 : currentInc + 1;
        return {
          ...prev,
          [randomStat.id]: nextInc,
        };
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [isVisible, enableLiveTicker, stats]);

  const handleGlobalReRoll = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 60);
  };

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-reveal="stagger"
      className={`glass-panel bg-white rounded-3xl border border-slate-200 backdrop-blur-2xl relative transition-all duration-300 ${className || "p-8 shadow-xl"}`}
    >
      {/* Discreet Live Indicator Dot in Top-Right Corner */}
      {showLiveBadge && (
        <div
          onClick={handleGlobalReRoll}
          title="Live Verified Metric Stream • Click to re-sync"
          className="absolute top-3.5 right-5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DC8B20]/10 border border-[#DC8B20]/25 text-[#915514] text-[10px] font-extrabold uppercase tracking-wider cursor-pointer hover:bg-[#DC8B20]/15 transition-colors shadow-2xs select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f1b343] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC8B20]"></span>
          </span>
          <span>Live Count</span>
          <RefreshCw className="w-2.5 h-2.5 ml-0.5 opacity-60 hover:opacity-100 hover:rotate-180 transition-all duration-500" />
        </div>
      )}

      {/* 4 Columns matching the exact screenshot layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 gap-y-6 md:gap-y-0">
        {stats.map((st, idx) => (
          <div
            key={st.id}
            data-reveal="fade-up"
            data-reveal-delay={String((idx + 1) * 100)}
            className={`${idx >= 2 ? "pt-6 md:pt-0" : ""} ${idx % 2 === 1 ? "pl-2 md:pl-0" : ""}`}
          >
            <StatCounterCard
              stat={st}
              cardIndex={idx}
              isParentVisible={isVisible}
              liveIncrement={liveIncrements[st.id] || 0}
              onReRoll={handleGlobalReRoll}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
