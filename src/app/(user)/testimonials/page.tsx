"use client";

import { useEffect, useState } from "react";
import { Sparkles, Star } from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

interface TestimonialItem {
  id: string;
  personName: string;
  profileImage?: string | null;
  designation: string;
  company: string;
  testimonial: string;
  rating: number;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "0f7853a4-64fa-42e0-8aee-70837e007ccf",
    personName: "Alexandra Sterling",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    designation: "Executive Producer",
    company: "Paramount International",
    testimonial: "Tree Media is without question our first call when casting European and American talent. Their artists arrive prepared, disciplined, and bring genuine electricity to set.",
    rating: 5,
  },
  {
    id: "48319c01-10bf-461c-8adf-71f9c9178097",
    personName: "Jean-Luc Moreau",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    designation: "Creative Director",
    company: "Vogue Creative Studio",
    testimonial: "The professionalism and adaptability of Tree Media's fashion roster is second to none. They understand luxury aesthetics intimately.",
    rating: 5,
  },
  {
    id: "beb672fa-7561-4125-95f7-faffb0a9ce22",
    personName: "David K. Vance",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    designation: "Senior VP of Casting",
    company: "Apex Media Studios",
    testimonial: "Finding actors with both emotional depth and international box office appeal is rare. Tree Media consistently delivers that rare combination.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials)) {
          setReviews(data.testimonials);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <div className="relative space-y-16 py-12 max-w-7xl mx-auto px-6 min-h-screen">
      {/* Film Festival Gala & Golden Laurel Atmosphere */}
      <PageAtmosphere variant="testimonials" />

      {/* Header */}
      <section className="text-center space-y-4">
        <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-700 text-xs font-semibold uppercase tracking-widest shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Producer & Director Reviews</span>
        </div>
        <h1
          data-reveal="heading"
          className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight"
        >
          Client Testimonials & Trust
        </h1>
        <p
          data-reveal="tagline"
          className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Read candid reviews from studio heads, fashion house creative directors, and commercial agencies who rely on Tree Media.
        </p>
      </section>

      {/* Reviews Grid */}
      <section data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "{rev.testimonial}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
              {rev.profileImage ? (
                <img
                  src={rev.profileImage}
                  alt={rev.personName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-100">
                  {rev.personName[0]}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-slate-900">{rev.personName}</h4>
                <p className="text-xs text-emerald-700 font-medium">{rev.designation}</p>
                <p className="text-[11px] text-slate-500">{rev.company}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
