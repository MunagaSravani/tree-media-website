"use client";

import React from "react";
import Link from "next/link";
import { Film, Users, Sparkles, Mic, Video, TrendingUp, ChevronRight } from "lucide-react";
import CinematicTilt from "@/components/user/CinematicTilt";

export interface ServiceCardItem {
  id: string;
  title: string;
  slug?: string | null;
  shortDescription?: string | null;
  image?: string | null;
  icon?: string | null;
  status?: string;
  displayOrder?: number;
}

interface ServiceCardProps {
  service: ServiceCardItem;
  index?: number;
}

const SERVICE_ICONS: Record<string, any> = {
  Users,
  Film,
  Sparkles,
  Mic,
  Video,
  TrendingUp,
};

interface ServiceColorTint {
  id: string;
  name: string;
  wash: string;
  colorBlend: string;
  gradient: string;
  accentText: string;
  badgeBorder: string;
}

// Dynamic color configurations covering emerald, ruby/crimson, golden amber, sapphire, amethyst, and oceanic teal
// const SERVICE_TINTS: ServiceColorTint[] = [
//   {
//     id: "emerald",
//     name: "Emerald Green",
//     wash: "bg-[#2a1703]/80",
//     colorBlend: "bg-[#DC8B20] mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-[#2a1703]/95 via-[#422306]/60 to-[#774614]/40",
//     accentText: "text-[#f7cc74]",
//     badgeBorder: "border-[#DC8B20]/40",
//   },
//   {
//     id: "crimson",
//     name: "Ruby Crimson",
//     wash: "bg-rose-950/70",
//     colorBlend: "bg-rose-600 mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-rose-950/95 via-rose-900/60 to-pink-800/40",
//     accentText: "text-rose-300",
//     badgeBorder: "border-rose-500/40",
//   },
//   {
//     id: "amber",
//     name: "Golden Amber",
//     wash: "bg-amber-950/70",
//     colorBlend: "bg-amber-600 mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-amber-950/95 via-amber-900/60 to-orange-800/40",
//     accentText: "text-amber-300",
//     badgeBorder: "border-amber-500/40",
//   },
//   {
//     id: "sapphire",
//     name: "Sapphire Blue",
//     wash: "bg-blue-950/70",
//     colorBlend: "bg-blue-600 mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-blue-950/95 via-blue-900/60 to-indigo-800/40",
//     accentText: "text-sky-300",
//     badgeBorder: "border-blue-500/40",
//   },
//   {
//     id: "amethyst",
//     name: "Amethyst Violet",
//     wash: "bg-purple-950/70",
//     colorBlend: "bg-purple-600 mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-purple-950/95 via-purple-900/60 to-violet-800/40",
//     accentText: "text-purple-300",
//     badgeBorder: "border-purple-500/40",
//   },
//   {
//     id: "teal",
//     name: "Oceanic Teal",
//     wash: "bg-teal-950/70",
//     colorBlend: "bg-teal-600 mix-blend-color opacity-90",
//     gradient: "bg-gradient-to-t from-teal-950/95 via-teal-900/60 to-cyan-800/40",
//     accentText: "text-teal-300",
//     badgeBorder: "border-teal-500/40",
//   },
// ];
const SERVICE_TINTS: ServiceColorTint[] = [
  {
    id: "amber-gold",
    name: "Tree Gold",
    wash: "bg-[#2a1703]/80",
    colorBlend: "bg-[#DC8B20] mix-blend-color opacity-45",
    gradient: "bg-gradient-to-t from-[#2a1703]/95 via-[#422306]/60 to-[#774614]/40",
    accentText: "text-[#f7cc74]",
    badgeBorder: "border-[#DC8B20]/40",
  },
  {
    id: "crimson",
    name: "Ruby Crimson",
    wash: "bg-rose-950/70",
    colorBlend: "bg-rose-600 mix-blend-color opacity-45",
    gradient: "bg-gradient-to-t from-rose-950/95 via-rose-900/60 to-pink-800/40",
    accentText: "text-rose-300",
    badgeBorder: "border-rose-500/40",
  },
  {
    id: "amber",
    name: "Golden Amber",
    wash: "bg-amber-950/70",
    colorBlend: "bg-amber-600 mix-blend-color opacity-45",
    gradient: "bg-gradient-to-t from-amber-950/95 via-amber-900/60 to-orange-800/40",
    accentText: "text-amber-300",
    badgeBorder: "border-amber-500/40",
  },
 {
  id: "bronze",
  name: "Warm Bronze",
  wash: "bg-[#4A2C12]/70",
  colorBlend: "bg-[#8A5A24] mix-blend-color opacity-45",
  gradient:
    "bg-gradient-to-t from-[#321B09]/95 via-[#633A16]/60 to-[#8A5A24]/40",
  accentText: "text-amber-300",
  badgeBorder: "border-amber-500/40",
},
{
  id: "plum",
  name: "Deep Plum",
  wash: "bg-[#28112F]/70",
  colorBlend: "bg-[#51205E] mix-blend-color opacity-45",
  gradient:
    "bg-gradient-to-t from-[#1D0B24]/95 via-[#38143F]/60 to-[#51205E]/40",
  accentText: "text-purple-300",
  badgeBorder: "border-purple-500/40",
},
{
  id: "petrol",
  name: "Petrol Teal",
  wash: "bg-[#082C2C]/70",
  colorBlend: "bg-[#145454] mix-blend-color opacity-45",
  gradient:
    "bg-gradient-to-t from-[#062020]/95 via-[#0D3C3C]/60 to-[#145454]/40",
  accentText: "text-teal-300",
  badgeBorder: "border-teal-500/40",
},

];


const SERVICE_IMAGES: Record<string, string> = {
  "talent-registration": "/images/services/talent-representation.jpg",
  "digital-talent-portfolio": "/images/services/digital-portfolio.jpg",
  "casting-calls": "/images/services/casting-direction.jpg",
  "audition-services": "/images/services/audition-services.jpg",
  "production-house-services": "/images/services/production-house.jpg",
  "talent-management": "/images/services/talent-management.jpg",
  "premium-services": "/images/services/fashion-modeling.jpg",
  "talent-representation-management": "/images/services/talent-management.jpg",
  "casting-direction-auditions": "/images/services/audition-services.jpg",
  "fashion-commercial-modeling": "/images/services/fashion-modeling.jpg",
};

const SERVICE_IMAGE_POSITION: Record<string, string> = {
  "talent-registration": "object-center",
  "digital-talent-portfolio": "object-[center_20%]",
  "casting-calls": "object-[center_28%]",
  "audition-services": "object-[center_28%]",
  "production-house-services": "object-center",
  "talent-management": "object-center",
  "premium-services": "object-[center_20%]",
  "talent-representation-management": "object-center",
  "casting-direction-auditions": "object-[center_28%]",
  "fashion-commercial-modeling": "object-[center_20%]",
};

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const IconComponent = (service.icon && SERVICE_ICONS[service.icon]) || Film;
  const tint = SERVICE_TINTS[index % SERVICE_TINTS.length];
  const cardImage = (service.slug && SERVICE_IMAGES[service.slug]) || service.image;
  const imagePosition = (service.slug && SERVICE_IMAGE_POSITION[service.slug]) || "object-center";

  return (
    <CinematicTilt className="h-full" maxTilt={3.5}>
      <div
        className="group relative w-full h-[480px] sm:h-[500px] lg:h-[520px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/20 bg-slate-950 flex flex-col justify-between select-none animate-fade-in-up"
        style={{ animationDelay: `${index * 90}ms` }}
      >
        {/* ======================================================== */}
        {/* LAYER 0: Full-Card Underlying Image                      */}
        {/* ======================================================== */}
        {cardImage ? (
          <img
            src={cardImage}
            alt={service.title}
            className={`absolute inset-0 w-full h-full object-cover ${imagePosition} transition-transform duration-700 ease-out group-hover:scale-108`}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
            <IconComponent className="w-16 h-16 opacity-40" />
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 1: Permanent Bottom Scrim for Text Readability     */}
        {/* Ensures white text remains 100% legible when color fades */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
          aria-hidden="true"
        />

        {/* ======================================================== */}
        {/* LAYER 2: Individual Colored Overlay / Shade              */}
        {/* Visible by default; smoothly fades out on hover to       */}
        {/* reveal the vibrant original image underneath             */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-400 ease-out group-hover:opacity-0"
          aria-hidden="true"
        >
          <div className={`absolute inset-0 ${tint.colorBlend}`} />

          <div
            className={`absolute inset-0 ${tint.gradient} mix-blend-multiply opacity-10`}
          />

          <div
            className={`absolute inset-0 ${tint.wash} opacity-15`}
          />
        </div>


        {/* ======================================================== */}
        {/* LAYER 2.5: Interactive Ambient Illumination on Hover     */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/0 via-white/5 to-white/15"
          aria-hidden="true"
        />

        {/* ======================================================== */}
        {/* LAYER 3: Text & Content (Z-30, strictly on top)         */}
        {/* ======================================================== */}
        <div className="relative z-30 flex flex-col justify-end h-full p-6 sm:p-7 pointer-events-none">
          {/* Top Bar: Floating Glass Icon Badge + Index Number */}
          {/* <div className="flex items-center justify-between pointer-events-auto">
            <div
              className={`p-2.5 rounded-2xl bg-black/45 backdrop-blur-md border ${tint.badgeBorder} text-white shadow-md group-hover:bg-white group-hover:text-slate-900 group-hover:scale-105 transition-all duration-300`}
            >
              <IconComponent className="w-5 h-5 transition-transform duration-300" />
            </div>

            <span className="text-[11px] font-mono font-bold tracking-widest text-white/70 uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div> */}

          {/* Bottom Section: Service Title, Description, and Actions */}
          <div className="space-y-3 pointer-events-auto">
            <Link
              href={`/services/${service.slug || service.id}`}
              prefetch={true}
              className="group/title block"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md group-hover/title:text-[#DC8B20] transition-colors duration-300">
                {service.title}
              </h3>
            </Link>

            {service.shortDescription && (
              <p className="text-xs text-white/80 leading-relaxed line-clamp-2 drop-shadow-xs">
                {service.shortDescription}
              </p>
            )}

            {/* Bottom Actions Row */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between">
              <Link
                href={`/services/${service.slug || service.id}`}
                prefetch={true}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-[#DC8B20] transition-colors"
              >
                <span>View Service Scope</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <Link
                href={`/contact?serviceId=${service.id}`}
                prefetch={true}
                className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-[#DC8B20] text-white border border-white/30 hover:border-[#DC8B20]/300 backdrop-blur-md text-[11px] font-semibold transition-all duration-300 shadow-sm hover:scale-105"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CinematicTilt>
  );
}
