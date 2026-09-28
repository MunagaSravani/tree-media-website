import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import CinematicTextObserver from "@/components/user/CinematicTextObserver";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Cinematic Text Reveal Observer for all user pages */}
      <CinematicTextObserver />
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
