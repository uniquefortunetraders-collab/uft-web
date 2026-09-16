'use client';
import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, User, Mail, Phone, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

interface HeaderProps {
  companyName?: string;
  whatsapp?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
}

export function Header({ companyName = 'UniqueAI', whatsapp }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch published services dynamically from Supabase database
    supabase
      .from('services')
      .select('id, title, slug')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setServices(data);
        }
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfileOpen(false);
    window.location.href = '/';
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const getLinkClasses = (path: string) =>
    cn(
      'px-3.5 py-2 text-sm transition-colors border-b-2',
      isActive(path)
        ? 'font-bold text-[#e6005c] border-[#e6005c]'
        : 'font-medium text-gray-700 border-transparent hover:text-[#e6005c]'
    );

  const getMobileLinkClasses = (path: string) =>
    cn(
      'block px-3 py-2.5 rounded-lg text-base transition-colors',
      isActive(path)
        ? 'font-semibold text-[#e6005c] bg-pink-50/70'
        : 'font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]'
    );

  return (
    <header className="sticky top-0 z-50 bg-[#eaf8f1]/95 backdrop-blur-md border-b border-emerald-200/50 transition-all w-full max-w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <Image
              src="/unique-fortune-logo.png"
              alt="Unique Fortune Logo"
              width={48}
              height={48}
              className="h-8 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity flex-shrink-0"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-lg font-black tracking-tight text-amber-700 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                Unique Fortune
              </span>
              <span className="text-[8px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.15em] text-amber-500 uppercase mt-0.5">
                Traders
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/" className={getLinkClasses('/')}>
              Home
            </Link>

            <Link href="/about" className={getLinkClasses('/about')}>
              About Us
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onMouseEnter={() => setSolutionsOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1 px-3.5 py-2 text-sm transition-colors cursor-pointer border-b-2",
                  isActive('/solutions')
                    ? 'font-bold text-[#e6005c] border-[#e6005c]'
                    : 'font-medium text-gray-700 border-transparent hover:text-[#e6005c]'
                )}
              >
                Solutions
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/solutions"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                  >
                    All Solutions & Services
                  </Link>

                  {services.length > 0 ? (
                    services.map((service) => (
                      <Link
                        key={service.id || service.slug}
                        href={`/solutions/${service.slug}`}
                        onClick={() => setSolutionsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c] transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="/solutions/e-commerce-development"
                        onClick={() => setSolutionsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                      >
                        E-Commerce Development
                      </Link>
                      <Link
                        href="/solutions/stock-market-software"
                        onClick={() => setSolutionsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                      >
                        Stock Market Software Solutions
                      </Link>
                      <Link
                        href="/solutions/erp-solutions"
                        onClick={() => setSolutionsOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                      >
                        ERP Solutions for Enterprises
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/work" className={getLinkClasses('/work')}>
              Products
            </Link>

            <Link href="/blogs" className={getLinkClasses('/blogs')}>
              Blogs
            </Link>

            <Link href="/contact" className={getLinkClasses('/contact')}>
              Contact
            </Link>
          </nav>

          {/* Action CTAs: Profile Icon if logged in, or Login & Get Started */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200 text-slate-800 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer font-medium text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-[#e6005c] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate font-bold text-xs sm:text-sm">
                    {user.user_metadata?.full_name || 'Client'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-[#e6005c] text-white flex items-center justify-center font-black text-sm uppercase flex-shrink-0 shadow-md">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm text-slate-900 truncate">
                          {user.user_metadata?.full_name || 'Client'}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                          Active Client Account
                        </span>
                      </div>
                    </div>

                    <div className="py-3 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Mail className="w-4 h-4 text-[#e6005c] flex-shrink-0" />
                        <span className="truncate font-medium text-slate-800">{user.email}</span>
                      </div>

                      <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-slate-800">
                          {user.user_metadata?.phone || user.user_metadata?.mobile_number || 'No mobile added'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="font-semibold text-gray-700 border-emerald-200 shadow-sm shadow-emerald-500/5 hover:border-emerald-400">
                    Login
                  </Button>
                </Link>
                <Link href="/login?mode=signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-100/60 text-gray-700 hover:text-emerald-700"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/')}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/about')}
          >
            About Us
          </Link>
          <Link
            href="/solutions"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/solutions')}
          >
            Solutions
          </Link>
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/work')}
          >
            Products
          </Link>
          <Link
            href="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/blogs')}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/contact')}
          >
            Contact
          </Link>

          {user ? (
            <div className="pt-3 border-t border-emerald-100 space-y-3">
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e6005c] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {user.user_metadata?.full_name || 'Client'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">
                      Client Profile
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#e6005c]" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{user.user_metadata?.phone || user.user_metadata?.mobile_number || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="md"
                className="w-full text-red-600 border-red-200 hover:bg-red-50 font-bold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/login?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}