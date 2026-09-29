import { Metadata } from "next";
import { db } from "@/db";
import { aboutPageContent, agencyStatistics } from "@/db/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import {
  Shield,
  Target,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import PageAtmosphere from "@/components/user/PageAtmosphere";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Tree Media Talent & Casting Agency",
  description:
    "Discover Tree Media, a next-generation talent management and casting agency representing actors, models, and creative artists across modern entertainment.",
};

export default async function AboutPage() {
  const [content] = await db.select().from(aboutPageContent);
  const stats = await db.select().from(agencyStatistics).orderBy(asc(agencyStatistics.displayOrder));

  const valuesList = Array.isArray(content?.values) ? content.values : [];
  const achievementsList = Array.isArray(content?.achievements) ? content.achievements : [];

  const VALUE_ICONS: Record<string, any> = {
    Shield,
    Target,
    Award,
    Globe,
  };

  return (
    <div className="relative space-y-24 py-10 min-h-screen">
      {/* Studio Heritage & 35mm Vault Background Atmosphere */}
      <PageAtmosphere variant="about" />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 text-center space-y-5">
        {/* <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DC8B20]/50 text-[#DC8B20] text-xs font-semibold uppercase tracking-widest shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DC8B20] animate-pulse" />
          <span>Agency Vision & Philosophy</span>
        </div> */}

        <h1
          data-reveal="heading"
          className="text-4xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]"
        >
          {content?.introTitle || "Empowering Next-Generation Talent & Creative Media"}
        </h1>

        <p
          data-reveal="tagline"
          className="text-sm lg:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          {content?.introText ||
            "Tree Media is a modern talent agency and creative management firm dedicated to discovering, nurturing, and elevating exceptional artists. Built for today's dynamic entertainment landscape, we connect diverse actors, models, performers, and digital creators with premier film, television, commercial, and streaming productions."}
        </p>
      </section>

      {/* Story & Visual Narrative */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span
                data-reveal="eyebrow"
                className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider block"
              >
                Our Journey
              </span>
              <h2
                data-reveal="heading"
                className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
              >
                {content?.storyTitle || "Our Vision & Identity"}
              </h2>
            </div>

            <p
              data-reveal="tagline"
              className="text-sm lg:text-base text-slate-600 leading-relaxed whitespace-pre-line"
            >
              {content?.storyText ||
                "Founded as a forward-thinking collective of casting directors, media producers, and talent strategists, Tree Media was established to bring a fresh, transparent, and agile approach to artist management.\n\nIn an era of rapidly evolving entertainment platforms, we combine dedicated artist development with strategic casting connections—ensuring every talent on our roster achieves their highest creative and commercial potential."}
            </p>

            <div
              data-reveal="fade-up"
              data-reveal-delay="150"
              className="group p-6 rounded-3xl glass-panel bg-white border border-slate-200/90 hover:border-[#DC8B20]/50 hover:shadow-md transition-all duration-300 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DC8B20]/10 border border-[#DC8B20]/20/80 text-[#DC8B20] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#DC8B20] group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#DC8B20] uppercase tracking-wider block">
                  {content?.experienceYears ? `${content.experienceYears}+ Years of Industry Excellence` : "Next-Generation Industry Leadership"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-12">
                {content?.experienceSummary ||
                  "Dedicated to navigating contemporary entertainment markets, forging direct relationships with leading production houses, casting directors, and premium commercial brands."}
              </p>
            </div>
          </div>

          <div
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-5"
          >
            <div className="group rounded-3xl overflow-hidden glass-panel bg-slate-950 border border-slate-200/80 aspect-[3/4] shadow-md hover:shadow-xl hover:border-[#DC8B20]/50 transition-all duration-500 relative shine-sweep">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Agency Boardroom"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-md">
                  Creative Direction
                </span>
              </div>
            </div>
            <div className="group rounded-3xl overflow-hidden glass-panel bg-slate-950 border border-slate-200/80 aspect-[3/4] shadow-md hover:shadow-xl hover:border-[#DC8B20]/50 transition-all duration-500 mt-8 relative shine-sweep">
              <img
                src="https://images.unsplash.com/photo-1716703371653-ca74beaa7a4a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Talent Shoot"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-md">
                  Talent Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6">
        <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="group relative rounded-3xl p-8 sm:p-10 glass-panel bg-white border border-slate-200/80 hover:border-[#DC8B20]/50 shadow-xs hover:shadow-xl hover:shadow-[#DC8B20]/25 hover:-translate-y-1.5 transition-all duration-400 ease-out overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#DC8B20] group-hover:text-white transition-all duration-300 shadow-2xs">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#DC8B20] uppercase tracking-widest block">
                  Core Purpose
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#DC8B20] transition-colors duration-200">
                  Our Mission
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {content?.mission ||
                  "To discover, empower, and position exceptional creative talent in transformative productions that define contemporary culture."}
              </p>
            </div>
          </div>

          <div
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="group relative rounded-3xl p-8 sm:p-10 glass-panel bg-white border border-slate-200/80 hover:border-[#DC8B20]/50 shadow-xs hover:shadow-xl hover:shadow-[#DC8B20]/25 hover:-translate-y-1.5 transition-all duration-400 ease-out overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#DC8B20] border border-teal-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#DC8B20] group-hover:text-white transition-all duration-300 shadow-2xs">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#DC8B20] uppercase tracking-widest block">
                  Future Horizon
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#DC8B20] transition-colors duration-200">
                  Our Vision
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {content?.vision ||
                  "To be the gold standard in media talent representation, celebrated for uncompromising ethics, bespoke artist development, and visionary production partnerships."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span
            data-reveal="eyebrow"
            className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider block"
          >
            Our Foundation
          </span>
          <h2
            data-reveal="heading"
            className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Guiding Principles & Values
          </h2>
        </div>

        <div data-reveal="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuesList.map((val: any, idx: number) => {
            const IconComponent = VALUE_ICONS[val.icon] || Shield;
            return (
              <div
                key={idx}
                className="group glass-panel bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-[#DC8B20]/50 hover:shadow-lg hover:shadow-[#DC8B20]/25 hover:-translate-y-1.5 transition-all duration-400 ease-out space-y-3 shadow-xs"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#DC8B20]/10 border border-[#DC8B20]/20 text-[#DC8B20] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#DC8B20] group-hover:text-white transition-all duration-300 shadow-2xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#DC8B20] transition-colors duration-200">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestones & Timeline */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span
            data-reveal="eyebrow"
            className="text-xs font-semibold text-[#DC8B20] uppercase tracking-wider block"
          >
            Agency Milestones
          </span>
          <h2
            data-reveal="heading"
            className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Key Milestones & Growth
          </h2>
        </div>

        <div data-reveal="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsList.map((ach: any, idx: number) => (
            <div
              key={idx}
              className="group glass-panel bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-[#DC8B20]/50 hover:shadow-lg hover:shadow-[#DC8B20]/25 hover:-translate-y-1.5 transition-all duration-400 ease-out relative space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black font-mono tracking-tight bg-[#DC8B20]/10 text-[#DC8B20] border border-[#DC8B20]/25 group-hover:bg-[#DC8B20] group-hover:text-white group-hover:border-[#DC8B20] transition-all duration-300 shadow-2xs">
                  {ach.year}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#DC8B20]/20 group-hover:bg-[#DC8B20] transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#DC8B20] transition-colors duration-200">
                {ach.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div
          data-reveal="fade-up"
          className="group glass-panel bg-white p-10 sm:p-12 rounded-3xl border border-slate-200/90 hover:border-[#DC8B20]/50 hover:shadow-lg transition-all duration-300 space-y-4 max-w-3xl mx-auto shadow-xs"
        >
          <h3
            data-reveal="heading"
            className="text-2xl font-bold text-slate-900 tracking-tight"
          >
            Partner with Tree Media
          </h3>
          <p
            data-reveal="tagline"
            className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed"
          >
            Discuss representation opportunities or inquire about booking talent for your upcoming feature film or commercial.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              prefetch={true}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] active:scale-98 text-white font-bold text-xs shadow-md shadow-[#DC8B20]/25 hover:shadow-[#DC8B20]/25 hover:-translate-y-0.5 transition-all duration-300 group/btn cursor-pointer"
            >
              <span>Contact Our Agents</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
