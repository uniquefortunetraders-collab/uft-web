'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

interface CtaBannerProps {
  whatsapp?: string;
  phone?: string;
}

export function CtaBanner({
  whatsapp = '+919447077076',
}: CtaBannerProps) {
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="py-8 pb-14 sm:py-10 sm:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-pink-100/80 via-rose-50/90 to-pink-100/70 border border-pink-200/80 p-5 sm:p-8 md:p-12 shadow-sm">
            
            {/* Soft glowing ambient lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
              {/* Left Copy */}
              <div className="max-w-2xl space-y-2 text-center lg:text-left">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#e6005c] tracking-tight leading-tight">
                  Ready to Transform Your Business? <br className="hidden sm:inline" />
                  <span className="text-slate-900">Let&apos;s Build Something Great Together.</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                  Share your ideas with us and our experts will help you find the right solution.
                </p>
              </div>

              {/* Right Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-shrink-0 w-full lg:w-auto">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Unique%20Fortune%20Traders%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-full bg-white border border-gray-200 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 hover:border-gray-300 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-full bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-pink-500/25 group"
                >
                  <span>Contact Us Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
