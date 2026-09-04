'use client';

const TECHS = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <circle cx="32" cy="32" r="5.5" fill="#61DAFB"/>
        <ellipse cx="32" cy="32" rx="28" ry="10" stroke="#61DAFB" strokeWidth="2.5" fill="none"/>
        <ellipse cx="32" cy="32" rx="28" ry="10" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(60 32 32)"/>
        <ellipse cx="32" cy="32" rx="28" ry="10" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(120 32 32)"/>
      </svg>
    ),
    color: '#61DAFB',
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill="#339933" opacity="0.15"/>
        <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#339933" strokeWidth="2.5"/>
        <text x="32" y="37" textAnchor="middle" fill="#339933" fontSize="14" fontWeight="bold">N</text>
      </svg>
    ),
    color: '#339933',
  },
  {
    name: 'Laravel',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <path d="M32 8C22 8 16 16 16 26c0 10 8 18 16 30 8-12 16-20 16-30 0-10-6-18-16-18z" fill="#FF2D20" opacity="0.15"/>
        <path d="M32 8C22 8 16 16 16 26c0 10 8 18 16 30 8-12 16-20 16-30 0-10-6-18-16-18z" stroke="#FF2D20" strokeWidth="2"/>
        <circle cx="32" cy="26" r="6" fill="#FF2D20" opacity="0.8"/>
      </svg>
    ),
    color: '#FF2D20',
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <path d="M20 12h12c4 0 8 2 8 8v10H20V12z" fill="#3776AB"/>
        <path d="M44 52H32c-4 0-8-2-8-8V34h24v18z" fill="#FFD43B"/>
        <circle cx="26" cy="18" r="2" fill="white"/>
        <circle cx="38" cy="46" r="2" fill="white"/>
      </svg>
    ),
    color: '#3776AB',
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 64 64" className="w-7 h-7" fill="none">
        <path d="M12 36l8-8 8 6 12-16 12 16" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 46h48" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="32" y="60" textAnchor="middle" fill="#232F3E" fontSize="9" fontWeight="bold">AWS</text>
      </svg>
    ),
    color: '#FF9900',
  },
  {
    name: 'Google Cloud',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <path d="M42 32c0-5.5-4.5-10-10-10s-10 4.5-10 10c-4 0-8 3-8 7h36c0-4-4-7-8-7z" fill="none" stroke="#4285F4" strokeWidth="2.5"/>
        <circle cx="20" cy="32" r="4" fill="#EA4335"/>
        <circle cx="32" cy="22" r="4" fill="#FBBC04"/>
        <circle cx="44" cy="32" r="4" fill="#34A853"/>
      </svg>
    ),
    color: '#4285F4',
  },
  {
    name: 'Docker',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <rect x="8" y="30" width="40" height="18" rx="4" fill="#2496ED" opacity="0.15" stroke="#2496ED" strokeWidth="2"/>
        <rect x="12" y="22" width="8" height="8" rx="1" fill="#2496ED"/>
        <rect x="22" y="22" width="8" height="8" rx="1" fill="#2496ED"/>
        <rect x="32" y="22" width="8" height="8" rx="1" fill="#2496ED"/>
        <rect x="22" y="14" width="8" height="7" rx="1" fill="#2496ED"/>
        <path d="M52 32c-2-4-6-4-8-2" stroke="#2496ED" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#2496ED',
  },
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <circle cx="32" cy="32" r="24" fill="#000" opacity="0.85"/>
        <text x="32" y="38" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">N</text>
      </svg>
    ),
    color: '#000000',
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="#3178C6"/>
        <text x="32" y="42" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">TS</text>
      </svg>
    ),
    color: '#3178C6',
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
        <ellipse cx="32" cy="20" rx="20" ry="8" fill="#336791" opacity="0.2" stroke="#336791" strokeWidth="2"/>
        <path d="M12 20v24c0 4.4 9 8 20 8s20-3.6 20-8V20" stroke="#336791" strokeWidth="2"/>
        <path d="M52 32c0 4.4-9 8-20 8s-20-3.6-20-8" stroke="#336791" strokeWidth="2"/>
      </svg>
    ),
    color: '#336791',
  },
];

// Duplicate list for seamless infinite marquee
const TECHS_MARQUEE = [...TECHS, ...TECHS];

export function TechStrip() {
  return (
    <section className="relative py-5 px-4 sm:px-6 lg:px-8 bg-[#f1f8f3]">

      {/* Mobile-only label — sits ABOVE the card, outside border */}
      <p className="sm:hidden text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 text-center mb-2">
        Technologies We Work With
      </p>

      {/* Bordered card — max-width with left/right margin */}
      <div className="max-w-6xl mx-auto rounded-2xl border border-pink-200 bg-white shadow-sm shadow-pink-500/5 overflow-hidden">

        {/* Desktop: side-by-side — label left, marquee right. Mobile: marquee only */}
        <div className="flex items-stretch">

          {/* Label — hidden on mobile, visible on desktop as left column */}
          <div className="hidden sm:flex flex-shrink-0 px-5 h-14 items-center border-r border-pink-100 bg-pink-50/30">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 whitespace-nowrap">
              Technologies We Work With
            </span>
          </div>

          {/* Marquee track — full width on mobile, flex-1 on desktop */}
          <div className="relative flex-1 overflow-hidden h-14">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex items-center h-full animate-tech-scroll">
              {TECHS_MARQUEE.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 mx-5 flex-shrink-0 group cursor-default"
                >
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes tech-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-tech-scroll {
          animation: tech-scroll 28s linear infinite;
          width: max-content;
        }
        .animate-tech-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
