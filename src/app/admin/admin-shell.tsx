'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  FileText,
  MessageSquareQuote,
  Inbox,
  Settings,
  MapPin,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  User,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AdminLoginForm } from '@/components/admin/admin-login-form';

export function AdminShell({
  children,
  userEmail: initialUserEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null | undefined>(
    initialUserEmail
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setCurrentUserEmail(initialUserEmail);
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserEmail(session?.user?.email || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialUserEmail]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setCurrentUserEmail(null);
      window.location.href = '/admin/login';
    } catch {
      setCurrentUserEmail(null);
      window.location.href = '/admin/login';
    }
  };

  // When on the dedicated login page, render only the login view
  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  // When not logged in, render the login form directly at /admin
  if (!currentUserEmail) {
    return <AdminLoginForm redirectTo={pathname || '/admin'} />;
  }

  const navItems = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { section: 'Content Systems' },
    { href: '/admin/services', label: 'Services & Solutions', icon: Boxes },
    { href: '/admin/projects', label: 'Products & Plans', icon: Briefcase },
    { href: '/admin/blogs', label: 'Blogs', icon: FileText },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { section: 'Leads & Management' },
    { href: '/admin/inquiries', label: 'Project Inquiries', icon: Inbox, accent: true },
    { href: '/admin/offices', label: 'Office Locations', icon: MapPin },
    { href: '/admin/settings', label: 'Site & SEO Settings', icon: Settings },
  ];

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview';
    if (pathname.startsWith('/admin/services')) return 'Services & Solutions';
    if (pathname.startsWith('/admin/projects') || pathname.startsWith('/admin/products')) return 'Products & Pricing Plans';
    if (pathname.startsWith('/admin/blogs') || pathname.startsWith('/admin/insights')) return 'Blogs';
    if (pathname.startsWith('/admin/testimonials')) return 'Testimonials';
    if (pathname.startsWith('/admin/inquiries')) return 'Project Inquiries';
    if (pathname.startsWith('/admin/offices')) return 'Office Locations';
    if (pathname.startsWith('/admin/settings')) return 'Site & SEO Settings';
    return 'Admin';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-800">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/unique-fortune-logo.png"
            alt="Unique Fortune Logo"
            width={36}
            height={36}
            className="h-9 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-black text-sm text-amber-700 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
              Unique Fortune
            </span>
            <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase mt-0.5">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 text-xs font-medium overflow-y-auto">
        {navItems.map((item, idx) => {
          if (item.section) {
            return (
              <div
                key={idx}
                className="pt-4 pb-1.5 px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400"
              >
                {item.section}
              </div>
            );
          }

          const Icon = item.icon!;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href!);

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold ${
                isActive
                  ? item.accent
                    ? 'bg-pink-50 text-[#e6005c] shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? item.accent
                      ? 'text-[#e6005c]'
                      : 'text-emerald-700'
                    : item.accent
                    ? 'text-pink-500'
                    : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Account & Sign Out Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-800 truncate">
                {currentUserEmail ? currentUserEmail.split('@')[0] : 'Administrator'}
              </div>
              <div className="text-[9px] text-slate-400 truncate max-w-[110px]">
                {currentUserEmail || 'admin'}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50/70 font-sans text-slate-900">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed drawer on mobile, clean static column on desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 shadow-sm flex flex-col flex-shrink-0
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Global Desktop & Mobile Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Mobile hamburger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">{getPageTitle()}</span>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live CMS</span>
            </div>
          </div>
        </header>

        {/* Mobile sidebar close button inside drawer */}
        {sidebarOpen && (
          <button
            className="md:hidden absolute top-4 right-4 z-[60] p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
