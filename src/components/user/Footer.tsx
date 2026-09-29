import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import TreeMediaLogo from "@/components/common/TreeMediaLogo";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <TreeMediaLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Tree Media is an elite global talent and casting agency representing visionary performers, actors, models, voice artists, and directors for international cinema, luxury fashion, and major brand campaigns.
            </p>
            <div className="text-xs text-[#DC8B20] font-mono font-medium">
              Hyderabad • Mumbai • Los Angeles • London
            </div>
          </div>

          {/* 1. Footer Navigation */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/services" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/profiles" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Talent Roster
                </Link>
              </li>
              <li>
                <Link href="/auditions" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors flex items-center gap-1.5">
                  <span>Casting & Auditions</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#2a1703] text-[#DC8B20] border border-[#DC8B20]/40">
                    Open
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/gallery" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/clients" prefetch={true} className="text-neutral-400 hover:text-[#DC8B20] transition-colors">
                  Brand Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Talent Categories */}
          <div className="col-span-16 sm:col-span-8 lg:col-span-3 space-y-3  lg:ml-12">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Talent Categories</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/profiles?category=Actor"
                  prefetch={true}
                  className="text-neutral-400 hover:text-[#DC8B20] transition-colors block"
                >
                  Actor
                </Link>
              </li>
              <li>
                <Link
                  href="/profiles?category=Model"
                  prefetch={true}
                  className="text-neutral-400 hover:text-[#DC8B20] transition-colors block"
                >
                  Model
                </Link>
              </li>
              <li>
                <Link
                  href="/profiles?category=Voice+Artist"
                  prefetch={true}
                  className="text-neutral-400 hover:text-[#DC8B20] transition-colors block"
                >
                  Voice Artist
                </Link>
              </li>
              <li>
                <Link
                  href="/profiles?category=Director"
                  prefetch={true}
                  className="text-neutral-400 hover:text-[#DC8B20] transition-colors block"
                >
                  Director
                </Link>
              </li>
              <li>
                <Link
                  href="/profiles?category=Musician"
                  prefetch={true}
                  className="text-neutral-400 hover:text-[#DC8B20] transition-colors block"
                >
                  Musician
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Official Information */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Official Info</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DC8B20] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Unit No: 303 B, 3rd Floor, New Mark House, Plot No: 56, Patrika Nagar, Madhapur Village, Sherlingampally Mandal, Hyderabad - 500081.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DC8B20] shrink-0" />
                <a href="tel:+918125524545" className="hover:text-[#DC8B20] transition-colors">
                  +91 8125524545
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DC8B20] shrink-0" />
                <a href="mailto:info@teensitsolutions.com" className="hover:text-[#DC8B20] transition-colors">
                  info@teensitsolutions.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-neutral-800 text-[11px] text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#DC8B20] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-neutral-300 block">Open Hours:</span>
                  <span className="block">Mon – Sat: 9 am – 6 pm,</span>
                  <span className="block text-neutral-400">Sunday: CLOSED</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Bottom Bar with Privacy Policy & Terms and Conditions */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Tree Media Agency Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              prefetch={true}
              className="text-neutral-400 hover:text-[#DC8B20] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              prefetch={true}
              className="text-neutral-400 hover:text-[#DC8B20] transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/auditions"
              prefetch={true}
              className="text-neutral-400 hover:text-[#DC8B20] transition-colors"
            >
              Casting & Auditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
