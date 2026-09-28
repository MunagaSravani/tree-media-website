import HomeClientView from "@/components/user/HomeClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tree Media | Global Talent Agency & Creative Production House",
  description:
    "Tree Media represents visionary actors, world-class models, voice virtuosos, and visionary directors. We connect extraordinary creators with premier film studios and global brands.",
};

export default function HomePage() {
  return <HomeClientView />;
}
