'use client';

import { useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

interface SocialShareBarProps {
  title: string;
}

export function SocialShareBar({ title }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLinkedin = () => {
    if (typeof window !== 'undefined') {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200/80 my-6 text-xs">
      <div className="flex items-center gap-1.5 font-bold text-slate-700 mr-2">
        <Share2 className="w-4 h-4 text-[#e6005c]" />
        <span>Share:</span>
      </div>

      {/* LinkedIn Button */}
      <button
        onClick={handleShareLinkedin}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200/80 transition-colors font-semibold shadow-2xs cursor-pointer"
        title="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-blue-600" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" />
        </svg>
        <span>LinkedIn</span>
      </button>

      {/* X / Twitter Button */}
      <button
        onClick={handleShareTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 transition-colors font-semibold shadow-2xs cursor-pointer"
        title="Share on X (Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-slate-900" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 transition-colors font-semibold shadow-2xs cursor-pointer ml-auto"
        title="Copy Article Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
