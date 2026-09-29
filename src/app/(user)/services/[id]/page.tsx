import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, Film, Shield, Sparkles } from "lucide-react";
import { isUUID } from "@/lib/utils";
import PageAtmosphere from "@/components/user/PageAtmosphere";

export const revalidate = 60;

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

const SERVICE_DELIVERABLES: Record<string, string[]> = {
  "talent-registration": [
    "Multi-category verified artist onboarding across acting, modeling, dancing, singing & voiceover",
    "Digital screening & background verification for industry casting security",
    "Categorized indexing in Tree Media's nationwide talent casting database",
    "Priority casting call notification alerts delivered via SMS and email within 24–48 hours",
  ],
  "digital-talent-portfolio": [
    "Verified digital artist profile with customized vanity casting URL and QR code",
    "High-resolution lookbook galleries supporting headshots and editorial stills",
    "Embedded video player for intro monologue showcases and dramatic showreels",
    "One-click casting composite card export (PDF format) for casting directors and agencies",
  ],
  "casting-calls": [
    "Direct casting access to verified film studios, OTT platforms, TV serials, and commercial shoots",
    "Role-specific breakdown matching based on age, screen presence, dialect, and skills",
    "Protected audition environment shielding artists from unverified or fraudulent scouts",
    "Immediate application status tracking and direct audition slot confirmations",
  ],
  "audition-services": [
    "Virtual high-definition online audition suites with real-time casting review",
    "Offline soundstage studio auditions in major production hubs with professional cues",
    "Self-tape video submission portal with script sides and director instructions",
    "Transparent audition tracking with live shortlist, callback, and selection status",
  ],
  "production-house-services": [
    "Character-wise talent matching and director review packages within tight production deadlines",
    "Rapid bulk casting capabilities for crowd, background, and ensemble sequences",
    "Location and regional language casting across Mumbai, Hyderabad, Chennai, Bangalore, and Delhi",
    "Dedicated on-set artist supervisors managing call sheets, contracts, and shoot schedules",
  ],
  "talent-management": [
    "Dedicated artist management team providing career roadmap and project selection guidance",
    "Commercial booking negotiations, endorsement deals, and competitive compensation management",
    "Legal contract vetting, exclusivity management, intellectual property and royalty rights protection",
    "Complete calendar conflict resolution, call-sheet management, and secure payment accounting",
  ],
  "premium-services": [
    "High-end studio portfolio photography with leading fashion and cinema lighting specialists",
    "Cinematic 4K introduction video and acting monologue scene production",
    "Professional acting showreel and voiceover demo reel editing and audio mastering",
    "Official Verified Profile Badge and prime featured placement on Tree Media directories",
  ],
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const condition = isUUID(id)
    ? or(eq(services.id, id), eq(services.slug, id))
    : eq(services.slug, id);

  const [svc] = await db
    .select()
    .from(services)
    .where(condition);

  if (!svc || svc.status !== "published") {
    notFound();
  }

  const heroImage = (svc.slug && SERVICE_IMAGES[svc.slug]) || svc.image;
  const deliverables = (svc.slug && SERVICE_DELIVERABLES[svc.slug]) || [
    "Dedicated senior talent agent assigned throughout production lifecycle",
    "SAG-AFTRA, Equity, and international union contract compliance verification",
    "Private high-definition video self-tape screening suites & audition sessions",
    "Expedited booking turnaround within 24–48 hours for urgent commercial calls",
  ];

  return (
    <div className="relative space-y-16 py-12 max-w-5xl mx-auto px-6 min-h-screen">
      <PageAtmosphere variant="services" />
      <Link
        href="/services"
        prefetch={true}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Services Catalog</span>
      </Link>

      {/* Hero Spotlight */}
      <section className="space-y-6">
        <div
          data-reveal="eyebrow"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DC8B20]/10 border border-[#DC8B20]/30 text-[#DC8B20] text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DC8B20]" />
          <span>Agency Division</span>
        </div>

        <h1
          data-reveal="heading"
          className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
        >
          {svc.title}
        </h1>

        <p
          data-reveal="tagline"
          className="text-base text-slate-600 leading-relaxed max-w-3xl"
        >
          {svc.shortDescription}
        </p>

        {heroImage && (
          <div
            data-reveal="fade-up"
            className="group rounded-3xl overflow-hidden glass-panel bg-slate-900 border border-slate-200 aspect-[21/9] shadow-md mt-6 relative shine-sweep"
          >
            <img
              src={heroImage}
              alt={svc.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
      </section>

      {/* Detailed Content Scope */}
      <section className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <h2
            data-reveal="heading"
            className="text-2xl font-bold text-slate-900 tracking-tight"
          >
            Scope & Methodology
          </h2>
          <div
            data-reveal="fade-up"
            className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line glass-panel bg-white p-8 rounded-3xl border border-slate-200 shadow-xs"
          >
            {svc.detailedContent}
          </div>

          <div
            data-reveal="fade-up"
            className="glass-panel bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs"
          >
            <h3
              data-reveal="heading"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider"
            >
              Standard Client Deliverables
            </h3>
            <ul data-reveal="stagger" className="space-y-2.5 text-xs text-slate-700">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DC8B20] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Action Box */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div
            data-reveal="fade-up"
            data-reveal-delay="150"
            className="glass-panel bg-white p-6 rounded-3xl border border-[#DC8B20]/30 shadow-md space-y-5 sticky top-28"
          >
            <div>
              <span className="text-xs font-bold text-[#DC8B20] uppercase tracking-wider block">
                Direct Booking
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Engage This Service</h3>
              <p className="text-xs text-slate-500 mt-1">
                Connect with our specialized department lead for rates, casting availability, and shoot scheduling.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={`/contact?serviceId=${svc.id}`}
                prefetch={true}
                className="w-full py-3 rounded-xl bg-[#DC8B20] hover:bg-[#DC8B20] text-white font-bold text-xs shadow-md shadow-[#DC8B20]/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Request Service Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/profiles"
                prefetch={true}
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center justify-center transition-colors"
              >
                Browse Matching Talents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
