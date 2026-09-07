'use client';

import { useState, useTransition } from 'react';
import { MessageSquare, PhoneCall, Mail, Send, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/animations/reveal';
import { submitInquiry } from '@/actions/inquiries';

interface ContactSectionProps {
  settings?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  offices?: Array<{
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  }>;
}

export function ContactSection({ settings, offices }: ContactSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const phone = settings?.phone || '+91 94470 77076';
  const email = settings?.email || 'uniqueai.2025@gmail.com';
  const whatsappNumber = settings?.whatsapp || '+919447077076';

  const defaultOffices = [
    {
      name: 'Cochin, Kerala',
      phone: phone,
      email: email,
    },
    {
      name: 'Bengaluru, Karnataka',
      phone: phone,
      email: email,
    },
  ];

  const officesToRender = offices && offices.length > 0 ? offices : defaultOffices;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitInquiry(formData);
      if (res.success) {
        setStatus({ success: true, message: res.message });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ success: false, message: res.message });
      }
    });
  };

  return (
    <section className="py-16 md:py-24 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Copy & Quick Badges */}
          <div className="lg:col-span-4">
            <Reveal direction="up">
              <SectionHeading
                title="Let's build something great together."
                highlightText="great together."
                align="left"
                className="mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Tell us about your project and our experts will help you find the right solution.
              </p>

              {/* Contact Action Pills */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20UniqueAI%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-emerald-100/90 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 hover:bg-emerald-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-700 uppercase font-semibold">Chat on WhatsApp</div>
                    <div>We reply instantly</div>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 px-4 py-3 bg-teal-50 border border-teal-200 rounded-2xl text-xs font-bold text-teal-900 hover:bg-teal-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-teal-700 uppercase font-semibold">Call Us</div>
                    <div>{phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Email Us</div>
                    <div>{email}</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Center Column: Inquiry Form Card */}
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.1}>
              <Card className="bg-white p-6 sm:p-8 border border-emerald-200 shadow-xl rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="client_name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="client_email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="client_phone"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      What do you need? <span className="text-emerald-600">*</span>
                    </label>
                    <select
                      name="project_type"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="E-Commerce Development">E-Commerce Development</option>
                      <option value="Stock Market Software Solutions">Stock Market Software Solutions</option>
                      <option value="ERP Solutions for Enterprises">ERP Solutions for Enterprises</option>
                      <option value="AI & Automation Services">AI & Automation Services</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Other Technology Requirement">Other Technology Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Message <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      name="project_brief"
                      rows={3}
                      required
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {status && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        status.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {status.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isPending}
                    variant="primary"
                    size="lg"
                    className="w-full gap-2 mt-2"
                  >
                    {isPending ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Card>
            </Reveal>
          </div>

          {/* Right Column: Our Offices & Map Graphic */}
          <div className="lg:col-span-3">
            <Reveal direction="up" delay={0.2}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">Our Offices</h3>
                  <div className="space-y-4">
                    {officesToRender.map((off, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span>{off.name}</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-6 space-y-0.5">
                          {off.phone && <div>{off.phone}</div>}
                          {off.email && <div className="text-emerald-700 font-medium">{off.email}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Map Graphical Visual */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-emerald-100/90 border border-emerald-300 flex items-center justify-center p-4">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="relative z-10 text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[10px] font-bold text-emerald-800 shadow-sm">
                      <MapPin className="w-3 h-3 text-pink-500" />
                      <span>Cochin & Bengaluru</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-900">Serving clients nationwide across India & Global</div>
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
