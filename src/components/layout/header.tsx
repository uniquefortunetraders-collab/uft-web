'use client';

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
      'px-3.5 py-2 text-sm transition-colors',
      isActive(path)
        ? 'font-bold text-rose-500 border-b-2 border-rose-500'
        : 'font-medium text-gray-700 hover:text-rose-500'
    );

  const getMobileLinkClasses = (path: string) =>
    cn(
      'block px-3 py-2 rounded-lg text-base transition-colors',
      isActive(path)
        ? 'font-semibold text-rose-500 bg-rose-50/60'
        : 'font-medium text-gray-700 hover:bg-emerald-50'
    );

  return (
    <header className="sticky top-0 z-50 bg-[#f1f8f3]/95 backdrop-blur-md border-b border-emerald-100/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-extrabold text-xl group-hover:scale-105 transition-transform flex-shrink-0">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
                {companyName}<span className="text-amber-500">.</span>
              </span>
              <span className="text-[9px] font-bold text-gray-500 tracking-wider uppercase mt-1 whitespace-nowrap">
                TECHNOLOGY FOR A SMARTER TOMORROW
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
                  "inline-flex items-center gap-1 px-3.5 py-2 text-sm transition-colors cursor-pointer",
                  isActive('/solutions')
                    ? 'font-bold text-rose-500 border-b-2 border-rose-500'
                    : 'font-medium text-gray-700 hover:text-rose-500'
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
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-rose-500"
                  >
                    E-Commerce Development
                  </Link>
                  <Link
                    href="/solutions/stock-market-software"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-rose-500"
                  >
                    Stock Market Software Solutions
                  </Link>
                  <Link
                    href="/solutions/erp-solutions"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#ff3b7c]"
                  >
                    ERP Solutions for Enterprises
                  </Link>
                  <Link
                    href="/solutions/ai-automation"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#ff3b7c]"
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
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="font-semibold text-gray-700 border-emerald-200 shadow-sm shadow-pink-500/5">
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
              className="p-2 rounded-xl bg-emerald-100/60 text-gray-700 hover:text-rose-500"
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
            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
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
