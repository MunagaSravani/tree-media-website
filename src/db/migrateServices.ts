import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres@localhost:5432/tree_media";
const sql = postgres(connectionString, { max: 1, timeout: 5 });
const db = drizzle(sql, { schema });

export const NEW_SERVICES = [
  {
    title: "Talent Registration",
    slug: "talent-registration",
    shortDescription: "Seamless registration gateway for male & female actors, models, child artists, dancers, singers, anchors, influencers, and voice artists.",
    detailedContent: `Tree Media’s Talent Registration gateway is India’s premier digital entry point for aspiring and established performing artists. We onboard, verify, and categorize diverse talent streams to connect them directly with leading casting directors, advertising agencies, and production houses nationwide.

Categories Represented:
• Actors – Male / Female (Lead, Supporting & Character Roles)
• High-Fashion & Commercial Models
• Child Artists (Ages 3–15 for film, commercials & print)
• Dancers (Classical, Bollywood, Western, Hip-Hop & Contemporary)
• Singers & Vocalists (Playback, Classical & Indie)
• Anchors, Emcees & Event Presenters
• Digital Influencers & Content Creators
• Professional Voiceover Artists (Multi-lingual & Accent Specialists)
• Background Artists & Extras for Large-scale Shoots

Our structured registration process ensures your talent profile is systematically organized, verified, and placed in front of verified casting executives.`,
    image: "/images/services/talent-representation.jpg",
    icon: "Users",
    displayOrder: 1,
    status: "published" as const,
  },
  {
    title: "Digital Talent Portfolio",
    slug: "digital-talent-portfolio",
    shortDescription: "Industry-standard digital casting profiles with headshots, demo reels, intro videos, casting stats, and instant shareable links.",
    detailedContent: `In the modern entertainment landscape, your digital portfolio is your audition card. Tree Media builds immersive, verified digital talent profiles tailored to industry casting standards, giving filmmakers and casting directors instantaneous access to your capabilities.

Portfolio Architecture & Features:
• Verified Professional Artist Profile & Bio
• High-Resolution Headshots, Lookbooks & Editorial Stills
• Introduction Video & Monologue Showcases
• Acting Showreels & Commercial Demo Reels
• Comprehensive Skills & Languages Matrix (Dialects & Fluency)
• Screen & Theatre Experience History with Credits
• Accurate Physical Measurements (Height, Age Range, Screen Age, Hair/Eye Color)
• Instant Portfolio Sharing via Private Link & PDF Casting Cards

Your digital portfolio enables effortless casting discovery, allowing directors to evaluate screen presence and audition readiness within seconds.`,
    image: "/images/services/digital-portfolio.jpg",
    icon: "Sparkles",
    displayOrder: 2,
    status: "published" as const,
  },
  {
    title: "Casting Calls",
    slug: "casting-calls",
    shortDescription: "Exclusive access to verified casting opportunities across feature films, OTT web series, TV serials, digital ads, and fashion shows.",
    detailedContent: `Tree Media bridges the gap between creative ambition and verified industry opportunities. We curate and publish authenticated casting calls across all tiers of the Indian entertainment sector, safeguarding talents from unverified scouts while guaranteeing direct production access.

Casting Verticals Covered:
• Mainstream Feature Films (Bollywood & Regional Cinema)
• Premium Web Series & OTT Originals (Netflix, Prime Video, Hotstar, SonyLIV)
• Daily Television Serials & Episodic Dramas
• High-Budget Television Commercials (TVCs)
• Independent & Festival Short Films
• Music Videos for Record Labels & Independent Artists
• Digital Social Media Ad Campaigns & Brand Commercials
• Fashion Shows & Designer Runway Weeks
• Celebrity & Influencer Brand Promotions
• High-Impact Corporate Films & Brand Documentaries

Receive targeted casting call notifications matching your physical attributes, age range, acting skillset, and geographic location.`,
    image: "/images/services/casting-direction.jpg",
    icon: "Film",
    displayOrder: 3,
    status: "published" as const,
  },
  {
    title: "Audition Services",
    slug: "audition-services",
    shortDescription: "Streamlined audition workflows featuring online self-tapes, studio tests, live scheduling, and real-time shortlisting updates.",
    detailedContent: `Gone are the days of disorganized queues and endless waiting rooms. Tree Media’s Audition Management ecosystem digitizes and refines the entire audition pipeline for artists and casting teams alike.

End-to-End Audition Capabilities:
• Online Virtual Auditions via Secure High-Def Video Streams
• Offline Soundstage Studio Auditions with Professional Lighting & Cues
• Self-Tape Video Submission with Script Sides & Character Briefs
• Real-time Audition Scheduling & Calendar Time-Slot Booking
• Transparent Audition Status Tracking (Received, Reviewed, Call-Back, Shortlisted)
• Director & Producer Shortlisting Portals with Scorecards

Experience professional audition workflows engineered to showcase your truest performance potential under ideal technical conditions.`,
    image: "/images/services/audition-services.jpg",
    icon: "Video",
    displayOrder: 4,
    status: "published" as const,
  },
  {
    title: "Production House Services",
    slug: "production-house-services",
    shortDescription: "Comprehensive B2B casting solutions for filmmakers: character-wise searches, bulk casting, regional talent, and shoot coordination.",
    detailedContent: `Tree Media serves as the casting backbone for national production houses, streaming networks, and advertising agencies. We eliminate casting bottlenecks through bespoke talent discovery, verified logistics, and seamless on-ground coordination.

Production Capabilities & Deliverables:
• Character-Wise Talent Search based on Script Breakdown & Moodboards
• Curated Talent Shortlisting & Director Review Packages
• Rapid Bulk Casting for Crowd, Background, and Ensemble Casts
• Location-Wise Casting across Mumbai, Delhi, Hyderabad, Bangalore, Chennai & Kolkata
• Regional & Language-Wise Casting (Hindi, Telugu, Tamil, Malayalam, Kannada, Punjabi, Bengali, Marathi)
• Full Artist Coordination (Contracts, Dates & Call-Sheets)
• Shoot-Date Schedule Management & On-Set Production Liaison

From script read-throughs to final wrap, our dedicated casting supervisors ensure zero production downtime.`,
    image: "/images/services/production-house.jpg",
    icon: "Film",
    displayOrder: 5,
    status: "published" as const,
  },
  {
    title: "Talent Management",
    slug: "talent-management",
    shortDescription: "Full-lifecycle artist representation: booking management, contract coordination, shoot schedules, and long-term career support.",
    detailedContent: `Tree Media provides 360-degree career management for dedicated actors, models, and creative artists. We serve as your trusted legal, financial, and strategic advocates in a demanding entertainment industry.

Talent Representation Lifecycle:
• Complete Artist Coordination & Daily Representation
• Commercial Booking Management & Rate Negotiation
• Legal Contract Coordination (Exclusivity, Usage Rights, Royalty Protection)
• Shoot Schedule Optimization & Calendar Conflict Resolution
• Transparent Payment & Booking Records with Escrow Accountability
• Holistic Career Strategy, Media Positioning & Industry Networking

Focus completely on your craft while our seasoned artist managers safeguard your business, legal rights, and career longevity.`,
    image: "/images/services/talent-management.jpg",
    icon: "TrendingUp",
    displayOrder: 6,
    status: "published" as const,
  },
  {
    title: "Premium Services",
    slug: "premium-services",
    shortDescription: "Exclusive career accelerators: studio portfolio shoots, video intros, showreel production, and verified profile badges.",
    detailedContent: `Accelerate your entertainment career with Tree Media’s bespoke creative production services. We elevate talent presentations to world-class cinema standards, ensuring you command immediate attention from top-tier casting directors.

Elite Premium Offerings:
• Professional Portfolio Photography by Veteran Fashion & Cinema Photographers
• Cinematic Video Introduction Shoots with High-End Lighting & Sound
• Custom Acting Showreel & Voice Demo Reel Production / Editing
• Targeted Portfolio Promotion to Accredited Casting Networks
• Featured Talent Listing on Tree Media’s Homepage & Casting Directories
• Verified Profile Badge for Instant Industry Credibility & Trust

Stand out from thousands of applicants with a verified, cinematic identity crafted by entertainment industry specialists.`,
    image: "/images/services/fashion-modeling.jpg",
    icon: "Sparkles",
    displayOrder: 7,
    status: "published" as const,
  },
];

async function run() {
  console.log("Updating services in database...");
  try {
    // 1. Clear old services
    await db.delete(schema.services);

    // 2. Insert new 7 services
    await db.insert(schema.services).values(NEW_SERVICES);
    console.log("✅ Successfully inserted all 7 services!");
  } catch (err) {
    console.error("Error updating services:", err);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

run();
