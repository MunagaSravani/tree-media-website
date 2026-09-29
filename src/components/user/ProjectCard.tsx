import Link from "next/link";
import { ArrowUpRight, Calendar, Building2, Sparkles, Film } from "lucide-react";
import CinematicTilt from "@/components/user/CinematicTilt";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    clientName: string;
    completionDate: string;
    coverImage: string;
    isFeatured?: boolean;
  };
  index?: number;
  isCenterHighlighted?: boolean;
}

export default function ProjectCard({
  project,
  index = 0,
  isCenterHighlighted = false,
}: ProjectCardProps) {
  return (
    <div className="h-full w-full">
      <CinematicTilt className="h-full w-full" maxTilt={3.5}>
        <div
          className={`group glass-panel rounded-3xl overflow-hidden service-card-effect flex flex-col justify-between bg-white transition-all duration-500 ease-out h-full ${
            isCenterHighlighted
              ? "scale-[1.03] opacity-100 brightness-[1.02] border-[#DC8B20] shadow-2xl shadow-[#DC8B20]/25 ring-2 ring-[#DC8B20]/20 z-10"
              : "scale-100 opacity-100 border-slate-200 shadow-xs hover:border-[#DC8B20]/50 hover:shadow-xl hover:shadow-[#DC8B20]/25"
          }`}
        >
          <div>
            {/* Media Container: Full-color by default, elegant dimming and premium overlay on hover */}
            <div className="relative aspect-video overflow-hidden bg-slate-950 shrink-0">
              {/* 1. Base Project Image: Full-Color by default, smooth subtle desaturation/dimming on hover */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover saturate-100 brightness-100 contrast-[1.02] transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-[0.80] group-hover:brightness-[0.88] group-hover:contrast-[1.04]"
                loading="lazy"
              />

              {/* 2. Discrete Bottom Gradient (only at bottom edge for metadata readability, keeping 85% of image uncovered) */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent pointer-events-none transition-opacity duration-500" />

              {/* 3. Subtle Premium Darkened Cinematic Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

              {/* 4. Elegant Emerald & Gold Rim Sheen on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#DC8B20]/15 via-transparent to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

              {/* 5. Subtle Center Production Cue on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <Film className="w-3 h-3 text-[#DC8B20]" />
                  <span>View Production</span>
                </span>
              </div>

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-900 border border-slate-200/90 backdrop-blur-md shadow-xs transition-colors duration-300 group-hover:border-[#DC8B20]/50">
                  {project.category}
                </span>
                {project.isFeatured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#DC8B20] text-white shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>Agency Case</span>
                  </span>
                )}
              </div>

              {/* Bottom Overlay Quick Info */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-200 font-medium z-10 drop-shadow-sm">
                <div className="flex items-center gap-1.5 text-[#f7cc74] font-semibold truncate max-w-[200px]">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-[#DC8B20]" />
                  <span className="truncate">{project.clientName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{project.completionDate}</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-6 space-y-2 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-[#DC8B20] line-clamp-1">
                {project.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>

          {/* Card Action Link */}
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between">
            <Link
              href={`/portfolio/${project.slug || project.id}`}
              prefetch={true}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC8B20] hover:text-[#DC8B20] transition-colors group/link"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>

            <Link
              href={`/contact?projectId=${project.id}`}
              prefetch={true}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#DC8B20] hover:text-white hover:border-[#DC8B20] border border-slate-200 text-[11px] font-semibold text-slate-700 hover:shadow-xs transition-all duration-300"
            >
              Inquire
            </Link>
          </div>
        </div>
      </CinematicTilt>
    </div>
  );
}
