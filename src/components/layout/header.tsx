'use client';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  companyName?: string;
  whatsapp?: string;
}

export function Header({ companyName = 'UniqueAI', whatsapp }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[#eaf8f1]/95 backdrop-blur-md border-b border-emerald-200/50 transition-all">
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

          {/* Desktop Navigation: Home, About Us, Solutions, Products, Contact with dynamic active route indicator */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/" className={getLinkClasses('/')}>
              Home
            </Link>

            <Link href="/about" className={getLinkClasses('/about')}>
              About Us
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseLeave={() => setSolutionsOpen(false)}>
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
                    className="block px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                  >
                    All Solutions & Services
                  </Link>
                  <Link
                    href="/solutions/e-commerce-development"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                  >
                    E-Commerce Development
                  </Link>
                  <Link
                    href="/solutions/stock-market-software"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                  >
                    Stock Market Software Solutions
                  </Link>
                  <Link
                    href="/solutions/erp-solutions"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                  >
                    ERP Solutions for Enterprises
                  </Link>
                  <Link
                    href="/solutions/ai-automation"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#e6005c]"
                  >
                    AI & Automation Services
                  </Link>
                </div>
              )}
            </div>

            <Link href="/work" className={getLinkClasses('/work')}>
              Products
            </Link>

            <Link href="/contact" className={getLinkClasses('/contact')}>
              Contact
            </Link>
          </nav>

          {/* Action CTAs: Login & Get Started */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" size="sm" className="font-semibold text-gray-700 border-emerald-200 shadow-sm shadow-emerald-500/5 hover:border-emerald-400">
                Login
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
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
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClasses('/contact')}
          >
            Contact
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}