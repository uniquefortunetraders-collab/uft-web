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
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-[#eaf8f1] via-[#ddf4e8] to-[#ccefdc]">
      {/* Soft luminous ambient glows matching the reference */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-teal-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#a7f3d0]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <Reveal direction="up" delay={0.1}>
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d2f3e3] border border-emerald-300/70 text-emerald-900 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
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
                    className="w-full sm:w-auto justify-center gap-2 bg-white text-slate-800 border-gray-200 hover:border-pink-300 hover:text-[#e6005c] font-semibold rounded-full px-6 py-3.5 shadow-xs group cursor-pointer"
                  >
                    <span>{secondaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#e6005c] group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Checkmarks Row - Balanced 2x2 on Mobile, Flex Row on Desktop */}
              <div className="pt-4 sm:pt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 mt-2 sm:mt-4">
                {trustLabels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </Reveal>
          </div>

          {/* Right Column: Layered SaaS Product Showcase Mockup (Visible on Mobile & Desktop) */}
          <div className="block lg:col-span-6 relative mt-8 lg:mt-0 w-full">
            <Reveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
                
                {/* Floating Badge: AI Powered (Green) */}
                <div className="absolute top-0 left-2 sm:left-6 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-gray-200/80 shadow-md shadow-slate-200/50 flex items-center gap-1.5 sm:gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800">AI Powered</span>
                </div>

                {/* Floating Badge: Real-Time Analytics (Pink) */}
                <div className="absolute top-2 sm:top-8 right-1 sm:right-2 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-gray-200/80 shadow-md shadow-slate-200/50 flex items-center gap-1.5 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#e6005c]">
                    <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-800">Real-Time Analytics</span>
                </div>

                {/* Main SaaS Dashboard Screen Card */}
                <div className="w-full sm:w-[88%] bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xl shadow-slate-300/40 p-4 sm:p-5 relative z-10">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 ml-1 sm:ml-2">Live Overview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 sm:h-5 sm:w-24 bg-gray-100 rounded-md" />
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">U</div>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-slate-50/80 p-2 sm:p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate">Revenue</div>
                      <div className="text-[11px] sm:text-sm font-black text-slate-900 mt-0.5 truncate">₹ 98.7K</div>
                      <div className="text-[8px] sm:text-[9px] font-bold text-emerald-600 mt-0.5">+15.2%</div>
                    </div>
                    <div className="bg-slate-50/80 p-2 sm:p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate">Orders</div>
                      <div className="text-[11px] sm:text-sm font-black text-slate-900 mt-0.5 truncate">1,235</div>
                      <div className="text-[8px] sm:text-[9px] font-bold text-[#e6005c] mt-0.5">+12.1%</div>
                    </div>
                    <div className="bg-slate-50/80 p-2 sm:p-2.5 rounded-xl border border-gray-100">
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate">Clients</div>
                      <div className="text-[11px] sm:text-sm font-black text-slate-900 mt-0.5 truncate">8,765</div>
                      <div className="text-[8px] sm:text-[9px] font-bold text-emerald-600 mt-0.5">+9.8%</div>
                    </div>
                  </div>

                  {/* Sales Analytics Chart Area with Pink & Green duo curves */}
                  <div className="bg-slate-50/60 p-2.5 sm:p-3 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-800">Growth Index</span>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#e6005c]" />
                        <span className="text-[8px] sm:text-[9px] text-slate-500">2026</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1" />
                        <span className="text-[8px] sm:text-[9px] text-slate-500">2025</span>
                      </div>
                    </div>
                    {/* SVG Curve Chart */}
                    <svg viewBox="0 0 400 110" className="w-full h-16 sm:h-20 overflow-visible">
                      <defs>
                        <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e6005c" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#e6005c" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,75 Q 70,25 140,60 T 280,25 T 400,15 L 400,110 L 0,110 Z" fill="url(#pinkGrad)" />
                      <path d="M 0,75 Q 70,25 140,60 T 280,25 T 400,15" fill="none" stroke="#e6005c" strokeWidth="2.5" />
                      <path d="M 0,90 Q 80,70 160,80 T 290,55 T 400,45" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                    </svg>
                    <div className="flex justify-between text-[8px] font-medium text-slate-400 mt-1">
                      <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                  </div>
                </div>

                {/* Floating Front Card: Stock Market Overview */}
                <div className="absolute -bottom-3 left-0 sm:left-2 z-20 w-44 sm:w-60 bg-white rounded-2xl border border-gray-200/90 shadow-xl shadow-slate-300/60 p-2.5 sm:p-4">
                  <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trading Engine</div>
                  <div className="flex items-baseline justify-between mt-0.5 sm:mt-1">
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-700">NIFTY 50</div>
                      <div className="text-xs sm:text-base font-black text-slate-900">24,958.15</div>
                    </div>
                    <span className="text-[9px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                      +1.38%
                    </span>
                  </div>
                  {/* Green Sparkline */}
                  <div className="mt-1">
                    <svg viewBox="0 0 200 40" className="w-full h-6 sm:h-8 overflow-visible">
                      <path d="M 0,30 Q 30,35 60,20 T 120,15 T 170,10 T 200,4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Floating Mobile Phone Mockup */}
                <div className="absolute -bottom-4 -right-1 sm:right-2 z-20 w-28 sm:w-40 bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-1 sm:p-1.5 shadow-2xl shadow-slate-400/50 border-2 border-slate-700">
                  <div className="bg-white rounded-[1.2rem] sm:rounded-[1.7rem] p-2 sm:p-3 text-center overflow-hidden">
                    <div className="w-6 sm:w-10 h-1 bg-slate-200 rounded-full mx-auto mb-1" />
                    <div className="text-[8px] sm:text-[10px] font-bold text-slate-800">AI Engine</div>
                    
                    {/* Gauge circle */}
                    <div className="relative w-10 h-10 sm:w-14 sm:h-14 mx-auto my-1 flex items-center justify-center">
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
                          strokeDasharray="88, 100"
                        />
                      </svg>
                      <div className="absolute text-[9px] sm:text-[11px] font-black text-slate-900">88%</div>
                    </div>

                    <div className="text-[7px] sm:text-[8px] font-semibold text-slate-500">Live Accuracy</div>
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

