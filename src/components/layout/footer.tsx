'use client';

import Link from 'next/link';
import { Heart, Globe, Share2, MessageCircle, Send } from 'lucide-react';

interface FooterProps {
  companyName?: string;
  tagline?: string;
}

export function Footer({
  companyName = 'UniqueAI',
  tagline = 'Technology for a Smarter Tomorrow',
}: FooterProps) {
  return (
    <footer className="bg-[#0b1e13] text-white pt-16 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand & Socials Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-extrabold text-white text-lg">
                U
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  {companyName}<span className="text-amber-400">.</span>
                </span>
                <span className="text-[9px] font-medium text-emerald-400 tracking-wider uppercase mt-0.5">
                  {tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Empowering modern enterprises with innovative software, financial technology, and intelligent AI automation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 hover:bg-pink-500 hover:text-white transition-colors" title="Global Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 hover:bg-pink-500 hover:text-white transition-colors" title="Social Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 hover:bg-pink-500 hover:text-white transition-colors" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 hover:bg-pink-500 hover:text-white transition-colors" title="Telegram">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/solutions/e-commerce-development" className="hover:text-pink-400 transition-colors">
                  E-Commerce Development
                </Link>
              </li>
              <li>
                <Link href="/solutions/stock-market-software" className="hover:text-pink-400 transition-colors">
                  Stock Market Software
                </Link>
              </li>
              <li>
                <Link href="/solutions/erp-solutions" className="hover:text-pink-400 transition-colors">
                  ERP Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-automation" className="hover:text-pink-400 transition-colors">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link href="/solutions/custom-software" className="hover:text-pink-400 transition-colors">
                  Custom Software
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/about" className="hover:text-pink-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-pink-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/insights" className="hover:text-pink-400 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-pink-400 transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-pink-400 transition-colors">
                  Live Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-400 transition-colors">
                  WhatsApp Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-4">
          <div>© {new Date().getFullYear()} UniqueAI. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
