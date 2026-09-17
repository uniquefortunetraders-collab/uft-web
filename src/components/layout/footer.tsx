'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

interface FooterProps {
  companyName?: string;
  tagline?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
}

interface SocialLinksData {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
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
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksData>({});

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('services')
      .select('id, title, slug')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setServices(data);
        }
      });

    // Fetch social links from site settings
    supabase
      .from('site_settings')
      .select('social_links')
      .single()
      .then(({ data }) => {
        if (data?.social_links) {
          setSocialLinks(data.social_links as SocialLinksData);
        }
      });
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <footer className="bg-white text-slate-700 pt-12 md:pt-16 pb-8 border-t border-gray-100 overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-8 lg:gap-10 pb-8 md:pb-12 border-b border-gray-100">

            {/* Column 1: Brand & Socials */}
            <div className="lg:col-span-1 space-y-4 pb-6 md:pb-0 border-b border-gray-100 md:border-b-0">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <Image
                  src="/uft-logo.png"
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

              {/* Social Icons Row - Only show icons with URLs configured in admin */}
              <div className="flex items-center space-x-2.5 pt-1">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white hover:border-[#e6005c] transition-all duration-200"
                    title="Facebook"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115V7.97l-1.31.001c-1.628 0-2.131.615-2.131 2.213v1.86h3.362l-.578 3.666h-2.784v7.98C19.396 23.004 23 18.965 23 14.097 23 8.618 18.523 4.146 13.044 4.146c-5.478 0-9.95 4.472-9.95 9.951 0 4.868 3.604 8.907 8.007 9.594z" />
                    </svg>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white hover:border-[#e6005c] transition-all duration-200"
                    title="X (Twitter)"
                    aria-label="Follow us on X"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white hover:border-[#e6005c] transition-all duration-200"
                    title="LinkedIn"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-pink-200 bg-pink-50/50 flex items-center justify-center text-[#e6005c] hover:bg-[#e6005c] hover:text-white hover:border-[#e6005c] transition-all duration-200"
                    title="Instagram"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
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
                  {services.length > 0 ? (
                    services.map((service) => (
                      <li key={service.id || service.slug}>
                        <Link
                          href={`/solutions/${service.slug}`}
                          className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
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
                    <Link href="/work" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Our Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Testimonials
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
                    <Link href="/blogs" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Blog & Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Support & FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-[#e6005c] transition-colors block py-0.5 md:py-0">
                      Inquiries
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

