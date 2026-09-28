import SearchAuditionsSection from "@/components/user/SearchAuditionsSection";
import PageAtmosphere from "@/components/user/PageAtmosphere";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auditions & Casting Calls | Tree Media Agency",
  description:
    "Explore verified audition opportunities and casting calls for actors, models, vocalists, dancers, anchors, and content creators across India with Tree Media Agency.",
};

export default function AuditionsPage() {
  return (
    <div className="relative pt-6 pb-20 min-h-screen">
      {/* Spotlight Stage & Casting Viewfinder Atmosphere */}
      <PageAtmosphere variant="auditions" />

      <SearchAuditionsSection />
    </div>
  );
}
