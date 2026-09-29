"use client";

import { useState } from "react";
import Link from "next/link";
import MediaLightbox from "@/components/user/MediaLightbox";
import ProjectCard from "@/components/user/ProjectCard";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Film,
  Eye,
  Clapperboard,
  Share2,
  ShieldCheck,
} from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  clientName: string;
  completionDate: string;
  coverImage: string;
  images?: any;
  videos?: any;
  caseStudy?: string | null;
  isFeatured?: boolean;
}

interface ProjectDetailClientViewProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}

export default function ProjectDetailClientView({
  project,
  relatedProjects,
}: ProjectDetailClientViewProps) {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    url: string;
    type: "image" | "video";
    title?: string;
    description?: string;
  }>({
    isOpen: false,
    url: "",
    type: "image",
  });

  const galleryImages = Array.isArray(project.images) ? project.images : [];
  const projectVideos = Array.isArray(project.videos) ? project.videos : [];
  const primaryVideo = projectVideos.length > 0 ? projectVideos[0] : null;

  return (
    <div className="relative space-y-16 py-12 max-w-7xl mx-auto px-6 min-h-screen">
      <PageAtmosphere variant="portfolio" />
      {/* 1. Back Navigation & Share */}
      <div className="flex items-center justify-between">
        <Link
          href="/portfolio"
          prefetch={true}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#DC8B20] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Catalog</span>
        </Link>

        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
          Case Study ID: {project.slug || project.id.slice(0, 8)}
        </span>
      </div>

      {/* 2. Hero Spotlight Header */}
      <section className="space-y-6">
        {/* Meta badges row */}
        <div
          data-reveal="eyebrow"
          className="flex flex-wrap items-center gap-3"
        >
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DC8B20]/10 text-[#915514] border border-[#DC8B20]/30 shadow-xs">
            {project.category}
          </span>
          {project.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Featured Production</span>
            </span>
          )}
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <Building2 className="w-4 h-4 text-[#DC8B20]" />
            <span>{project.clientName}</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{project.completionDate}</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs text-[#DC8B20] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#DC8B20]" />
            <span>Verified Production</span>
          </div>
        </div>

        <h1
          data-reveal="heading"
          className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight"
        >
          {project.title}
        </h1>

        <p
          data-reveal="tagline"
          className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl"
        >
          {project.description}
        </p>

        {/* Hero Cinematic Media Showcase */}
        <div
          data-reveal="fade-up"
          data-reveal-delay="100"
          className="group relative rounded-3xl overflow-hidden glass-panel bg-slate-950 border border-slate-200 aspect-[21/9] shadow-xl mt-8 shine-sweep"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Atmospheric vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2a1703]/95 via-transparent to-transparent mix-blend-multiply" />

          {/* Interactive Play Trailer Overlay if video exists */}
          {primaryVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() =>
                  setLightbox({
                    isOpen: true,
                    url: primaryVideo.url,
                    type: "video",
                    title: primaryVideo.title || `${project.title} - Official Video`,
                    description: `Client: ${project.clientName}`,
                  })
                }
                className="group/btn p-5 rounded-full bg-[#DC8B20]/25 hover:bg-[#DC8B20] text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 pl-6 pr-7 border border-[#DC8B20]/40"
              >
                <Play className="w-6 h-6 fill-white transition-transform group-hover/btn:scale-110" />
                <span className="text-sm font-bold tracking-wide uppercase">
                  {primaryVideo.title || "Watch Trailer"}
                </span>
              </button>
            </div>
          )}

          {/* Bottom strip in hero photo */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white drop-shadow-md">
            <span className="font-semibold tracking-wider uppercase text-[#f7cc74]">
              {project.clientName}
            </span>
            <span className="text-slate-300 font-mono">
              Released: {project.completionDate}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Detailed Scope & Sidebar */}
      <section className="grid grid-cols-12 gap-10">
        {/* Main Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Case Study Details */}
          {project.caseStudy && (
            <div
              data-reveal="fade-up"
              className="glass-panel bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-[#DC8B20] text-xs font-bold uppercase tracking-wider">
                <Clapperboard className="w-4 h-4" />
                <span>Production Narrative & Case Study</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Behind the Scenes & Production Scope
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 pt-2">
                {project.caseStudy}
              </div>
            </div>
          )}

          {/* Standard Project Execution Deliverables */}
          <div
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs"
          >
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Tree Media Production Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  Principal Actor & Runway Model Casting
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  SAG-AFTRA & International Union Compliance
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  High-Resolution Commercial & Cinema Stills
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">
                  Post-Production Voiceover ADR & Localization
                </span>
              </div>
            </div>
          </div>

          {/* Production Stills Gallery with Lightbox */}
          {galleryImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3
                    data-reveal="heading"
                    className="text-2xl font-bold text-slate-900 tracking-tight"
                  >
                    Production Stills & Editorial Stills
                  </h3>
                  <p
                    data-reveal="tagline"
                    className="text-xs text-slate-500"
                  >
                    Click any image to view full high-definition resolution.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {galleryImages.length} Photographs
                </span>
              </div>

              <div
                data-reveal="stagger"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {galleryImages.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() =>
                      setLightbox({
                        isOpen: true,
                        url: img,
                        type: "image",
                        title: `${project.title} - Still #${i + 1}`,
                        description: `Client: ${project.clientName}`,
                      })
                    }
                    className="group/img relative rounded-2xl overflow-hidden glass-panel bg-slate-900 border border-slate-200 aspect-video shadow-xs cursor-pointer shine-sweep"
                  >
                    <img
                      src={img}
                      alt={`${project.title} Still ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div
            data-reveal="fade-up"
            data-reveal-delay="150"
            className="glass-panel bg-white p-7 rounded-3xl border border-[#DC8B20]/30 shadow-md space-y-6 sticky top-28"
          >
            <div>
              <span className="text-xs font-bold text-[#DC8B20] uppercase tracking-wider block">
                Production Engagement
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Produce Similar Work
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect with our commercial production desk for creative briefs, director reels, and talent availability.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={`/contact?projectId=${project.id}`}
                prefetch={true}
                className="w-full py-3.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-bold text-xs shadow-md shadow-[#DC8B20]/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
              >
                <span>Request Production Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/profiles"
                prefetch={true}
                className="w-full py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center justify-center transition-colors"
              >
                Browse Matching Artists
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Production Specs
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Client Partner</span>
                  <span className="font-semibold text-slate-800">
                    {project.clientName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Category</span>
                  <span className="font-semibold text-slate-800">
                    {project.category}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Completion</span>
                  <span className="font-semibold text-slate-800">
                    {project.completionDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Productions Grid */}
      {relatedProjects.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex items-end justify-between">
            <div>
              <span
                data-reveal="eyebrow"
                className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider block"
              >
                More Case Studies
              </span>
              <h2
                data-reveal="heading"
                className="text-3xl font-bold text-slate-900 tracking-tight mt-1"
              >
                Explore Related Productions
              </h2>
            </div>
            <Link
              href="/portfolio"
              prefetch={true}
              className="text-xs font-bold text-[#DC8B20] hover:text-[#DC8B20] flex items-center gap-1.5"
            >
              <span>View All Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div
            data-reveal="stagger"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {relatedProjects.slice(0, 3).map((p, idx) => (
              <ProjectCard key={p.id} project={p} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Lightbox Modal */}
      <MediaLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        mediaUrl={lightbox.url}
        mediaType={lightbox.type}
        title={lightbox.title}
        description={lightbox.description}
      />
    </div>
  );
}
