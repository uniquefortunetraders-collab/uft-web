'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';

interface HeroProps {
  content?: {
    eyebrow?: string;
    title?: string;
    highlight_text?: string;
    description?: string;
    primary_cta_label?: string;
    primary_cta_url?: string;
    secondary_cta_label?: string;
    secondary_cta_url?: string;
    hero_image_url?: string;
    trust_labels?: string[];
  };
}

export function Hero({ content }: HeroProps) {
  const eyebrow = content?.eyebrow || 'SEBI Compliant • Trusted by 1000+ Clients';
  const description =
    content?.description ||
    'UniqueAI delivers innovative software, intelligent automation and market technology that help businesses grow, operate efficiently and stay ahead in a digital world.';
  const primaryLabel = content?.primary_cta_label || 'Explore Solutions';
  const primaryUrl = content?.primary_cta_url || '/solutions';
  const secondaryLabel = content?.secondary_cta_label || 'Talk to Our Experts';
  const secondaryUrl = content?.secondary_cta_url || '/contact';

  const trustLabels = content?.trust_labels || [
    'Secure',
    'Scalable',
    'Smart Automation',
    'Reliable Support',
  ];

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-white">
      {/* Subtle ambient light glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <Reveal direction="up" delay={0.1}>
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{eyebrow}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] sm:leading-[1.08] font-sans">
                Technology That <br />
                Empowers <span className="text-[#e6005c]">Every</span> <br />
                <span className="text-[#e6005c]">Business .</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-2">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <Link href={primaryUrl} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center gap-2 bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold rounded-full px-7 py-3.5 shadow-md shadow-pink-500/25 border-0 group cursor-pointer"
                  >
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href={secondaryUrl} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto justify-center gap-2 bg-white text-slate-800 border-gray-200 hover:border-gray-300 font-semibold rounded-full px-6 py-3.5 shadow-xs group cursor-pointer"
                  >
                    <span>{secondaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#e6005c] group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Checkmarks Row */}
              <div className="pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                {trustLabels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </Reveal>
          </div>

          {/* Right Column: Layered SaaS Product Showcase Mockup — hidden on mobile */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <Reveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-lg lg:max-w-none min-h-[460px] flex items-center justify-center">
                
                {/* Floating Badge: AI Powered */}
                <div className="absolute top-2 left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-lg shadow-slate-200/50 flex items-center gap-2 animate-bounce duration-1000" style={{ animationDuration: '4s' }}>
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">AI Powered</span>
                </div>

                {/* Floating Badge: Real-Time Analytics */}
                <div className="absolute top-8 right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-lg shadow-slate-200/50 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#e6005c]">
                    <Activity className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Real-Time Analytics</span>
                </div>

                {/* Main SaaS Dashboard Screen Card */}
                <div className="w-[90%] sm:w-[86%] bg-white rounded-2xl border border-gray-200/90 shadow-2xl shadow-slate-300/40 p-5 relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-slate-800 ml-2">Overview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-24 bg-gray-100 rounded-md" />
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-slate-500 font-medium">Total Revenue</div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">₹ 98,700</div>
                      <div className="text-[9px] font-bold text-emerald-600 mt-0.5">+15.2%</div>
                    </div>
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-slate-500 font-medium">Orders</div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">1,235</div>
                      <div className="text-[9px] font-bold text-emerald-600 mt-0.5">+12.1%</div>
                    </div>
                    <div className="bg-slate-50/80 p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-slate-500 font-medium">Customers</div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">8,765</div>
                      <div className="text-[9px] font-bold text-emerald-600 mt-0.5">+9.8%</div>
                    </div>
                  </div>

                  {/* Sales Analytics Chart Area */}
                  <div className="bg-slate-50/60 p-3 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-slate-800">Sales Analytics</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#e6005c]" />
                        <span className="text-[9px] text-slate-500">2026</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1" />
                        <span className="text-[9px] text-slate-500">2025</span>
                      </div>
                    </div>
                    {/* SVG Curve Chart */}
                    <svg viewBox="0 0 400 120" className="w-full h-24 overflow-visible">
                      <defs>
                        <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e6005c" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#e6005c" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,80 Q 70,30 140,65 T 280,30 T 400,20 L 400,120 L 0,120 Z" fill="url(#pinkGrad)" />
                      <path d="M 0,80 Q 70,30 140,65 T 280,30 T 400,20" fill="none" stroke="#e6005c" strokeWidth="2.5" />
                      <path d="M 0,95 Q 80,75 160,85 T 290,60 T 400,50" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                    </svg>
                    <div className="flex justify-between text-[8px] font-medium text-slate-400 mt-1">
                      <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                  </div>
                </div>

                {/* Floating Front Card: Stock Market Overview */}
                <div className="absolute -bottom-4 left-0 sm:left-2 z-30 w-56 sm:w-64 bg-white rounded-2xl border border-gray-200/90 shadow-xl shadow-slate-300/60 p-4">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stock Market Overview</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <div>
                      <div className="text-xs font-bold text-slate-700">NIFTY 50</div>
                      <div className="text-base sm:text-lg font-black text-slate-900">24,958.15</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +1.38%
                    </span>
                  </div>
                  {/* Green Sparkline */}
                  <div className="mt-2">
                    <svg viewBox="0 0 200 45" className="w-full h-10 overflow-visible">
                      <path d="M 0,35 Q 30,38 60,25 T 120,20 T 170,12 T 200,5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Floating Mobile Phone Mockup */}
                <div className="absolute -bottom-6 -right-2 sm:right-2 z-30 w-36 sm:w-44 bg-slate-900 rounded-[2rem] p-1.5 shadow-2xl shadow-slate-400/50 border-2 border-slate-700">
                  <div className="bg-white rounded-[1.7rem] p-3 text-center overflow-hidden">
                    {/* Speaker pill */}
                    <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-2" />
                    <div className="text-[10px] font-bold text-slate-800">AI Insights</div>
                    
                    {/* Gauge circle */}
                    <div className="relative w-16 h-16 mx-auto my-2 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeDasharray="82, 100"
                        />
                      </svg>
                      <div className="absolute text-[11px] font-black text-slate-900">82%</div>
                    </div>

                    <div className="text-[8px] font-semibold text-slate-500">Market Sentiment</div>

                    {/* Mini bar chart */}
                    <div className="flex items-end justify-center gap-1 h-6 mt-2 pt-1 border-t border-gray-100">
                      <div className="w-1.5 h-3 bg-emerald-400 rounded-t" />
                      <div className="w-1.5 h-5 bg-emerald-500 rounded-t" />
                      <div className="w-1.5 h-4 bg-emerald-400 rounded-t" />
                      <div className="w-1.5 h-6 bg-[#e6005c] rounded-t" />
                      <div className="w-1.5 h-4 bg-emerald-500 rounded-t" />
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

