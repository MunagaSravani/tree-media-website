"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Banknote,
  Sparkles,
  CheckCircle2,
  Filter,
  RotateCcw,
  ArrowRight,
  Clock,
  Building2,
  X,
  Share2,
  Bookmark,
  ChevronDown,
  Flame,
  UserCheck,
  Send,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface AuditionItem {
  id: string;
  title: string;
  category:
    | "Actor"
    | "Model"
    | "Singer"
    | "Dancer"
    | "Anchor"
    | "Voice Artist"
    | "Influencer"
    | "Photographer"
    | "Content Creator";
  location:
    | "Mumbai"
    | "Hyderabad"
    | "Bengaluru"
    | "Chennai"
    | "Delhi NCR"
    | "Kolkata"
    | "Pune";
  productionHouse: string;
  projectType: string;
  compensation: string;
  deadline: string;
  rolesAvailable: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  isUrgent: boolean;
  isFeatured: boolean;
  postedDate: string;
  spotsOpen: number;
}

export const CATEGORIES = [
  "All Categories",
  "Actor",
  "Model",
  "Singer",
  "Dancer",
  "Anchor",
  "Voice Artist",
  "Influencer",
  "Photographer",
  "Content Creator",
] as const;

export const LOCATIONS = [
  "All Locations",
  "Mumbai",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Delhi NCR",
  "Kolkata",
  "Pune",
] as const;

export const POPULAR_SEARCHES = [
  { label: "Lead Actor Mumbai", query: "Lead Actor", category: "Actor", location: "Mumbai" },
  { label: "Fashion Model Delhi NCR", query: "Haute Couture", category: "Model", location: "Delhi NCR" },
  { label: "Playback Singer Bengaluru", query: "Playback Vocalist", category: "Singer", location: "Bengaluru" },
  { label: "Contemporary Dancer Hyderabad", query: "Choreography", category: "Dancer", location: "Hyderabad" },
  { label: "Voice Artist Pune", query: "Animated Series", category: "Voice Artist", location: "Pune" },
  { label: "Prime Anchor Chennai", query: "Anchor", category: "Anchor", location: "Chennai" },
  { label: "Brand Influencer Delhi NCR", query: "Campaign", category: "Influencer", location: "Delhi NCR" },
  { label: "Fashion Photographer Mumbai", query: "Lookbook", category: "Photographer", location: "Mumbai" },
  { label: "Content Creator Kolkata", query: "Storyteller", category: "Content Creator", location: "Kolkata" },
  { label: "OTT Series Lead", query: "OTT", category: "Actor", location: "All Locations" },
];

export const INITIAL_AUDITIONS: AuditionItem[] = [
  {
    id: "aud-1",
    title: "Main Lead in Pan-India Period Action Drama",
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
  },
  {
    id: "aud-2",
    title: "Autumn Haute Couture & Runway Campaign",
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
  },
  {
    id: "aud-3",
    title: "Playback Vocalist for OTT Romance Drama Soundtracks",
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
  },
  {
    id: "aud-4",
    title: "Lead Contemporary Dance Troupe for Global Music Video",
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
  },
  {
    id: "aud-5",
    title: "Prime Time Tech & Entertainment Gala Anchor",
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
  },
  {
    id: "aud-6",
    title: "Character Voiceover Artist for Animated Fantasy Series",
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
  },
  {
    id: "aud-7",
    title: "Flagship Smartphone & Lifestyle Brand Ambassadors",
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
  },
  {
    id: "aud-8",
    title: "Lead Commercial Fashion & Portrait Photographer",
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
  },
  {
    id: "aud-9",
    title: "Short-Form Video Storyteller & Culture Content Creator",
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
  },
  {
    id: "aud-10",
    title: "Supporting Antagonist in OTT Crime Thriller Series",
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
  },
  {
    id: "aud-11",
    title: "Commercial Face for National FMCG Brand Shoot",
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
  },
  {
    id: "aud-12",
    title: "Classical Fusion & Jazz Vocalist for Multi-City Festival Tour",
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
  },
  {
    id: "aud-13",
    title: "Urban Street & Hip-Hop Dancers for Youth Brand Commercial",
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
  },
  {
    id: "aud-14",
    title: "Bilingual Corporate Summit & Global Leadership Gala Emcee",
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
  },
  {
    id: "aud-15",
    title: "Voice Narrator for Wildlife & Nature Docuseries",
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
  },
  {
    id: "aud-16",
    title: "Food & Heritage Travel Vlog Storyteller",
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
  },
];

const CATEGORY_TAG_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Actor: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", dot: "bg-emerald-500" },
  Model: { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200", dot: "bg-rose-500" },
  Singer: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200", dot: "bg-purple-500" },
  Dancer: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", dot: "bg-amber-500" },
  Anchor: { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200", dot: "bg-orange-500" },
  "Voice Artist": { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200", dot: "bg-cyan-500" },
  Influencer: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200", dot: "bg-pink-500" },
  Photographer: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200", dot: "bg-indigo-500" },
  "Content Creator": { bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-200", dot: "bg-teal-500" },
};

export interface SearchAuditionsSectionProps {
  isHome?: boolean;
}

export default function SearchAuditionsSection({ isHome = false }: SearchAuditionsSectionProps = {}) {
  const [auditions, setAuditions] = useState<AuditionItem[]>(INITIAL_AUDITIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [savedAuditionIds, setSavedAuditionIds] = useState<string[]>([]);

  // Fetch auditions from PostgreSQL database via API
  useEffect(() => {
    let isCancelled = false;
    async function loadAuditions() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/auditions");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.auditions) && data.auditions.length > 0) {
            if (!isCancelled) {
              setAuditions(data.auditions);
              setFetchError(null);
            }
          }
        } else {
          throw new Error("Failed to load auditions from server");
        }
      } catch (err) {
        console.error("Error fetching auditions from database:", err);
        if (!isCancelled) {
          setFetchError("Unable to load latest auditions from database. Showing offline listings.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAuditions();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Modals state
  const [selectedAuditionForApply, setSelectedAuditionForApply] = useState<AuditionItem | null>(null);
  const [selectedAuditionForDetails, setSelectedAuditionForDetails] = useState<AuditionItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedAuditionForDetails || selectedAuditionForApply) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAuditionForDetails, selectedAuditionForApply]);

  // Application form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantNotes, setApplicantNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setUrgentOnly(false);
  }

  function handlePopularSearchClick(popular: (typeof POPULAR_SEARCHES)[0]) {
    setSearchQuery(popular.query);
    setSelectedCategory(popular.category);
    if (popular.location !== "All Locations") {
      setSelectedLocation(popular.location);
    } else {
      setSelectedLocation("All Locations");
    }
  }

  function toggleSaveAudition(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSavedAuditionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const filteredAuditions = useMemo(() => {
    return auditions.filter((aud) => {
      // Category filter
      if (selectedCategory !== "All Categories" && aud.category !== selectedCategory) {
        return false;
      }
      // Location filter
      if (selectedLocation !== "All Locations" && aud.location !== selectedLocation) {
        return false;
      }
      // Urgent filter
      if (urgentOnly && !aud.isUrgent) {
        return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = aud.title?.toLowerCase().includes(q);
        const inDesc = aud.shortDescription?.toLowerCase().includes(q);
        const inFullDesc = aud.fullDescription?.toLowerCase().includes(q);
        const inProd = aud.productionHouse?.toLowerCase().includes(q);
        const inProj = aud.projectType?.toLowerCase().includes(q);
        const inRoles = aud.rolesAvailable?.toLowerCase().includes(q);
        const inLoc = aud.location?.toLowerCase().includes(q);
        const inCat = aud.category?.toLowerCase().includes(q);
        const inReqs = Array.isArray(aud.requirements) && aud.requirements.some((r) => r.toLowerCase().includes(q));

        if (
          !inTitle &&
          !inDesc &&
          !inFullDesc &&
          !inProd &&
          !inProj &&
          !inRoles &&
          !inLoc &&
          !inCat &&
          !inReqs
        ) {
          return false;
        }
      }
      return true;
    });
  }, [auditions, searchQuery, selectedCategory, selectedLocation, urgentOnly]);

  const displayedAuditions = useMemo(() => {
    return isHome ? filteredAuditions.slice(0, 3) : filteredAuditions;
  }, [filteredAuditions, isHome]);

  async function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAuditionForApply) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          subject: `Audition Application: ${selectedAuditionForApply.title} (${selectedAuditionForApply.category})`,
          message: `Location: ${selectedAuditionForApply.location}\nCompensation: ${selectedAuditionForApply.compensation}\nPortfolio Link: ${applicantPortfolio}\n\nApplicant Statement:\n${applicantNotes}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit audition application");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeApplyModal() {
    setSelectedAuditionForApply(null);
    setSubmitSuccess(false);
    setSubmitError("");
    setApplicantName("");
    setApplicantEmail("");
    setApplicantPhone("");
    setApplicantPortfolio("");
    setApplicantNotes("");
  }

  return (
    <section
      id="search-auditions"
      aria-label="Tree Media Auditions & Casting Calls"
      className="max-w-7xl mx-auto px-6 space-y-10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 ">
          {/* <div
            data-reveal="eyebrow"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Casting Portal</span>
          </div> */}
          <h2
            data-reveal="heading"
            className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight"
          >
            Search Auditions & Casting Calls
          </h2>
          <p
            data-reveal="tagline"
            className="text-sm text-slate-600 max-w-2xl leading-relaxed"
          >
            Direct opportunities for actors, models, singers, and creators from vetted production
            studios, global advertising agencies, and Tree Media Original projects.
          </p>
        </div>

        <div
          data-reveal="fade-up"
          data-reveal-delay="200"
          className="flex items-center gap-3"
        >
          {/* {isHome && (
            <Link
              href="/auditions"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>View All ({INITIAL_AUDITIONS.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )} */}
          {/* <div className="text-xs font-medium text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              <strong className="text-slate-900 font-bold">{INITIAL_AUDITIONS.length}</strong> Live
              Casting Calls
            </span>
          </div> */}
        </div>
      </div>

      {/* Main Search & Filter Control Panel */}
      <div
        data-reveal="fade-up"
        data-reveal-delay="100"
        className="glass-panel bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xl space-y-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          {/* 1. Main Search Auditions Input */}
          <div className="lg:col-span-6 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, keyword, studio, or project type..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-900 text-sm font-medium transition-all outline-hidden placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Category Dropdown Filter */}
          <div className="lg:col-span-3 relative">
            <div className="relative flex items-center">
              <Briefcase className="w-4 h-4 text-emerald-600 absolute left-3.5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-9 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-900 text-sm font-medium transition-all outline-hidden appearance-none cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Location Dropdown Filter */}
          <div className="lg:col-span-3 relative">
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-teal-600 absolute left-3.5 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-9 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-900 text-sm font-medium transition-all outline-hidden appearance-none cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Popular Searches & Quick Toggles */}
        <div className="pt-2 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Popular Searches Chips */}
          {/* <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular Searches:</span>
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {POPULAR_SEARCHES.map((pop, idx) => {
                const isActive =
                  selectedCategory === pop.category &&
                  (pop.location === "All Locations" || selectedLocation === pop.location);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePopularSearchClick(pop)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs"
                        : "bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-600 border-slate-200"
                    }`}
                  >
                    {pop.label}
                  </button>
                );
              })}
            </div>
          </div> */}

          {/* Quick Filter Utilities (Urgent Only, Reset) */}
          {/* <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={urgentOnly}
                onChange={(e) => setUrgentOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded-sm"
              />
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Urgent Calls Only
              </span>
            </label>

            {(searchQuery ||
              selectedCategory !== "All Categories" ||
              selectedLocation !== "All Locations" ||
              urgentOnly) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div> */}
        </div>
      </div>

      {/* Results Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 text-xs text-slate-500">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span>
            Showing{" "}
            <strong className="text-slate-900 font-bold">
              {isHome ? Math.min(3, filteredAuditions.length) : filteredAuditions.length}
            </strong>{" "}
            {isHome ? `of ${filteredAuditions.length}` : ""}{" "}
            matching {filteredAuditions.length === 1 ? "audition" : "auditions"}
            {selectedCategory !== "All Categories" && (
              <span>
                {" "}
                in <span className="font-semibold text-slate-700">{selectedCategory}</span>
              </span>
            )}
            {selectedLocation !== "All Locations" && (
              <span>
                {" "}
                around <span className="font-semibold text-slate-700">{selectedLocation}</span>
              </span>
            )}
          </span>

          {isLoading ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
              <span>Fetching from Database...</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Database</span>
            </span>
          )}
        </div>

        {savedAuditionIds.length > 0 && (
          <div className="text-emerald-700 font-semibold flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>{savedAuditionIds.length} Auditions Bookmarked</span>
          </div>
        )}
      </div>

      {/* Search Results Grid */}
      {displayedAuditions.length > 0 ? (
        <div className="space-y-10">
          <div
            data-reveal="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedAuditions.map((audition) => {
            const tagStyle = CATEGORY_TAG_STYLES[audition.category] || {
              bg: "bg-slate-100",
              text: "text-slate-700",
              border: "border-slate-200",
              dot: "bg-slate-400",
            };
            const isSaved = savedAuditionIds.includes(audition.id);

            return (
              <div
                key={audition.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500/50 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07),0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.2),0_8px_20px_-6px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between space-y-6 overflow-hidden"
              >
                {/* Top Ambient Accent Shimmer */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ambient Soft Radial Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                {/* Card Top Meta */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border shadow-2xs ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot || "bg-emerald-500"}`} />
                        <span>{audition.category}</span>
                      </span>
                      {audition.isUrgent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/90 shadow-2xs">
                          <Flame className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                          <span>Urgent Call</span>
                        </span>
                      )}
                      {audition.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300/80 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleSaveAudition(audition.id, e)}
                      aria-label="Bookmark Audition"
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200/80 bg-slate-50/80 hover:bg-emerald-50 hover:border-emerald-300 text-slate-400 hover:text-emerald-600 transition-all duration-200 shadow-2xs active:scale-90 cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSaved ? "fill-emerald-600 text-emerald-600" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Production House */}
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => setSelectedAuditionForDetails(audition)}
                      className="text-[17px] font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200 leading-snug cursor-pointer line-clamp-2"
                    >
                      {audition.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/70 border border-slate-200/60 px-2.5 py-1 rounded-lg max-w-full">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{audition.productionHouse}</span>
                    </div>
                  </div>

                  {/* Badges / Specs Box */}
                  <div className="bg-gradient-to-br from-slate-50/90 via-slate-50/50 to-emerald-50/20 rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-2.5">
                    {/* Location */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <span className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-100/80 flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        </span>
                        <span>Location:</span>
                      </span>
                      <span className="text-slate-900 font-bold truncate">{audition.location}</span>
                    </div>

                    <div className="border-t border-slate-200/60" />

                    {/* Compensation */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-2 text-slate-500 font-medium shrink-0">
                        <span className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0">
                          <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                        <span>Compensation:</span>
                      </span>
                      <span className="text-[11px] sm:text-xs font-black text-emerald-700 bg-emerald-100/80 border border-emerald-200/90 px-2 py-0.5 rounded-md tracking-tight text-right leading-tight">
                        {audition.compensation}
                      </span>
                    </div>

                    <div className="border-t border-slate-200/60" />

                    {/* Deadline */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <span className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-100/80 flex items-center justify-center shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        </span>
                        <span>Deadline:</span>
                      </span>
                      <span className="text-slate-700 font-semibold">{audition.deadline}</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 px-0.5">
                    {audition.shortDescription}
                  </p>

                  {/* Key Requirements Tags */}
                  <div className="space-y-2 pt-0.5 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Role Specs & Skills
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-800 border border-slate-200/80 shadow-2xs">
                        {audition.rolesAvailable}
                      </span>
                      {audition.requirements.slice(0, 1).map((req, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white text-slate-600 border border-slate-200/80 truncate max-w-[190px] shadow-2xs"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAuditionForDetails(audition)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 hover:bg-slate-100/80 transition-all cursor-pointer"
                  >
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedAuditionForApply(audition)}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button on Home */}
        {isHome && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auditions"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>View All Auditions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-6 rounded-3xl bg-white border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Auditions Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find any casting calls matching your current filters. Try widening your
              search query or resetting location and category filters.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* MODAL 1: Audition Details Modal */}
      {mounted && selectedAuditionForDetails && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-0.5 text-xs font-bold rounded-full border ${
                      CATEGORY_TAG_STYLES[selectedAuditionForDetails.category]?.bg
                    } ${CATEGORY_TAG_STYLES[selectedAuditionForDetails.category]?.text} ${
                      CATEGORY_TAG_STYLES[selectedAuditionForDetails.category]?.border
                    }`}
                  >
                    {selectedAuditionForDetails.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {selectedAuditionForDetails.location}
                  </span>
                  {selectedAuditionForDetails.isUrgent && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-rose-500" />
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {selectedAuditionForDetails.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{selectedAuditionForDetails.productionHouse}</span>
                  <span>•</span>
                  <span>{selectedAuditionForDetails.projectType}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAuditionForDetails(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Highlight Stats Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-medium block">Compensation</span>
                  <span className="text-xs font-bold text-emerald-700">
                    {selectedAuditionForDetails.compensation}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-medium block">Audition Deadline</span>
                  <span className="text-xs font-bold text-slate-900">
                    {selectedAuditionForDetails.deadline}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-medium block">Open Spots</span>
                  <span className="text-xs font-bold text-teal-700">
                    {selectedAuditionForDetails.spotsOpen} Positions
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Project Synopsis & Casting Scope
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedAuditionForDetails.fullDescription}
                </p>
              </div>

              {/* Roles Available */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Target Profile & Age Bracket
                </h4>
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900 font-medium">
                  {selectedAuditionForDetails.rolesAvailable}
                </div>
              </div>

              {/* Mandatory Requirements */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Audition Requirements & Submission Guidelines
                </h4>
                <ul className="space-y-2">
                  {selectedAuditionForDetails.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedAuditionForDetails(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const item = selectedAuditionForDetails;
                  setSelectedAuditionForDetails(null);
                  setSelectedAuditionForApply(item);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL 2: Audition Application Modal */}
      {mounted && selectedAuditionForApply && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Official Audition Application
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
                  {selectedAuditionForApply.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedAuditionForApply.category} • {selectedAuditionForApply.location} •{" "}
                  {selectedAuditionForApply.compensation}
                </p>
              </div>

              <button
                type="button"
                onClick={closeApplyModal}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close application form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            {submitSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Your audition portfolio and contact details have been registered with the casting
                    team for <strong>{selectedAuditionForApply.title}</strong>. If shortlisted, our
                    directors will reach out within 48 to 72 hours with self-tape / screen test
                    instructions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="aryan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Showreel / Portfolio URL / Google Drive Reel *
                  </label>
                  <input
                    type="url"
                    required
                    value={applicantPortfolio}
                    onChange={(e) => setApplicantPortfolio(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or Drive link"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Artist Statement & Self-Tape Availability (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicantNotes}
                    onChange={(e) => setApplicantNotes(e.target.value)}
                    placeholder="Tell our casting directors about your past credits, vocal range, acting school, or shoot schedule flexibility..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Audition Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
