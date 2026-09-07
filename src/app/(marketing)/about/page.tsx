import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/animations/reveal';
import { Shield, Users, Trophy, Target, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'About Us | UniqueAI Technologies',
  description: 'Learn about UniqueAI — 15+ years of engineering enterprise software, trading technology, ERP systems, and AI automation.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <Reveal direction="up">
          <SectionHeading
            title="About UniqueAI Technologies"
            highlightText="UniqueAI"
            subtitle="Architecting intelligent, scalable, and high-performance software for market leaders and growing enterprises."
          />
        </Reveal>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal direction="up">
            <Card className="p-8 bg-white border border-emerald-100 rounded-2xl h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To empower businesses worldwide with resilient software engineering, low-latency financial tech, and intelligent workflow automation that drives real growth.
              </p>
            </Card>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <Card className="p-8 bg-white border border-emerald-100 rounded-2xl h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To be the premier global technology partner recognized for software excellence, cutting-edge AI integration, and total client satisfaction.
              </p>
            </Card>
          </Reveal>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-gray-900 text-center">Why Leading Brands Work With Us</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-100 rounded-xl space-y-3">
              <Shield className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-sm text-gray-900">Enterprise Security</h4>
              <p className="text-xs text-gray-500">Bank-grade security standards across all custom software applications.</p>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 rounded-xl space-y-3">
              <Users className="w-6 h-6 text-amber-500" />
              <h4 className="font-bold text-sm text-gray-900">15+ Years Experience</h4>
              <p className="text-xs text-gray-500">Deep domain engineering knowledge in fintech, retail, and ERP systems.</p>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 rounded-xl space-y-3">
              <Trophy className="w-6 h-6 text-teal-600" />
              <h4 className="font-bold text-sm text-gray-900">1200+ Projects Delivered</h4>
              <p className="text-xs text-gray-500">Proven track record of high-concurrency platforms and zero-downtime migrations.</p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
