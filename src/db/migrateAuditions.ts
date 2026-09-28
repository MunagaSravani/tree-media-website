import { db } from "./index";
import { auditions } from "./schema";
import { sql } from "drizzle-orm";

const AUDITIONS_DATA = [
  {
    title: "Main Lead in Pan-India Period Action Drama",
    slug: "main-lead-period-action-drama",
    category: "Actor",
    location: "Mumbai",
    productionHouse: "Tree Media Motion Pictures & Trident Cine",
    projectType: "Theatrical Feature Film",
    compensation: "₹3,50,000 - ₹5,00,000",
    deadline: "15 Oct 2026",
    rolesAvailable: "Lead Male & Female (Age 22-32)",
    shortDescription:
      "Casting charismatic lead performers for a high-budget mythological action-drama directed by a National Award-winning filmmaker.",
    fullDescription:
      "Tree Media Motion Pictures in association with Trident Cine is launching casting calls for an upcoming multi-lingual epic drama set in 17th-century coastal India. The production requires disciplined actors capable of extensive character transformation, dialogue delivery in high Hindi/Urdu cadence, and weapon/stunt choreography training.",
    requirements: [
      "Minimum 2 years of stage or screen acting experience",
      "Stunt readiness and athletic physical conditioning",
      "Strong command over Hindi and expressive dialogue delivery",
      "2-minute monologue video (contemporary or period) required",
    ],
    isUrgent: true,
    isFeatured: true,
    postedDate: "Today",
    spotsOpen: 2,
    status: "published",
  },
  {
    title: "Autumn Haute Couture & Runway Campaign",
    slug: "autumn-haute-couture-runway-campaign",
    category: "Model",
    location: "Mumbai",
    productionHouse: "Aura Luxury Brands & Vogue Special",
    projectType: "Fashion Runway & Print",
    compensation: "₹1,20,000 / Day",
    deadline: "12 Oct 2026",
    rolesAvailable: "Editorial Models (Min 5'9\" F, 6'0\" M)",
    shortDescription:
      "Exclusive runway showcase and print campaign for premier luxury label showcase at Mumbai Fashion Pavilion.",
    fullDescription:
      "A premier international haute couture house is casting high-fashion runway and editorial faces for their Autumn/Winter flagship collection. Selected models will walk the main gala runway and feature across digital billboards and luxury magazine editorials globally.",
    requirements: [
      "Professional runway walking portfolio or video reel",
      "Standard editorial height requirements (Min 5'9\" F / 6'0\" M)",
      "High-resolution comp card and unedited digital polaroids",
      "Availability for 3-day fitting and showcase schedule",
    ],
    isUrgent: false,
    isFeatured: true,
    postedDate: "1 day ago",
    spotsOpen: 6,
    status: "published",
  },
  {
    title: "Playback Vocalist for OTT Romance Drama Soundtracks",
    slug: "playback-vocalist-ott-romance-drama",
    category: "Singer",
    location: "Bengaluru",
    productionHouse: "Tree Audio Lab & SoundWave Studios",
    projectType: "Music Album & Streaming Series",
    compensation: "₹1,00,000 / Track + Royalties",
    deadline: "20 Oct 2026",
    rolesAvailable: "Versatile Soulful Vocalist (Male/Female)",
    shortDescription:
      "Seeking distinctive, expressive singing voices for 3 original romantic sound tracks composed by renowned music directors.",
    fullDescription:
      "Tree Audio Lab is scouting raw and seasoned vocal prodigies for a multi-episode romantic drama streaming on a leading OTT network. Tracks include acoustic ballads and modern orchestral soul. Finalists will record at our Bengaluru soundstage.",
    requirements: [
      "Acoustic or raw microphone vocal recording sample (no heavy auto-tune)",
      "Vocal agility across semi-classical and contemporary pop",
      "Ability to emote subtle cinematic narratives through tone",
      "Open to both solo and duet tracking",
    ],
    isUrgent: true,
    isFeatured: false,
    postedDate: "2 days ago",
    spotsOpen: 3,
    status: "published",
  },
  {
    title: "Lead Contemporary Dance Troupe for Global Music Video",
    slug: "contemporary-dance-troupe-music-video",
    category: "Dancer",
    location: "Hyderabad",
    productionHouse: "Kite Media Productions",
    projectType: "Cinematic Music Video",
    compensation: "₹45,000 / Day",
    deadline: "18 Oct 2026",
    rolesAvailable: "Contemporary & Hip-Hop Dancers (4 Artists)",
    shortDescription:
      "Dynamic ensemble dancers needed for an energetic, choreographed video shoot in Hyderabad film studios.",
    fullDescription:
      "Kite Media is casting 4 elite dancers for a landmark international fusion music video featuring top South Asian chart-toppers. The routine blends contemporary lyrical movements with powerful urban street beats.",
    requirements: [
      "Video submission demonstrating synchronized choreography and solo freestyle",
      "Strong core technique in Contemporary, Hip-Hop, or Jazz",
      "Stamina for 12-hour set shoot days under studio lighting",
      "Costume flexibility and expressive face articulation",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "3 days ago",
    spotsOpen: 4,
    status: "published",
  },
  {
    title: "Prime Time Tech & Entertainment Gala Anchor",
    slug: "tech-entertainment-gala-anchor",
    category: "Anchor",
    location: "Chennai",
    productionHouse: "Nexus Global Summits & Media",
    projectType: "Live Mega Stage Show",
    compensation: "₹85,000 / Show",
    deadline: "25 Oct 2026",
    rolesAvailable: "Bilingual Master of Ceremonies (M/F)",
    shortDescription:
      "Seeking an articulate, charismatic presenter with stage presence to host a 2-day international media & tech conference.",
    fullDescription:
      "Nexus Global is auditioning charismatic live emcees to host the grand opening and awards night of a global cinema and creative tech summit at Chennai Trade Centre. Must command audiences of 2,500+ delegates with poise, charm, and spontaneous humor.",
    requirements: [
      "High-energy live stage hosting showreel",
      "Flawless English diction with conversational Tamil an advantage",
      "Experience handling live VIP panel interviews and teleprompter",
      "Sophisticated black-tie gala presentation demeanor",
    ],
    isUrgent: false,
    isFeatured: true,
    postedDate: "4 days ago",
    spotsOpen: 2,
    status: "published",
  },
  {
    title: "Character Voiceover Artist for Animated Fantasy Series",
    slug: "character-voiceover-animated-fantasy-series",
    category: "Voice Artist",
    location: "Pune",
    productionHouse: "Animix Studios & Tree Media",
    projectType: "Animated Web Series (10 Episodes)",
    compensation: "₹25,000 / Episode",
    deadline: "30 Oct 2026",
    rolesAvailable: "Expressive Voice Artist (Character Voice)",
    shortDescription:
      "Voice casting for a witty protagonist character in a stylized adventure animated series for a global streaming platform.",
    fullDescription:
      "Animix Studios has greenlit an original 10-episode 3D animated fantasy comedy. We are looking for voice artists who can bring an irreverent, sharp-tongued youthful hero to life with distinct personality and comedic timing.",
    requirements: [
      "3-minute voice reel showcasing diverse characters, pitches, and accents",
      "Experience in animation dialogue sync or video game voiceover",
      "Home studio capability or availability to record in Pune studio suites",
      "Ability to take vocal direction and improv during table reads",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "3 days ago",
    spotsOpen: 1,
    status: "published",
  },
  {
    title: "Flagship Smartphone & Lifestyle Brand Ambassadors",
    slug: "smartphone-lifestyle-brand-ambassadors",
    category: "Influencer",
    location: "Delhi NCR",
    productionHouse: "Starlight Digital Network",
    projectType: "Digital Brand Campaign",
    compensation: "₹60,000 - ₹1,50,000 / Campaign",
    deadline: "10 Oct 2026",
    rolesAvailable: "Creators with 50K+ engaged followers",
    shortDescription:
      "National lifestyle electronics brand looking for authentic creators to showcase upcoming flagship product launch.",
    fullDescription:
      "Starlight Digital is partnering with a Fortune 500 mobile tech brand for a nationwide campaign targeting urban millennials and Gen Z. We are casting 8 lifestyle, fashion, and tech influencers for product unboxings, experiential reels, and launch event coverage.",
    requirements: [
      "Verified or active public Instagram/YouTube handle with 50k+ followers",
      "High audience engagement rate (minimum 3.5% verified)",
      "High-aesthetic short-form video creation capabilities",
      "Clean brand association history and prompt delivery record",
    ],
    isUrgent: true,
    isFeatured: true,
    postedDate: "Yesterday",
    spotsOpen: 8,
    status: "published",
  },
  {
    title: "Lead Commercial Fashion & Portrait Photographer",
    slug: "lead-fashion-portrait-photographer",
    category: "Photographer",
    location: "Mumbai",
    productionHouse: "Tree Media Creative Agency",
    projectType: "Lookbook & Campaign Shoot",
    compensation: "₹50,000 / Day + Equipment",
    deadline: "22 Oct 2026",
    rolesAvailable: "Fashion & Commercial Photographer",
    shortDescription:
      "Commissioning an accomplished photographer for luxury ethnic couture collection catalog and outdoor fashion editorial.",
    fullDescription:
      "Tree Media Creative Agency is hiring an innovative fashion photographer with a distinctive cinematic eye to lens an exclusive lookbook for a celebrated Indian bridal & luxury resortwear designer. Shoot will take place over 2 days in South Mumbai heritage architecture.",
    requirements: [
      "Proven lookbook/fashion editorial portfolio with published tear-sheets",
      "Mastery of high-key outdoor natural lighting and studio strobe setups",
      "Strong art direction perspective and collaborative crew demeanor",
      "Proficiency in capture workflow and high-end digital retouching oversight",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "5 days ago",
    spotsOpen: 1,
    status: "published",
  },
  {
    title: "Short-Form Video Storyteller & Culture Content Creator",
    slug: "short-form-video-storyteller",
    category: "Content Creator",
    location: "Kolkata",
    productionHouse: "SouthStream Media & Tree Labs",
    projectType: "Digital Series & Social Show",
    compensation: "₹40,000 - ₹70,000 / Month Contract",
    deadline: "14 Oct 2026",
    rolesAvailable: "On-Camera Host / Creator (English & Bengali/Hindi)",
    shortDescription:
      "Creative talent with script-to-screen storytelling instincts to produce viral culture, food, and cinema explainers.",
    fullDescription:
      "Tree Labs and SouthStream are expanding their digital narrative footprint in East India. We are recruiting on-camera creators who can write, shoot, and front compelling 60-second micro-documentaries celebrating street culture, art, cinema history, and urban life.",
    requirements: [
      "Natural, engaging on-camera presence with crisp storytelling delivery",
      "Self-sufficient filming workflow (smartphones/gimbals or mirrorless)",
      "Proficient editing in Premiere Pro, DaVinci Resolve, or CapCut",
      "Links to 3 top-performing organic reels created by the candidate",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "2 days ago",
    spotsOpen: 2,
    status: "published",
  },
  {
    title: "Supporting Antagonist in OTT Crime Thriller Series",
    slug: "supporting-antagonist-ott-crime-thriller",
    category: "Actor",
    location: "Delhi NCR",
    productionHouse: "Red Carpet Films & Apex Vision",
    projectType: "OTT Web Series",
    compensation: "₹1,80,000 Total",
    deadline: "16 Oct 2026",
    rolesAvailable: "Male Actor (Age 28-40), Intense Screen Presence",
    shortDescription:
      "Key recurring antagonist in an 8-episode gritty thriller set across North India with major OTT streaming distribution.",
    fullDescription:
      "Red Carpet Films is holding immediate auditions for the pivotal role of 'Vikram,' a calculating underworld operator in a dark crime series filming across Old Delhi, Gurgaon, and Chandigarh. The role features multiple high-tension confrontational dialogues with the lead investigator.",
    requirements: [
      "Strong stage theater background or recognized indie film credits",
      "Realistic North Indian / Haryanvi dialect capabilities",
      "Willingness to shoot night schedules over a 20-day production block",
      "Self-tape audition scene script provided upon preliminary application",
    ],
    isUrgent: true,
    isFeatured: false,
    postedDate: "Today",
    spotsOpen: 1,
    status: "published",
  },
  {
    title: "Commercial Face for National FMCG Brand Shoot",
    slug: "commercial-face-fmcg-brand-shoot",
    category: "Model",
    location: "Bengaluru",
    productionHouse: "EastCoast Studios & Tree Media",
    projectType: "TV Commercial & Billboards",
    compensation: "₹95,000 / Shoot Day",
    deadline: "24 Oct 2026",
    rolesAvailable: "Expressive Female Face (Age 20-28)",
    shortDescription:
      "National television commercial shoot for top personal care brand airing across prime networks and digital OTT.",
    fullDescription:
      "Casting call for a national television ad film showcasing natural beauty, radiant confidence, and conversational grace. The campaign will be broadcast across national sports broadcasts and digital streaming channels throughout 2026-2027.",
    requirements: [
      "Clean, expressive skin with natural cinematic camera warmth",
      "Experience with dialogue delivery in TV commercials",
      "Unretouched close-up headshots and 360-degree video profile",
      "No conflicting exclusive endorsements in personal care category",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "4 days ago",
    spotsOpen: 2,
    status: "published",
  },
  {
    title: "Classical Fusion & Jazz Vocalist for Multi-City Festival Tour",
    slug: "classical-fusion-jazz-vocalist",
    category: "Singer",
    location: "Chennai",
    productionHouse: "Symphony Rhythms & Tree Live",
    projectType: "Live Concert Tour",
    compensation: "₹65,000 / Performance",
    deadline: "28 Oct 2026",
    rolesAvailable: "Carnatic / Hindustani Fusion Singer",
    shortDescription:
      "Casting vocalists to headline a 6-city live fusion concert tour backed by international instrumentalists.",
    fullDescription:
      "Tree Live is presenting a landmark autumn music festival tour across Chennai, Bengaluru, Mumbai, and Hyderabad. We are searching for an exceptional fusion vocalist with deep classical training who can effortlessly meld traditional ragas with ambient jazz and world percussion.",
    requirements: [
      "Demonstrable training in Indian classical vocal disciplines",
      "Live concert or stage performance video links",
      "Strong improvisation chops and ear for complex time signatures",
      "Passport ready for potential international festival extension",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "1 week ago",
    spotsOpen: 2,
    status: "published",
  },
  {
    title: "Urban Street & Hip-Hop Dancers for Youth Brand Commercial",
    slug: "urban-street-hiphop-dancers",
    category: "Dancer",
    location: "Pune",
    productionHouse: "Pulse Visuals",
    projectType: "Youth Brand Commercial",
    compensation: "₹35,000 / Day",
    deadline: "19 Oct 2026",
    rolesAvailable: "Urban Street Dancers (Male/Female, Age 18-26)",
    shortDescription:
      "Energetic street dancers required for vibrant sneaker brand commercial featuring quick sync choreographies.",
    fullDescription:
      "Pulse Visuals is shooting an electric commercial for an international sneaker and streetwear brand. The shoot involves rooftop parkour-style choreographies, breakdance battles, and expressive sync dance lines.",
    requirements: [
      "Freestyle dance video highlighting musicality and floorwork",
      "Experience performing in dynamic music videos or live battles",
      "High energy and natural street attitude on camera",
      "Pune or Mumbai based talent preferred for prompt rehearsal schedules",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "3 days ago",
    spotsOpen: 5,
    status: "published",
  },
  {
    title: "Bilingual Corporate Summit & Global Leadership Gala Emcee",
    slug: "corporate-summit-leadership-gala-emcee",
    category: "Anchor",
    location: "Hyderabad",
    productionHouse: "Apex Conventions & Tree Events",
    projectType: "Corporate Business Gala",
    compensation: "₹70,000 / Evening",
    deadline: "27 Oct 2026",
    rolesAvailable: "Corporate Host / Emcee (English & Telugu/Hindi)",
    shortDescription:
      "Seeking an executive-level anchor for an annual leadership awards night at HICC Hyderabad.",
    fullDescription:
      "Apex Conventions is casting an elite professional host for an evening honoring global Fortune 500 CEOs, founders, and government ministers. Requires an articulate, poise-rich presenter who radiates gravitas and warmth.",
    requirements: [
      "Professional corporate emcee reel or business summit footage",
      "Impeccable stage posture, pronunciation, and protocol knowledge",
      "Ability to smoothly adapt to script modifications in real time",
      "Full evening availability on November 12, 2026",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "5 days ago",
    spotsOpen: 1,
    status: "published",
  },
  {
    title: "Voice Narrator for Wildlife & Nature Docuseries",
    slug: "voice-narrator-wildlife-nature-docuseries",
    category: "Voice Artist",
    location: "Kolkata",
    productionHouse: "GeoSphere Documentaries",
    projectType: "Theatrical Documentary",
    compensation: "₹45,000 / Episode",
    deadline: "05 Nov 2026",
    rolesAvailable: "Warm, Authoritative Narrative Voice (M/F)",
    shortDescription:
      "Narrating 4 documentary featurettes covering Indian wildlife reserves and cultural heritage.",
    fullDescription:
      "GeoSphere Documentaries is recording narration for a 4K theatrical documentary exploring the biodiversity hotspots of the Sundarbans and Eastern Himalayas. We require a captivating, deep voice that commands attentiveness and respect.",
    requirements: [
      "Professional dry voice sample reading a nature documentary excerpt",
      "Warm baritone or rich alto voice tone with excellent pacing control",
      "Flawless articulation of scientific and geographic terms",
      "Acoustically treated studio recording capability",
    ],
    isUrgent: false,
    isFeatured: false,
    postedDate: "6 days ago",
    spotsOpen: 1,
    status: "published",
  },
  {
    title: "Food & Heritage Travel Vlog Storyteller",
    slug: "food-heritage-travel-vlog-storyteller",
    category: "Content Creator",
    location: "Delhi NCR",
    productionHouse: "Flavors of India Network & Tree Digital",
    projectType: "OTT Docu-Vlog Series",
    compensation: "₹50,000 / Episode",
    deadline: "21 Oct 2026",
    rolesAvailable: "Expressive Foodie & Travel Vlogger",
    shortDescription:
      "Host needed for high-energy culinary exploration web show traveling across legendary heritage eateries.",
    fullDescription:
      "Tree Digital is casting the primary host for 'Heritage Bites,' an 8-part travelogue highlighting iconic street food and historic recipes across Purani Dilli, Lucknow, and Varanasi. Candidate must be an enthusiastic foodie with witty commentary.",
    requirements: [
      "Active food/travel video channel or reel portfolio",
      "Uninhibited on-camera expressions and genuine passion for gastronomy",
      "High comfort with crowds and spontaneous street interviews",
      "Travel readiness for a 12-day multi-city shoot itinerary",
    ],
    isUrgent: true,
    isFeatured: true,
    postedDate: "Just now",
    spotsOpen: 1,
    status: "published",
  },
];

async function main() {
  try {
    console.log("Creating auditions table if not exists...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "auditions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "title" text NOT NULL,
        "slug" text,
        "category" text NOT NULL,
        "location" text NOT NULL,
        "production_house" text NOT NULL,
        "project_type" text NOT NULL,
        "compensation" text NOT NULL,
        "deadline" text NOT NULL,
        "roles_available" text NOT NULL,
        "short_description" text NOT NULL,
        "full_description" text NOT NULL,
        "requirements" jsonb DEFAULT '[]'::jsonb,
        "is_urgent" boolean DEFAULT false NOT NULL,
        "is_featured" boolean DEFAULT false NOT NULL,
        "posted_date" text DEFAULT 'Recently' NOT NULL,
        "spots_open" integer DEFAULT 1 NOT NULL,
        "status" text DEFAULT 'published' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);
    console.log("Auditions table verified.");

    const existing = await db.select({ count: sql<number>`count(*)` }).from(auditions);
    const count = Number(existing[0]?.count || 0);
    console.log(`Current auditions count in DB: ${count}`);

    if (count === 0) {
      console.log("Seeding 16 auditions into database...");
      for (const item of AUDITIONS_DATA) {
        await db.insert(auditions).values(item);
      }
      console.log("Successfully seeded 16 auditions into database.");
    } else {
      console.log("Auditions already exist in database.");
    }

    const verify = await db.select().from(auditions);
    console.log(`Total auditions now in DB: ${verify.length}`);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
