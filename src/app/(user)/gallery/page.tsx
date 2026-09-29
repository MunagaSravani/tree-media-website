"use client";

import { useEffect, useState } from "react";
import MediaLightbox from "@/components/user/MediaLightbox";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import { Sparkles, Film, Image as ImageIcon, Play, Loader2 } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description?: string | null;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnailUrl?: string | null;
  tags?: string[];
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"all" | "image" | "video">("all");
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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success) {
          setItems(data.media);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = items.filter((m) => {
    if (tab === "all") return true;
    return m.mediaType === tab;
  });

  return (
    <div className="relative space-y-12 py-12 max-w-7xl mx-auto px-6 min-h-screen">
      {/* Darkroom Light-Table & Film Archive Atmosphere */}
      <PageAtmosphere variant="gallery" />

      {/* Header */}
      <section className="text-center space-y-4">
        {/* <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DC8B20]/50 text-[#DC8B20] text-xs font-semibold uppercase tracking-widest shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DC8B20]" />
          <span>Cinematic Showcase</span>
        </div> */}
        <h1
          data-reveal="heading"
          className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight"
        >
          Visual Media & Studio Gallery
        </h1>
        <p
          data-reveal="tagline"
          className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          High-definition behind-the-scenes photography, editorial stills, and showreels from our global productions.
        </p>
      </section>

      {/* Filter Tabs */}
      <div data-reveal="fade-up" className="flex items-center justify-center gap-2">
        {[
          { id: "all", label: "All Media", icon: Sparkles },
          { id: "image", label: "Photography Stills", icon: ImageIcon },
          { id: "video", label: "Cinematic Video Reels", icon: Film },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-[#DC8B20] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-24 flex justify-center">
          <Loader2 className="w-8 h-8 text-[#DC8B20] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs">No media assets found.</div>
      ) : (
        <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setLightbox({
                  isOpen: true,
                  url: item.mediaUrl,
                  type: item.mediaType,
                  title: item.title,
                  description: item.description || undefined,
                })
              }
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-200 cursor-pointer relative aspect-[4/3] bg-slate-100 shadow-sm"
            >
              {item.mediaType === "video" ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#DC8B20]/25 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#915514] border border-slate-200 uppercase">
                  {item.mediaType}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#DC8B20] transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[11px] text-slate-200 line-clamp-1">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
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
