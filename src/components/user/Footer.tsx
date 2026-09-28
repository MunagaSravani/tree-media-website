import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import TreeMediaLogo from "@/components/common/TreeMediaLogo";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <TreeMediaLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Tree Media is an elite global talent agency representing visionary performers, actors, models, voice virtuosos, and directors for international film, high-fashion, and brand campaigns.
            </p>
            <div className="text-xs text-emerald-400 font-mono font-medium">
              Los Angeles • London • Paris • Tokyo
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Agency Services
                </Link>
              </li>
              <li>
                <Link href="/profiles" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Talent Roster
                </Link>
              </li>
              <li>
                <Link href="/auditions" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Casting & Auditions</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Open
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/gallery" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/clients" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Brand Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Contact Agency
                </Link>
              </li>
            </ul>
          </div>

          {/* Agency Divisions */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Roster Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profiles?category=Actor" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Lead & Character Actors
                </Link>
              </li>
              <li>
                <Link href="/profiles?category=Model" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Haute Couture & Commercial Models
                </Link>
              </li>
              <li>
                <Link href="/profiles?category=Voice+Artist" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Voiceover & Narration Talents
                </Link>
              </li>
              <li>
                <Link href="/profiles?category=Director" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Cinematic Directors & Filmmakers
                </Link>
              </li>
              <li>
                <Link href="/profiles?category=Musician" prefetch={true} className="text-neutral-400 hover:text-emerald-400 transition-colors">
                  Composers & Recording Artists
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Info & Location Details */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Official Info</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+918125524545" className="hover:text-emerald-400 transition-colors">
                  +91 8125524545
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@teensitsolutions.com" className="hover:text-emerald-400 transition-colors">
                  info@teensitsolutions.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-neutral-800 text-[11px] text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-neutral-300 block">Open Hours:</span>
                  <span className="block">Mon – Sat: 9 am – 6 pm,</span>
                  <span className="block text-neutral-400">Sunday: CLOSED</span>
                </div>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Submit Representation Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Tree Media Agency Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer">Terms of Representation</span>
            <span className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer">Talent Submissions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
