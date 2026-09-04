'use client';

import { Users, FolderCheck, Award, ShieldCheck, Headphones, LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

interface StatItem {
  icon?: LucideIcon | any;
  value: string;
  label: string;
}

interface TrustStatsProps {
  stats?: StatItem[];
}

export function TrustStats({ stats }: TrustStatsProps) {
  const defaultStats: StatItem[] = [
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: FolderCheck, value: '150+', label: 'Projects Delivered' },
    { icon: Award, value: '10+', label: 'Years of Experience' },
    { icon: ShieldCheck, value: '99.9%', label: 'System Uptime' },
    { icon: Headphones, value: '24/7', label: 'Expert Support' },
  ];

  const itemsToRender = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-6 sm:py-8 pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0b1329] border border-slate-800 text-white p-4 sm:p-8 md:p-10 shadow-2xl shadow-slate-900/20">
            
            {/* Background Digital Glowing Accents */}
            <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-10 bottom-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Abstract Circuit Graphic on right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
              <svg viewBox="0 0 300 150" className="w-full h-full text-blue-400" fill="none" stroke="currentColor">
                <circle cx="200" cy="75" r="50" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="200" cy="75" r="30" strokeWidth="1.5" />
                <path d="M 150,75 L 100,40 L 40,40" strokeWidth="1.5" />
                <path d="M 150,75 L 100,110 L 40,110" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="3" fill="currentColor" />
                <circle cx="40" cy="110" r="3" fill="currentColor" />
                <circle cx="200" cy="75" r="4" fill="#e6005c" stroke="#e6005c" />
              </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 mb-5 sm:mb-8 text-center sm:text-left">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-100 tracking-tight">
                Building Trust Through Results
              </h3>
            </div>

            {/* 5 Stats Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-6 lg:gap-8">
              {itemsToRender.map((stat, index) => {
                const IconComponent =
                  stat.icon && (typeof stat.icon === 'function' || typeof stat.icon === 'object')
                    ? stat.icon
                    : index === 0
                    ? Users
                    : index === 1
                    ? FolderCheck
                    : index === 2
                    ? Award
                    : index === 3
                    ? ShieldCheck
                    : Headphones;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-0 rounded-xl bg-white/[0.04] sm:bg-transparent border border-white/[0.06] sm:border-0 ${
                      index === 4 ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl bg-white/10 border border-white/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base sm:text-2xl lg:text-3xl font-black text-white leading-none tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1 leading-tight truncate">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

