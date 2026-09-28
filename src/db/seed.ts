import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import bcrypt from "bcryptjs";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres@localhost:5432/tree_media";
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Starting Tree Media Database Seed...");

  // 1. Clear existing data in reverse dependency order
  await db.delete(schema.enquiries);
  await db.delete(schema.profiles);
  await db.delete(schema.services);
  await db.delete(schema.projects);
  await db.delete(schema.galleryMedia);
  await db.delete(schema.testimonials);
  await db.delete(schema.clients);
  await db.delete(schema.agencyStatistics);
  await db.delete(schema.homepageSettings);
  await db.delete(schema.aboutPageContent);
  await db.delete(schema.contactInformation);
  await db.delete(schema.admins);

  console.log("🧹 Existing records cleaned.");

  // 2. Admin Account
  const passwordHash = await bcrypt.hash("Admin@TreeMedia2026!", 10);
  const [adminUser] = await db.insert(schema.admins).values({
    email: "admin@treemedia.agency",
    name: "Tree Media Executive",
    passwordHash,
  }).returning();
  console.log(`👤 Admin created: ${adminUser.email}`);

  // 3. Homepage Settings
  await db.insert(schema.homepageSettings).values({
    heroTitle: "Shaping the Future of Talent & Cinematic Media",
    heroSubtitle: "Global Talent Agency & Creative Production House",
    heroDescription: "Tree Media represents visionary actors, world-class models, voice virtuosos, and visionary directors. We connect extraordinary creators with premier film studios, global brands, and cutting-edge media campaigns.",
    heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    heroPrimaryBtnText: "Explore Talents",
    heroPrimaryBtnLink: "/profiles",
    heroSecondaryBtnText: "Our Services",
    heroSecondaryBtnLink: "/services",
    aboutHeading: "Where Artistic Vision Meets Industry Power",
    aboutDescription: "Founded on the philosophy of relentless artistic excellence, Tree Media bridges the gap between emerging creative forces and high-stakes media productions. We manage talent with surgical precision and curate brand stories that leave lasting cultural imprints.",
    aboutImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    aboutLink: "/about",
    ctaHeading: "Ready to Elevate Your Next Production?",
    ctaDescription: "Whether you require premier talent casting, comprehensive creative representation, or full-scale media production, our team is ready to deliver extraordinary results.",
    ctaBtnText: "Book a Consultation",
    ctaBtnLink: "/contact",
    ctaImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
  });

  // 4. Agency Statistics
  await db.insert(schema.agencyStatistics).values([
    { label: "Elite Talents Represented", value: "350+", displayOrder: 1, isActive: true },
    { label: "Global Productions", value: "480+", displayOrder: 2, isActive: true },
    { label: "Fortune 500 Clients", value: "85+", displayOrder: 3, isActive: true },
    { label: "Industry Awards Won", value: "24", displayOrder: 4, isActive: true },
  ]);

  // 5. About Page Content
  await db.insert(schema.aboutPageContent).values({
    introTitle: "Empowering Next-Generation Talent & Creative Media",
    introText: "Tree Media is a modern talent agency and creative management firm dedicated to discovering, nurturing, and elevating exceptional artists. Built for today's dynamic entertainment landscape, we connect diverse actors, models, performers, and digital creators with premier film, television, commercial, and streaming productions.",
    storyTitle: "Our Vision & Identity",
    storyText: "Founded as a forward-thinking collective of casting directors, media producers, and talent strategists, Tree Media was established to bring a fresh, transparent, and agile approach to artist management.\n\nIn an era of rapidly evolving entertainment platforms, we combine dedicated artist development with strategic casting connections—ensuring every talent on our roster achieves their highest creative and commercial potential.",
    mission: "To discover, empower, and position exceptional creative talent in transformative productions that shape contemporary culture and entertainment.",
    vision: "To be the leading modern talent agency and creative management firm, celebrated for innovative casting, transparent artist advocacy, and strategic media collaborations.",
    values: [
      { title: "Artistic Integrity", description: "We protect our artists' creative voice and champion authentic storytelling above all.", icon: "Shield" },
      { title: "Bespoke Strategy", description: "Every talent receives tailored career guidance and representation designed for sustained growth.", icon: "Target" },
      { title: "Modern Standards", description: "From high-definition digital auditions to premier casting calls, our standard is uncompromising excellence.", icon: "Award" },
      { title: "Global Perspective", description: "Connecting diverse talent across regional and international productions, digital platforms, and commercial media.", icon: "Globe" }
    ],
    experienceYears: 3,
    experienceSummary: "Dedicated to navigating contemporary entertainment markets, forging direct relationships with leading production houses, casting directors, and premium commercial brands.",
    achievements: [
      { year: "2024", title: "Agency Foundation & Roster Launch", description: "Launched Tree Media with a curated roster spanning actors, fashion models, and voice artists." },
      { year: "2024", title: "Studio & Casting Network", description: "Established direct casting collaborations with leading commercial directors and production houses." },
      { year: "2025", title: "Digital Portfolios & Audition Suite", description: "Introduced modern digital casting workflows and audition facilities for accelerated talent placement." },
      { year: "2026", title: "Pan-Regional Media Expansion", description: "Expanded talent placement into major commercial brand campaigns, independent cinema, and digital media." }
    ],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4"
    ]
  });

  // 6. Services
  const insertedServices = await db.insert(schema.services).values([
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
      status: "published"
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
      status: "published"
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
      status: "published"
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
      status: "published"
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
      status: "published"
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
      status: "published"
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
      status: "published"
    }
  ]).returning();
  console.log("🎬 7 Services created.");

  // 7. Profiles (Talents & Artists)
  const insertedProfiles = await db.insert(schema.profiles).values([
    {
      name: "Marcus Vance",
      slug: "marcus-vance",
      category: "Actor",
      location: "Los Angeles, CA",
      gender: "Male",
      age: 32,
      height: "6'2\" (188 cm)",
      skills: ["Method Acting", "Stage Combat", "Horseback Riding", "Accents (British, Southern US)", "Screenplay Analysis"],
      languages: ["English", "French"],
      experienceYears: 10,
      shortBio: "Dramatic lead actor recognized for intense psychological thrillers and high-budget historical epics.",
      fullBio: "Marcus Vance is a classically trained thespian from the Royal Dramatic Conservatory. Having starred in both critically acclaimed independent cinema and major streaming features, Vance brings an arresting presence and emotional gravitas to every character. He is an active member of SAG-AFTRA and routinely collaborates with top-tier directors across North America and Europe.",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [
        { title: "Dramatic Monologue Reel 2025", url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-4155-large.mp4", thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" }
      ],
      previousProjects: [
        { title: "Shadows in the Mist", role: "Detective Julian Cross (Lead)", year: "2024", client: "Apex Films" },
        { title: "The Gilded Crown", role: "Lord Hamilton (Recurring)", year: "2023", client: "HBO Series" }
      ],
      socialLinks: { instagram: "https://instagram.com/marcusvance_official", imdb: "https://imdb.com/name/nm1234567" },
      isFeatured: true,
      status: "published"
    },
    {
      name: "Elena Rostova",
      slug: "elena-rostova",
      category: "Model",
      location: "New York, NY",
      gender: "Female",
      age: 26,
      height: "5'11\" (180 cm)",
      skills: ["High Fashion Runway", "Editorial Editorial", "Commercial Print", "Classical Ballet", "Underwater Posing"],
      languages: ["English", "Russian", "Italian"],
      experienceYears: 7,
      shortBio: "International runway and editorial model featured on Harper's Bazaar and Vogue international editions.",
      fullBio: "Elena Rostova is celebrated for her sculptural features, magnetic gaze, and versatile physical expression. Having walked for leading fashion week shows in Paris, Milan, and New York, she has also been the global face of luxury fragrance and jewelry campaigns. Her background in classical ballet imbues every posture with effortless elegance.",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [
        { title: "Milano Fashion Week Highlights", url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40431-large.mp4", thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop" }
      ],
      previousProjects: [
        { title: "L'Aura Fragrance Global Campaign", role: "Hero Model", year: "2024", client: "LVMH" },
        { title: "Vogue Autumn Editorial", role: "Cover Model", year: "2024", client: "Condé Nast" }
      ],
      socialLinks: { instagram: "https://instagram.com/elenarostova", twitter: "https://twitter.com/elena_rostova" },
      isFeatured: true,
      status: "published"
    },
    {
      name: "Darius Sterling",
      slug: "darius-sterling",
      category: "Voice Artist",
      location: "London, UK",
      gender: "Male",
      age: 41,
      height: "6'0\" (183 cm)",
      skills: ["Deep Baritone", "Cinematic Trailer Voice", "Audiobook Narration", "Character Voices", "BBC Accent", "Accents (RP, Scottish, Transatlantic)"],
      languages: ["English", "German"],
      experienceYears: 15,
      shortBio: "Signature baritone voice for Hollywood movie trailers, luxury automobile brands, and documentary narrations.",
      fullBio: "Darius Sterling's resonant, authoritative tone is instantly recognizable worldwide. With over 15 years in voice artistry, Darius has narrated award-winning wildlife documentaries for National Geographic and provided commercial voiceovers for Aston Martin, Rolex, and Sony PlayStation.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [
        { title: "Commercial Voice Reel", url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-sound-mixer-42511-large.mp4", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
      ],
      previousProjects: [
        { title: "Planet Untamed Series", role: "Lead Narrator", year: "2024", client: "BBC Worldwide" },
        { title: "Vanguard Titan Launch Commercial", role: "Narrator", year: "2023", client: "EA Sports" }
      ],
      socialLinks: { linkedin: "https://linkedin.com/in/dariussterlingvoice" },
      isFeatured: true,
      status: "published"
    },
    {
      name: "Sora Takahashi",
      slug: "sora-takahashi",
      category: "Director",
      location: "Tokyo / Los Angeles",
      gender: "Male",
      age: 36,
      height: "5'9\" (175 cm)",
      skills: ["Cinematography", "Visual Effects Direction", "Commercials", "Music Video Direction", "Stylized Lighting"],
      languages: ["Japanese", "English"],
      experienceYears: 12,
      shortBio: "Visionary commercial and music video director known for breathtaking neo-noir aesthetics.",
      fullBio: "Sora Takahashi has helmed high-profile global commercials for Nike, Sony, and Porsche. His distinct visual style marries hyper-precise camera motion with evocative practical lighting. His short film 'Chronos' won Best Director at the Tokyo Short Shorts Film Festival.",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [
        { title: "Directorial Showreel 2024", url: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4", thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" }
      ],
      previousProjects: [
        { title: "Midnight Pulse Campaign", role: "Director", year: "2024", client: "Nike Global" },
        { title: "Neon Genesis Sound MV", role: "Director", year: "2023", client: "Sony Music" }
      ],
      socialLinks: { instagram: "https://instagram.com/sorafilms", imdb: "https://imdb.com/name/nm7890123" },
      isFeatured: true,
      status: "published"
    },
    {
      name: "Chloe Dupont",
      slug: "chloe-dupont",
      category: "Actor",
      location: "Paris, France",
      gender: "Female",
      age: 29,
      height: "5'8\" (173 cm)",
      skills: ["Dramatic Acting", "Improvisation", "French Literature", "Contemporary Dance", "Piano"],
      languages: ["French", "English", "Spanish"],
      experienceYears: 8,
      shortBio: "Award-winning French film actress known for subtle nuances and magnetic romantic drama leads.",
      fullBio: "Chloe Dupont made her cinematic breakthrough in the Cannes Critics' Week selection 'L'Ombre du Soleil'. Her subtle emotional range and profound screen presence have made her a sought-after talent across European auteur cinema and high-profile international co-productions.",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [
        { title: "Cinema Showcase Reel", url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-the-sunset-over-the-sea-41228-large.mp4", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" }
      ],
      previousProjects: [
        { title: "A Summer in Provence", role: "Camille (Lead)", year: "2024", client: "StudioCanal" }
      ],
      socialLinks: { instagram: "https://instagram.com/chloedupont_cinema" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Liam O'Connor",
      slug: "liam-oconnor",
      category: "Musician",
      location: "Dublin / London",
      gender: "Male",
      age: 28,
      height: "6'1\" (185 cm)",
      skills: ["Film Scoring", "Cello", "Synthesizers", "Orchestral Arrangement", "Ambient Composition"],
      languages: ["English", "Irish"],
      experienceYears: 9,
      shortBio: "Cinematic composer and instrumentalist crafting immersive soundtracks for feature films and commercials.",
      fullBio: "Liam O'Connor bridges the acoustic intimacy of the classical cello with cutting-edge analog synthesis. Having scored multiple BAFTA-nominated indie shorts and commercial campaigns, Liam delivers scores that amplify emotional resonance.",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Tides of Solitude OST", role: "Composer", year: "2024", client: "Paramount Vantage" }
      ],
      socialLinks: { youtube: "https://youtube.com/@liamoconnormusic" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Amina Al-Mansoor",
      slug: "amina-al-mansoor",
      category: "Model",
      location: "Dubai, UAE",
      gender: "Female",
      age: 24,
      height: "5'10\" (178 cm)",
      skills: ["Luxury Jewelry Modeling", "Haute Couture", "Commercial Acting", "Equestrian", "Multilingual"],
      languages: ["Arabic", "English"],
      experienceYears: 5,
      shortBio: "High-fashion model representing the world's most prestigious timepiece and jewelry maisons.",
      fullBio: "Amina Al-Mansoor's commanding elegance has earned her features in Vogue Arabia, Elle Middle East, and campaigns for Cartier and Bulgari. She represents modern sophistication with a distinct Middle Eastern grace.",
      profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Cartier Emerald Nocturne Campaign", role: "Lead Model", year: "2024", client: "Cartier" }
      ],
      socialLinks: { instagram: "https://instagram.com/amina_almansoor" },
      isFeatured: true,
      status: "published"
    },
    {
      name: "Julian Rivera",
      slug: "julian-rivera",
      category: "Actor",
      location: "Madrid / Los Angeles",
      gender: "Male",
      age: 35,
      height: "5'11\" (181 cm)",
      skills: ["Action Stunts", "Bilingual Dialogue", "Martial Arts", "Firearms Training", "Voice Dubbing"],
      languages: ["Spanish", "English"],
      experienceYears: 11,
      shortBio: "Dynamic action and dramatic performer with leading roles in international thriller television series.",
      fullBio: "Julian Rivera combines intense physical dexterity with dramatic nuance. Trained in both Madrid's Royal School of Dramatic Arts and competitive martial arts, Julian performs his own stunt choreography and has starred in three international Netflix action productions.",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Cartel Syndicate Season 2", role: "Carlos Delgado (Main Cast)", year: "2024", client: "Netflix" }
      ],
      socialLinks: { instagram: "https://instagram.com/julianrivera_act" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Maya Lin",
      slug: "maya-lin",
      category: "Voice Artist",
      location: "Vancouver / Seattle",
      gender: "Female",
      age: 27,
      height: "5'6\" (168 cm)",
      skills: ["Animation Voice Acting", "Video Game Combat Vocals", "Commercial Jingles", "Anime Dubbing", "Youthful Characters"],
      languages: ["English", "Mandarin"],
      experienceYears: 6,
      shortBio: "High-energy voice actor for triple-A video game heroines and major animated studio releases.",
      fullBio: "Maya Lin gives voice to fearless warriors, whimsical animated sidekicks, and modern brand commercials. Her vocal range spans youthful whimsy to gritty, combat-ready intensity, making her a staple talent for major gaming studios.",
      profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Aetherfall RPG", role: "Commander Kaelen (Protagonist)", year: "2024", client: "Ubisoft" }
      ],
      socialLinks: { twitter: "https://twitter.com/mayalinstudio" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Kenji Sato",
      slug: "kenji-sato",
      category: "Model",
      location: "Tokyo, Japan",
      gender: "Male",
      age: 25,
      height: "6'2\" (189 cm)",
      skills: ["Streetwear High-Fashion", "Commercial Acting", "Skateboarding", "Athletic Posing", "Runway"],
      languages: ["Japanese", "English"],
      experienceYears: 4,
      shortBio: "Avant-garde streetwear and high-fashion model redefining contemporary masculine fashion.",
      fullBio: "Kenji Sato has been highlighted in Dazed, GQ Japan, and walked the Paris runway for Comme des Garçons and Balenciaga. His sharp bone structure and relaxed, authentic urban aesthetic resonate strongly with modern luxury streetwear brands.",
      profileImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Tokyo Underground Fall Line", role: "Lead Model", year: "2024", client: "Comme des Garçons" }
      ],
      socialLinks: { instagram: "https://instagram.com/kenjisatomodel" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Hannah Weiss",
      slug: "hannah-weiss",
      category: "Director",
      location: "Berlin, Germany",
      gender: "Female",
      age: 38,
      height: "5'7\" (170 cm)",
      skills: ["Documentary Realism", "Brand Storytelling", "High Concept Narrative", "Cinematography", "Directing Actors"],
      languages: ["German", "English"],
      experienceYears: 14,
      shortBio: "Documentary and commercial director capturing unvarnished humanity and profound emotional truths.",
      fullBio: "Hannah Weiss is an internationally acclaimed filmmaker whose work has premiered at the Berlin International Film Festival. She directs commercial campaigns that reject superficial tropes in favor of raw, deeply inspiring human connection.",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "The Silent Peak", role: "Director", year: "2024", client: "Arte Television" }
      ],
      socialLinks: { linkedin: "https://linkedin.com/in/hannahweissdirector" },
      isFeatured: false,
      status: "published"
    },
    {
      name: "Zane Cooper",
      slug: "zane-cooper",
      category: "Musician",
      location: "Nashville / New York",
      gender: "Male",
      age: 31,
      height: "5'11\" (180 cm)",
      skills: ["Acoustic & Electric Guitar", "Vocal Production", "Soundtrack Composition", "Lyric Writing", "Live Performance"],
      languages: ["English"],
      experienceYears: 10,
      shortBio: "Soulful indie-rock and acoustic recording artist with over 40 million streaming plays.",
      fullBio: "Zane Cooper crafts heart-wrenching, cinematic indie music featured in numerous television soundtracks and commercial spots. With multiple charted singles, Zane brings authentic musical pedigree to brand partnerships and film scoring.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      portfolioImages: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      previousProjects: [
        { title: "Chasing Horizons EP", role: "Primary Artist", year: "2024", client: "Atlantic Records" }
      ],
      socialLinks: { youtube: "https://youtube.com/@zanecoopermusic" },
      isFeatured: false,
      status: "published"
    }
  ]).returning();
  console.log("🌟 12 Dynamic Profiles created.");

  // 8. Projects (Portfolio - 5 Production Highlights)
  await db.insert(schema.projects).values([
    {
      title: "Midnight Echoes — Indie Short Drama",
      slug: "midnight-echoes-indie-short",
      category: "Short Film Casting",
      description: "Lead actor auditions, cast selection, and on-set talent coordination for an award-nominated independent festival drama short.",
      clientName: "Lumina Indie Motion Pictures",
      completionDate: "Recent Festival Debut",
      coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      caseStudy: "Tree Media spearheaded the casting process across regional auditions, screening over 120 aspiring actors to discover the lead duo for this poignant indie festival short.",
      isFeatured: true,
      status: "published"
    },
    {
      title: "Aura Atelier — Lookbook & Digital Campaign",
      slug: "aura-atelier-lookbook-campaign",
      category: "Fashion & Commercial",
      description: "Editorial model scouting, test shoot direction, and talent casting for an emerging designer's digital runway lookbook and video launch.",
      clientName: "Atelier Veda / Urban Muse",
      completionDate: "Autumn Showcase",
      coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      caseStudy: "Curated four breakthrough editorial faces for an intimate studio lookbook and social campaign, delivering pristine visuals on a tight production schedule.",
      isFeatured: true,
      status: "published"
    },
    {
      title: "City Lights Pulse — Artist Music Video",
      slug: "city-lights-pulse-music-video",
      category: "Music Video Casting",
      description: "Featured performer auditions, background dancer casting, and stage coordination for an independent singer-songwriter's breakout release.",
      clientName: "SoundWave Indie Records",
      completionDate: "Summer Debut",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      caseStudy: "Coordinated casting for 25 contemporary dancers and placed 6 featured performers for an electrifying single-take studio music video.",
      isFeatured: true,
      status: "published"
    },
    {
      title: "The Horizon of Silence — Nordic Thriller",
      slug: "horizon-of-silence-nordic-thriller",
      category: "Feature Film Casting",
      description: "Principal character auditions, multilingual ensemble casting, and on-location dialect coaching for an atmospheric Nordic mystery feature.",
      clientName: "Nordic Cinema Group & StudioCanal",
      completionDate: "Winter Premiere",
      coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      caseStudy: "Tree Media managed comprehensive character auditions, scouting across 3 European casting hubs to assemble an ensemble cast of 8 actors alongside local extras management in Norway.",
      isFeatured: true,
      status: "published"
    },
    {
      title: "Solstice Reverie — Luxury Brand Showcase",
      slug: "solstice-reverie-luxury-brand-showcase",
      category: "Commercial & Advertising",
      description: "High-fashion runway talent scouting, brand ambassador placement, and visual campaign coordination for a global luxury timepiece launch.",
      clientName: "Vanguard Horology Geneva",
      completionDate: "Spring Global Campaign",
      coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop"
      ],
      videos: [],
      caseStudy: "Spearheaded brand talent procurement, casting international commercial models and directing on-set talent coordination for a global multi-platform rollout across 14 markets.",
      isFeatured: true,
      status: "published"
    }
  ]);
  console.log("🏆 5 Portfolio Projects created.");

  // 9. Gallery Media
  await db.insert(schema.galleryMedia).values([
    {
      title: "Cinematic Reel: Desert Mirage",
      description: "Behind the scenes 4K footage from our luxury fragrance commercial shoot.",
      mediaType: "video",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      tags: ["Behind the Scenes", "Cinematography", "Commercial"],
      displayOrder: 1,
      status: "published"
    },
    {
      title: "Runway Spotlight: Paris Fashion Week",
      description: "Tree Media talent walking the spring haute couture preview.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
      tags: ["Fashion", "Runway", "Editorial"],
      displayOrder: 2,
      status: "published"
    },
    {
      title: "Audition Studio Session",
      description: "Actors rehearsing dialogue in Studio A.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
      tags: ["Audition", "Acting", "Behind the Scenes"],
      displayOrder: 3,
      status: "published"
    },
    {
      title: "Studio Voiceover Recording",
      description: "Multi-track voice capture for international cinema release.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
      tags: ["Voiceover", "Audio", "Studio"],
      displayOrder: 4,
      status: "published"
    },
    {
      title: "Sunset Cinema Production Reel",
      description: "Aerial camera movements and coastal lighting setup.",
      mediaType: "video",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-the-sunset-over-the-sea-41228-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
      tags: ["Cinematography", "Aerial", "Drone"],
      displayOrder: 5,
      status: "published"
    },
    {
      title: "Haute Couture Editorial Look",
      description: "Elena Rostova photographed by Vincent Moreau.",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      tags: ["Fashion", "Portrait", "Editorial"],
      displayOrder: 6,
      status: "published"
    }
  ]);
  console.log("📸 6 Gallery Media items created.");

  // 10. Testimonials
  await db.insert(schema.testimonials).values([
    {
      personName: "Alexandra Sterling",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      designation: "Executive Producer",
      company: "Paramount International",
      testimonial: "Tree Media is without question our first call when casting European and American talent. Their artists arrive prepared, disciplined, and bring genuine electricity to set.",
      rating: 5,
      displayOrder: 1,
      status: "published"
    },
    {
      personName: "Jean-Luc Moreau",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      designation: "Creative Director",
      company: "Vogue Creative Studio",
      testimonial: "The professionalism and adaptability of Tree Media's fashion roster is second to none. They understand luxury aesthetics intimately.",
      rating: 5,
      displayOrder: 2,
      status: "published"
    },
    {
      personName: "David K. Vance",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      designation: "Senior VP of Casting",
      company: "Apex Media Studios",
      testimonial: "Finding actors with both emotional depth and international box office appeal is rare. Tree Media consistently delivers that rare combination.",
      rating: 5,
      displayOrder: 3,
      status: "published"
    }
  ]);
  console.log("💬 3 Testimonials created.");

  // 11. Clients (6 Premier Studio & Brand Partners from Reference)
  await db.insert(schema.clients).values([
    {
      name: "Skyline Studios",
      logoUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
      description: "Major theatrical feature film and television studio partnering on tentpole castings, location shoots, and principal talent.",
      associatedProjects: ["FILM & TV"],
      caseStudyUrl: "/portfolio",
      displayOrder: 1,
      status: "published"
    },
    {
      name: "Luxe Atelier",
      logoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      description: "Haute couture fashion house and luxury editorial label partnering for Paris and Milan runway talent and global digital campaigns.",
      associatedProjects: ["FASHION"],
      caseStudyUrl: "/portfolio",
      displayOrder: 2,
      status: "published"
    },
    {
      name: "Vertex Creative",
      logoUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
      description: "Global advertising and creative agency casting leading commercial actors, voice artists, and international brand ambassadors.",
      associatedProjects: ["ADVERTISING"],
      caseStudyUrl: "/portfolio",
      displayOrder: 3,
      status: "published"
    },
    {
      name: "Pixel Frame",
      logoUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      description: "Digital post-production, VFX, and animation house collaborating on performance capture, 3D modeling, and voice synchronization.",
      associatedProjects: ["DIGITAL"],
      caseStudyUrl: "/portfolio",
      displayOrder: 4,
      status: "published"
    },
    {
      name: "Nimble Films",
      logoUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      description: "Full-service boutique film production studio producing independent feature films, festival premieres, and award-winning shorts.",
      associatedProjects: ["PRODUCTION"],
      caseStudyUrl: "/portfolio",
      displayOrder: 5,
      status: "published"
    },
    {
      name: "Horizon Talent",
      logoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
      description: "International talent management and casting network coordinating cross-border theatrical castings and artist scouting.",
      associatedProjects: ["TALENT AGENCY"],
      caseStudyUrl: "/portfolio",
      displayOrder: 6,
      status: "published"
    }
  ]);
  console.log("🏢 6 Premier Studio Clients created.");

  // 12. Contact Information
  await db.insert(schema.contactInformation).values({
    phone: "+91 8125524545 +91-8688434567",
    email: "info@teensitsolutions.com \nteens83@gmail.com \nteenssoftwaresolutionsllp@gmail.com",
    officeAddress: "Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.",
    googleMapsUrl: "https://maps.app.goo.gl/3uuYinjdtfXcVv4R9",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.267649791269!2d78.3810428!3d17.4468991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa4f30043275c4385%3A0x54788b5de763b452!2sTeens%20Software%20Solutions!5e0!3m2!1sen!2sin!4v1790319557389!5m2!1sen!2sin",
    socialLinks: {
      linkedin: "https://linkedin.com/company/treemediaagency",
      instagram: "https://instagram.com/treemediaagency",
      twitter: "https://twitter.com/treemediaagency",
      vimeo: "https://vimeo.com/treemediaagency"
    },
    workingHours: "Monday – Friday: 9:00 AM – 6:30 PM PST (Weekend by Appointment)"
  });
  console.log("📍 Contact Information created.");

  // 13. Sample Enquiries
  await db.insert(schema.enquiries).values([
    {
      name: "Jonathan Cole",
      email: "jcole@monarchfilms.com",
      phone: "+1 415 555 0192",
      subject: "Casting Inquiry: Marcus Vance for Indie Thriller",
      message: "Hello Tree Media, We are currently in pre-production for a psychological thriller filming in Vancouver this fall. We would love to check Marcus Vance's availability for the lead role of David Cole.",
      profileId: insertedProfiles[0].id,
      serviceId: insertedServices[1].id,
      status: "new",
      adminNotes: "Received script synopsis via email. Scheduled for team review on Thursday."
    },
    {
      name: "Sophia Martinez",
      email: "smartinez@voguecreative.fr",
      phone: "+33 1 42 68 55 00",
      subject: "Editorial Booking: Elena Rostova",
      message: "Inquiring regarding Elena Rostova for an exclusive 8-page editorial shoot in Paris during the first week of next month. High-fashion brand sponsor attached.",
      profileId: insertedProfiles[1].id,
      serviceId: insertedServices[2].id,
      status: "in_progress",
      adminNotes: "Checking flight schedule and Paris accommodation logistics."
    },
    {
      name: "Mark Reynolds",
      email: "mreynolds@reynoldsbrand.com",
      phone: "+1 212 555 0144",
      subject: "Commercial Campaign Production Quote",
      message: "We are looking for full turnkey commercial production services for our upcoming autumn launch. Requesting a preliminary consultation call.",
      serviceId: insertedServices[4].id,
      status: "completed",
      adminNotes: "Initial discovery call held. Proposal sent on March 15th."
    }
  ]);
  console.log("📨 3 Sample Enquiries created.");

  console.log("✅ Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
