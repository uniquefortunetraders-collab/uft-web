'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  companyName?: string;
  tagline?: string;
}

export function Footer({
  companyName = 'Unique Fortune Traders',
}: FooterProps) {
  // Mobile accordion state: each section can be toggled independently
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    solutions: false,
    company: false,
    resources: false,
    offices: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <footer className="bg-white text-slate-700 pt-12 md:pt-16 pb-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-8 lg:gap-10 pb-8 md:pb-12 border-b border-gray-100">
            
            {/* Column 1: Brand & Socials */}
            <div className="lg:col-span-1 space-y-4 pb-6 md:pb-0 border-b border-gray-100 md:border-b-0">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <Image
                  src="/unique-fortune-logo.png"
                  alt="Unique Fortune Traders Logo"
                  width={44}
                  height={44}
                  className="h-11 w-auto object-contain group-hover:opacity-90 transition-opacity flex-shrink-0"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-black tracking-tight text-amber-700 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                    Unique Fortune
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.15em] text-amber-500 uppercase mt-0.5">
                    Traders
                  </span>
                </div>
              </Link>

              <p className="text-xs text-slate-500 leading-relaxed max-w-sm md:max-w-xs font-normal">
                We deliver innovative software solutions, market technology and intelligent automation that help businesses grow and succeed in the digital age.
              </p>

              {/* Social Icons Row */}
              <div className="flex items-center space-x-2.5 pt-1">
                {/* Facebook */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white transition-colors"
                  title="Facebook"
                >
                  <span className="text-xs font-bold font-mono">f</span>
                </a>
                {/* Twitter / X */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white transition-colors"
                  title="Twitter"
                >
                  <span className="text-xs font-bold font-mono">𝕏</span>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <span className="text-xs font-bold font-mono">in</span>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white transition-colors"
                  title="Instagram"
                >
                  <span className="text-xs font-bold font-mono">ig</span>
                </a>
              </div>
            </div>

            {/* Column 2: Solutions (Accordion on mobile, static on desktop) */}
            <div className="border-b border-gray-100 md:border-b-0 py-3.5 md:py-0">
              <button
                type="button"
                onClick={() => toggleSection('solutions')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:cursor-default group"
                aria-expanded={openSections.solutions}
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider md:mb-4 group-hover:text-[#e6005c] md:group-hover:text-slate-900 transition-colors">
                  Solutions
                </h4>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200 md:hidden",
                    openSections.solutions && "rotate-180 text-[#e6005c]"
                  )}
                />
              </button>
              <div
                className={cn(
                  "transition-all duration-200 md:block",
                  openSections.solutions ? "block pt-3" : "hidden md:block"
                )}
              >
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium pb-2 md:pb-0">
                  <li>
                    <Link href="/solutions/e-commerce-development" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      E-Commerce Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/stock-market-software" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Stock Market Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/erp-solutions" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      ERP Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/ai-automation" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      AI & Automation
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/custom-software" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Custom Software
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Company (Accordion on mobile, static on desktop) */}
            <div className="border-b border-gray-100 md:border-b-0 py-3.5 md:py-0">
              <button
                type="button"
                onClick={() => toggleSection('company')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:cursor-default group"
                aria-expanded={openSections.company}
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider md:mb-4 group-hover:text-[#e6005c] md:group-hover:text-slate-900 transition-colors">
                  Company
                </h4>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200 md:hidden",
                    openSections.company && "rotate-180 text-[#e6005c]"
                  )}
                />
              </button>
              <div
                className={cn(
                  "transition-all duration-200 md:block",
                  openSections.company ? "block pt-3" : "hidden md:block"
                )}
              >
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium pb-2 md:pb-0">
                  <li>
                    <Link href="/about" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/work" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Clients
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4: Resources (Accordion on mobile, static on desktop) */}
            <div className="border-b border-gray-100 md:border-b-0 py-3.5 md:py-0">
              <button
                type="button"
                onClick={() => toggleSection('resources')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:cursor-default group"
                aria-expanded={openSections.resources}
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider md:mb-4 group-hover:text-[#e6005c] md:group-hover:text-slate-900 transition-colors">
                  Resources
                </h4>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200 md:hidden",
                    openSections.resources && "rotate-180 text-[#e6005c]"
                  )}
                />
              </button>
              <div
                className={cn(
                  "transition-all duration-200 md:block",
                  openSections.resources ? "block pt-3" : "hidden md:block"
                )}
              >
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium pb-2 md:pb-0">
                  <li>
                    <Link href="/#blog" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/#blog" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 5: Our Offices (Accordion on mobile, static on desktop) */}
            <div className="border-b border-gray-100 md:border-b-0 py-3.5 md:py-0">
              <button
                type="button"
                onClick={() => toggleSection('offices')}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:cursor-default group"
                aria-expanded={openSections.offices}
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider md:mb-4 group-hover:text-[#e6005c] md:group-hover:text-slate-900 transition-colors">
                  Our Offices
                </h4>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200 md:hidden",
                    openSections.offices && "rotate-180 text-[#e6005c]"
                  )}
                />
              </button>
              <div
                className={cn(
                  "transition-all duration-200 md:block",
                  openSections.offices ? "block pt-3" : "hidden md:block"
                )}
              >
                <div className="space-y-4 text-xs text-slate-500 pb-2 md:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#e6005c]" />
                      <span>Cochin, Kerala</span>
                    </div>
                    <div className="pl-5 text-slate-600 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <a href="tel:+919447077076" className="hover:text-[#e6005c] transition-colors">
                        +91 94470 77076
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#e6005c]" />
                      <span>Bengaluru, Karnataka</span>
                    </div>
                    <div className="pl-5 text-slate-600 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <a href="tel:+919447077075" className="hover:text-[#e6005c] transition-colors">
                        +91 94470 77075
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar - Centered */}
          <div className="pt-6 md:pt-8 flex flex-col items-center justify-center text-xs text-slate-500 gap-1.5 text-center">
            <div>
              © 2026 {companyName === 'UniqueAI' ? 'Unique Fortune Traders' : companyName}. All rights reserved.
            </div>
            <div className="text-[11px] text-slate-400">
              Crafted by{' '}
              <a
                href="https://www.ekodrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-600 hover:text-[#e6005c] transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-[#e6005c]"
              >
                Ekodrix
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919447077076?text=Hello%20Unique%20Fortune%20Traders%2C%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />
      </a>
    </>
  );
}

