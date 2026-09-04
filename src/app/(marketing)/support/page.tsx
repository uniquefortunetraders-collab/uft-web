import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { Headphones, MessageSquare, Mail, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Client Support & Help Center | UniqueAI',
  description: '24/7 Technical Support, product assistance, and system helpdesk for UniqueAI clients.',
};

export default function SupportPage() {
  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Reveal direction="up">
          <SectionHeading
            title="Support & Helpdesk"
            highlightText="Support"
            subtitle="We are here 24/7 to ensure continuous uptime, software maintenance, and expert technical support."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-white border border-emerald-100 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Dedicated Support</h3>
              <p className="text-xs text-gray-600">24/7 priority technical helpdesk for enterprise clients.</p>
            </div>
            <Link href="/contact">
              <Button variant="primary" size="sm" className="w-full text-xs">
                Open Support Ticket
              </Button>
            </Link>
          </Card>

          <Card className="p-8 bg-white border border-emerald-100 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">WhatsApp Instant Chat</h3>
              <p className="text-xs text-gray-600">Chat directly with a software engineer for quick queries.</p>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Chat on WhatsApp
              </Button>
            </a>
          </Card>

          <Card className="p-8 bg-white border border-emerald-100 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
              <p className="text-xs text-gray-600">Email support@uniqueai.com for maintenance requests.</p>
            </div>
            <a href="mailto:contact@uniqueai.com">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Send Email
              </Button>
            </a>
          </Card>
        </div>

      </div>
    </div>
  );
}
