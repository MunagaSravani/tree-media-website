import type { Metadata } from "next";
import "./globals.css";
import CinematicBackground from "@/components/user/CinematicBackground";
import PageNavigationLoader from "@/components/common/PageNavigationLoader";

export const metadata: Metadata = {
  title: "Tree Media | Global Talent Agency & Creative Production House",
  description:
    "Tree Media represents visionary actors, world-class models, voice artists, and cinematic directors. Connecting elite talent with premier film studios and international brands.",
  keywords: [
    "Talent Agency",
    "Actors Representation",
    "Modeling Agency",
    "Voiceover Artists",
    "Film Directors",
    "Commercial Casting",
    "Media Production",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-50 text-slate-900 antialiased selection:bg-[#DC8B20] selection:text-white">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-[#5f6360] flex flex-col font-sans relative">
        {/* Global Page Navigation Progress & Transition Loader */}
        <PageNavigationLoader />

        {/* YRF / Red Chillies Inspired 3D Atmospheric Canvas */}
        <CinematicBackground />

        {/* Authentic 35mm Studio Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Main Application Flow */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
