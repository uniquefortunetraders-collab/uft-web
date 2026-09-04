'use client';

import { Users, PackageCheck, Award, Activity, Headphones, LucideIcon } from 'lucide-react';
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
    { icon: PackageCheck, value: '150+', label: 'Projects Delivered' },
    { icon: Award, value: '10+', label: 'Years of Experience' },
    { icon: Activity, value: '99.9%', label: 'System Uptime' },
    { icon: Headphones, value: '24/7', label: 'Expert Support' },
  ];

  const itemsToRender = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-10 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#e2f3e5] rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {itemsToRender.map((stat, index) => {
              const IconComponent =
                stat.icon && (typeof stat.icon === 'function' || typeof stat.icon === 'object')
                  ? stat.icon
                  : index === 0
                  ? Users
                  : index === 1
                  ? PackageCheck
                  : index === 2
                  ? Award
                  : index === 3
                  ? Activity
                  : Headphones;

              return (
                <Reveal key={index} direction="up" delay={index * 0.08}>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-gray-600 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
