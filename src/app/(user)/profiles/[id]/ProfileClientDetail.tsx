"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/user/EnquiryModal";
import MediaLightbox from "@/components/user/MediaLightbox";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
  Play,
  ExternalLink,
  Instagram,
  Film,
  CheckCircle2,
  Award,
  Globe,
  Share2,
} from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

interface ProfileClientDetailProps {
  profile: any;
}

export default function ProfileClientDetail({ profile }: ProfileClientDetailProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    url: string;
    type: "image" | "video";
    title?: string;
  }>({
    isOpen: false,
    url: "",
    type: "image",
  });

  const skillsList = Array.isArray(profile.skills) ? profile.skills : [];
  const languagesList = Array.isArray(profile.languages) ? profile.languages : [];
  const portfolioPhotos = Array.isArray(profile.portfolioImages) ? profile.portfolioImages : [];
  const videoReels = Array.isArray(profile.videos) ? profile.videos : [];
  const previousProjects = Array.isArray(profile.previousProjects) ? profile.previousProjects : [];
  const socials = profile.socialLinks || {};

  return (
    <div className="relative space-y-16 py-12 max-w-7xl mx-auto px-6 min-h-screen">
      <PageAtmosphere variant="profiles" />
      {/* Back button */}
      <Link
        href="/profiles"
        prefetch={true}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Talent Directory</span>
      </Link>

      {/* Main Spotlight Header */}
      <div className="grid grid-cols-12 gap-10 items-start">
        {/* Left Column: Portrait and Quick Specs */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div
            data-reveal="fade-up"
            className="rounded-3xl overflow-hidden glass-panel bg-white border border-slate-200 aspect-[3/4] relative shadow-md group"
          >
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#DC8B20] border border-slate-200 shadow-xs">
                {profile.category}
              </span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="glass-panel bg-white p-5 rounded-3xl border border-slate-200 grid grid-cols-2 gap-4 text-xs shadow-xs"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Gender</span>
              <span className="text-slate-900 font-bold">{profile.gender}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Age</span>
              <span className="text-slate-900 font-bold">{profile.age} Years Old</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Height</span>
              <span className="text-slate-900 font-bold">{profile.height || "N/A"}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Experience</span>
              <span className="text-slate-900 font-bold">{profile.experienceYears} Years</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-100 space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Location</span>
              <span className="text-slate-900 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#DC8B20]" />
                {profile.location}
              </span>
            </div>
          </div>

          {/* Action Button: Book Talent */}
          <button
            data-reveal="fade-up"
            data-reveal-delay="150"
            onClick={() => setModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-bold text-sm shadow-md shadow-[#DC8B20]/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book or Inquire About {profile.name}</span>
          </button>
        </div>

        {/* Right Column: Bio, Skills, Languages, Projects */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div>
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono uppercase tracking-widest text-[#DC8B20] font-semibold block"
            >
              Tree Media Exclusive Representation
            </span>
            <h1
              data-reveal="heading"
              className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1"
            >
              {profile.name}
            </h1>
            <p
              data-reveal="tagline"
              className="text-base text-slate-600 italic mt-3 leading-relaxed"
            >
              "{profile.shortBio}"
            </p>
          </div>

          {/* Artistic Biography */}
          <div
            data-reveal="fade-up"
            className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs"
          >
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Artist Biography & Lineage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {profile.fullBio}
            </p>
          </div>

          {/* Skills and Languages Pills */}
          <div
            data-reveal="stagger"
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass-panel bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Specialized Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {skillsList.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Spoken Languages
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {languagesList.map((lang: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/30"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Previous Film & Brand Credits */}
          {previousProjects.length > 0 && (
            <div className="glass-panel bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Selected Credits & Past Productions
              </h3>
              <div className="divide-y divide-slate-100">
                {previousProjects.map((proj: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-slate-900">{proj.title}</h5>
                      <p className="text-slate-500">{proj.role} {proj.client ? `• ${proj.client}` : ""}</p>
                    </div>
                    <span className="font-mono text-[#DC8B20] font-semibold text-[11px]">{proj.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs text-slate-500 font-medium">Official Links:</span>
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs text-slate-700 hover:text-pink-600 transition-colors border border-slate-200 shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram</span>
              </a>
            )}
            {socials.imdb && (
              <a
                href={socials.imdb}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs text-slate-700 hover:text-amber-700 transition-colors border border-slate-200 shadow-xs"
              >
                <Film className="w-3.5 h-3.5 text-amber-600" />
                <span>IMDb Profile</span>
              </a>
            )}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs text-slate-700 hover:text-red-600 transition-colors border border-slate-200 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 text-red-600" />
                <span>Video Reel</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Photo Gallery Showcase */}
      {portfolioPhotos.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-slate-200">
          <div>
            <h3
              data-reveal="heading"
              className="text-2xl font-bold text-slate-900 tracking-tight"
            >
              Portfolio Gallery
            </h3>
            <p
              data-reveal="tagline"
              className="text-xs text-slate-500 mt-1"
            >
              High-definition editorial & commercial photography
            </p>
          </div>

          <div
            data-reveal="stagger"
            className="grid grid-cols-3 gap-6"
          >
            {portfolioPhotos.map((photoUrl: string, idx: number) => (
              <div
                key={idx}
                onClick={() =>
                  setLightbox({
                    isOpen: true,
                    url: photoUrl,
                    type: "image",
                    title: `${profile.name} - Portfolio Photo #${idx + 1}`,
                  })
                }
                className="rounded-2xl overflow-hidden glass-panel bg-white border border-slate-200 aspect-[3/4] cursor-pointer group relative shadow-sm"
              >
                <img
                  src={photoUrl}
                  alt={`Portfolio ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-semibold shadow-md">
                    Click to View Full Size
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Showreels */}
      {videoReels.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-slate-200">
          <div>
            <h3
              data-reveal="heading"
              className="text-2xl font-bold text-slate-900 tracking-tight"
            >
              Directorial & Video Reels
            </h3>
            <p
              data-reveal="tagline"
              className="text-xs text-slate-500 mt-1"
            >
              Screen performances, audition tapes, and cinema cuts
            </p>
          </div>

          <div
            data-reveal="stagger"
            className="grid grid-cols-2 gap-6"
          >
            {videoReels.map((vid: any, idx: number) => (
              <div
                key={idx}
                onClick={() =>
                  setLightbox({
                    isOpen: true,
                    url: vid.url,
                    type: "video",
                    title: vid.title,
                  })
                }
                className="glass-panel bg-white p-4 rounded-3xl border border-slate-200 space-y-3 cursor-pointer group shadow-xs"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={vid.thumbnail || profile.profileImage}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#DC8B20]/25 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{vid.title}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <MediaLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        mediaUrl={lightbox.url}
        mediaType={lightbox.type}
        title={lightbox.title}
      />

      {/* Direct Booking Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProfileId={profile.id}
        defaultProfileName={profile.name}
      />
    </div>
  );
}
