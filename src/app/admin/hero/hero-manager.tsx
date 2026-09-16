'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/admin/image-upload';
import { updateHeroSection } from '@/actions/hero';
import { HeroSection } from '@/types/database';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Save,
  Check,
  Eye,
  Type,
  Link as LinkIcon,
  Image as ImageIcon,
  ListPlus,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface HeroManagerProps {
  initialHero: HeroSection | null;
}

export function HeroManager({ initialHero }: HeroManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live state for instant side-by-side visual preview
  const [eyebrow, setEyebrow] = useState(
    initialHero?.eyebrow || '1200+ Completed • Trusted by 1500+ Clients'
  );
  const [title, setTitle] = useState(initialHero?.title || 'Technology That');
  const [titleHighlight, setTitleHighlight] = useState(
    initialHero?.title_highlight || 'Empowers Every'
  );
  const [titleLine3, setTitleLine3] = useState(initialHero?.title_line3 || 'Business .');
  const [description, setDescription] = useState(
    initialHero?.description ||
      'UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.'
  );
  const [primaryLabel, setPrimaryLabel] = useState(
    initialHero?.primary_cta_label || 'Explore Solutions'
  );
  const [primaryUrl, setPrimaryUrl] = useState(initialHero?.primary_cta_url || '/solutions');
  const [secondaryLabel, setSecondaryLabel] = useState(
    initialHero?.secondary_cta_label || 'Talk to Our Experts'
  );
  const [secondaryUrl, setSecondaryUrl] = useState(initialHero?.secondary_cta_url || '/contact');
  const [heroImageUrl, setHeroImageUrl] = useState(
    initialHero?.hero_image_url || '/algo-trading-hero.png'
  );
  const [trustLabelsText, setTrustLabelsText] = useState(
    (initialHero?.trust_labels || [
      'Secure',
      'Scalable',
      'Smart Automation',
      'Reliable Support',
    ]).join('\n')
  );

  const trustLabelsList = trustLabelsText
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    if (initialHero?.id) {
      formData.set('id', initialHero.id);
    }

    try {
      const res = await updateHeroSection(formData);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to update hero section');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl pb-16">
      
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-6 sm:p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Homepage CMS Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Hero Section Management</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Customize the main banner text, CTA buttons, graphics, and trust badges displayed at the top of your homepage.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Live Site</span>
          </Link>
        </div>
      </div>

      {/* Success / Error Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">Hero Section Updated Successfully!</p>
            <p className="font-medium text-emerald-700 text-xs">Changes are now live on your homepage.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-bold flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Management Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Eyebrow & Main Headings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Type className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Headings & Copy text</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Eyebrow Pill Badge
                  </label>
                  <input
                    type="text"
                    name="eyebrow"
                    value={eyebrow}
                    onChange={(e) => setEyebrow(e.target.value)}
                    placeholder="1200+ Completed • Trusted by 1500+ Clients"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Badge pill text displayed above main heading.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Title Line 1 <span className="text-[#e6005c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Technology That"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-pink-600 mb-1">
                      Highlighted Text (Pink)
                    </label>
                    <input
                      type="text"
                      name="title_highlight"
                      value={titleHighlight}
                      onChange={(e) => setTitleHighlight(e.target.value)}
                      placeholder="Empowers Every"
                      className="w-full px-3 py-2 text-xs border border-pink-300 bg-pink-50/20 text-pink-900 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Title Line 3
                    </label>
                    <input
                      type="text"
                      name="title_line3"
                      value={titleLine3}
                      onChange={(e) => setTitleLine3(e.target.value)}
                      placeholder="Business ."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Description Subtitle
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter main hero description..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Section 2: Call to Action (CTA) Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <LinkIcon className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Call-to-Action (CTA) Buttons</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-pink-50/40 border border-pink-100 space-y-3">
                    <span className="text-[11px] font-bold text-[#e6005c] uppercase tracking-wider block">
                      Primary Pink Button
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Label</label>
                      <input
                        type="text"
                        name="primary_cta_label"
                        value={primaryLabel}
                        onChange={(e) => setPrimaryLabel(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Link URL</label>
                      <input
                        type="text"
                        name="primary_cta_url"
                        value={primaryUrl}
                        onChange={(e) => setPrimaryUrl(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Secondary Outline Button
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Label</label>
                      <input
                        type="text"
                        name="secondary_cta_label"
                        value={secondaryLabel}
                        onChange={(e) => setSecondaryLabel(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Link URL</label>
                      <input
                        type="text"
                        name="secondary_cta_url"
                        value={secondaryUrl}
                        onChange={(e) => setSecondaryUrl(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Hero Graphic Image */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Hero Graphic / Image Banner</h2>
                </div>

                <ImageUpload
                  name="hero_image_url"
                  label="Hero Banner Image Graphic"
                  defaultValue={heroImageUrl}
                  aspectRatio="video"
                  helperText="Recommended: 1200x900px transparent PNG or WebP graphic for maximum visual impact."
                />
              </div>

              {/* Section 4: Trust Checkmarks List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ListPlus className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Trust Checkmarks & Feature Labels</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trust Feature Badges (One per line)
                  </label>
                  <textarea
                    name="trust_labels"
                    rows={4}
                    value={trustLabelsText}
                    onChange={(e) => setTrustLabelsText(e.target.value)}
                    placeholder="Secure&#10;Scalable&#10;Smart Automation&#10;Reliable Support"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Each line will render as a green checkmark feature label under the CTA buttons.</p>
                </div>
              </div>

              {/* Form Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold rounded-xl px-7 py-3 text-xs shadow-md shadow-pink-500/20 cursor-pointer inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Hero Section</span>
                    </>
                  )}
                </Button>
              </div>

            </form>
          </Card>
        </div>

        {/* Right Column: Real-Time Visual Live Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Live Interactive Preview</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Real-Time
              </span>
            </div>

            <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-gradient-to-b from-[#eaf8f1] via-[#ddf4e8] to-[#ccefdc] shadow-md p-5 sm:p-6 space-y-4">
              
              {/* Eyebrow badge preview */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d2f3e3] border border-emerald-300/70 text-emerald-900 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span className="truncate">{eyebrow || 'Badge Text'}</span>
              </div>

              {/* Main Heading Preview */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {title} <br />
                <span className="text-[#e6005c]">{titleHighlight}</span> <br />
                <span className="text-[#e6005c]">{titleLine3}</span>
              </h2>

              {/* Description Preview */}
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {description || 'Hero section subtitle description goes here.'}
              </p>

              {/* CTAs Preview */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="px-4 py-2 bg-[#e6005c] text-white font-bold text-xs rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <span>{primaryLabel || 'Primary CTA'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                <div className="px-4 py-2 bg-white text-slate-800 border border-slate-200 font-semibold text-xs rounded-full inline-flex items-center gap-1.5">
                  <span>{secondaryLabel || 'Secondary CTA'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#e6005c]" />
                </div>
              </div>

              {/* Trust Checkmarks Preview */}
              <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                {trustLabelsList.length > 0 ? (
                  trustLabelsList.map((label, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-400 italic text-[11px]">No trust labels</span>
                )}
              </div>

              {/* Hero Graphic Image Preview */}
              <div className="pt-3 flex justify-center">
                <div className="relative w-full h-44 bg-white/40 backdrop-blur-xs rounded-xl border border-emerald-200/80 p-2 flex items-center justify-center overflow-hidden">
                  {heroImageUrl ? (
                    <Image
                      src={heroImageUrl}
                      alt="Hero Graphic Preview"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                      <ImageIcon className="w-6 h-6" />
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
