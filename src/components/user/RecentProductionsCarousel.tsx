"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

export interface ProjectData {
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

interface RecentProductionsCarouselProps {
  projects: ProjectData[];
}

export default function RecentProductionsCarousel({
  projects,
}: RecentProductionsCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Guarantee at least 3 distinct cards in base list so 3 are always available
  const baseList = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    if (projects.length === 1) return [projects[0], projects[0], projects[0]];
    if (projects.length === 2) return [projects[0], projects[1], projects[0]];
    return projects;
  }, [projects]);

  // Quadruple items to create an infinite, seamless continuous scrolling stream
  const displayItems = useMemo(() => {
    if (baseList.length === 0) return [];
    return [...baseList, ...baseList, ...baseList, ...baseList];
  }, [baseList]);

  // Smooth continuous horizontal auto-scroll via requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    if (!container || baseList.length === 0) return;

    let animId: number;
    const speed = 0.75; // Smooth cinematic pixels per frame (~45px per second)

    const scrollStep = () => {
      if (!isPausedRef.current && container) {
        container.scrollLeft += speed;

        const firstCard = container.querySelector<HTMLElement>(".project-card-wrapper");
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;
          const gap = 24; // matches gap-6
          const singleCycleWidth = baseList.length * (cardWidth + gap);

          // Seamless loop back when one full set has scrolled past
          if (container.scrollLeft >= singleCycleWidth) {
            container.scrollLeft -= singleCycleWidth;
          }
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [baseList.length]);

  // Pause immediately on mouse enter; resume immediately on mouse leave
  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsHovered(false);
  };

  // Manual sliding with Left/Right arrows
  const slide = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(".project-card-wrapper");
    const step = firstCard ? firstCard.offsetWidth + 24 : 410;
    const singleCycleWidth = baseList.length * step;

    if (direction === "left") {
      if (container.scrollLeft <= 10) {
        container.scrollLeft += singleCycleWidth;
      }
      container.scrollBy({ left: -step, behavior: "smooth" });
    } else {
      if (container.scrollLeft >= singleCycleWidth * 2) {
        container.scrollLeft -= singleCycleWidth;
      }
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  if (displayItems.length === 0) return null;

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Left Navigation Arrow ‹ */}
      <button
        type="button"
        onClick={() => slide("left")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Slide Left"
        className="absolute -left-2 sm:-left-4 top-[215px] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#DC8B20] shadow-lg hover:shadow-2xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
      >
        <span className="text-2xl sm:text-3xl font-light leading-none -mt-1 select-none group-hover:-translate-x-0.5 transition-transform">
          ‹
        </span>
      </button>

      {/* Right Navigation Arrow › */}
      <button
        type="button"
        onClick={() => slide("right")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Slide Right"
        className="absolute -right-2 sm:-right-4 top-[215px] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#DC8B20] shadow-lg hover:shadow-2xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
      >
        <span className="text-2xl sm:text-3xl font-light leading-none -mt-1 select-none group-hover:translate-x-0.5 transition-transform">
          ›
        </span>
      </button>

      {/* Horizontal Carousel Track:
          - Shows EXACTLY 3 cards at a time on desktop (lg:w-[calc((100%-48px)/3)])
          - All cards have exact same width and fixed height (h-[430px])
          - overflow-y: hidden ensures ZERO vertical movement or page-scroll drift
          - overflow-x: hidden keeps the track perfectly horizontal and clean
      */}
      <div
        ref={containerRef}
        className="flex items-stretch gap-6 overflow-x-hidden overflow-y-hidden py-3 px-1 select-none"
        style={{ scrollBehavior: "auto" }}
      >
        {displayItems.map((proj, idx) => (
          <div
            key={`${proj.id}-${idx}`}
            className="project-card-wrapper shrink-0 grow-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] h-[430px] min-h-[430px] max-h-[430px]"
          >
            <ProjectCard
              project={proj}
              index={idx}
              isCenterHighlighted={false}
            />
          </div>
        ))}
      </div>

      {/* View All Work Button directly below the 3-card row with clean, normal spacing */}
      <div className="flex items-center justify-center pt-6 sm:pt-7">
        <Link
          href="/portfolio"
          prefetch={true}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#DC8B20] hover:bg-[#DC8B20] active:scale-98 text-white font-bold text-sm shadow-xl shadow-[#DC8B20]/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          <span>View All Work</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
