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
      router.push('/admin');
      router.refresh();
    } catch {
      setCurrentUserEmail(null);
      router.push('/admin');
    }
  };

  // When on the dedicated login page, render only the login view
  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  // When not logged in, render the login form directly at /admin!
  if (!currentUserEmail) {
    return <AdminLoginForm redirectTo={pathname || '/admin'} />;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { section: 'Content Systems' },
    { href: '/admin/services', label: 'Services & Solutions', icon: Boxes },
    { href: '/admin/projects', label: 'Case Studies / Work', icon: Briefcase },
    { href: '/admin/insights', label: 'Blog & Insights', icon: FileText },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { section: 'Leads & Business' },
    { href: '/admin/inquiries', label: 'Project Inquiries', icon: Inbox, accent: true },
    { href: '/admin/offices', label: 'Offices', icon: MapPin },
    { href: '/admin/settings', label: 'Site & SEO Settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="p-5 border-b border-emerald-900/60 flex items-center gap-3">
        <Image
          src="/unique-fortune-logo.png"
          alt="Unique Fortune Logo"
          width={36}
          height={36}
          className="h-9 w-auto object-contain flex-shrink-0"
        />
        <div>
          <div className="font-black text-sm text-amber-400 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
            Unique Fortune
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5 tracking-wider uppercase">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 text-xs font-semibold overflow-y-auto">
        {navItems.map((item, idx) => {
          if (item.section) {
            return (
              <div
                key={idx}
                className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold tracking-wider text-emerald-500"
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-800/80 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900/80 hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  item.accent
                    ? 'text-pink-400'
                    : isActive
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-emerald-900/60 flex items-center justify-between text-xs text-emerald-400">
        <span className="truncate max-w-[140px]">{currentUserEmail || 'Admin'}</span>
        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="hover:text-pink-400 p-1 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on mobile (drawer), static on desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0b1e13] text-white flex flex-col border-r border-emerald-950 flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex
        `}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 bg-[#0b1e13] border-b border-emerald-900/60 flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <Image
              src="/unique-fortune-logo.png"
              alt="Unique Fortune Logo"
              width={30}
              height={30}
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-black text-amber-400" style={{ fontFamily: 'Georgia, serif' }}>
              Unique Fortune
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile sidebar close button inside drawer */}
        {sidebarOpen && (
          <button
            className="md:hidden absolute top-4 right-4 z-[60] p-1.5 rounded-lg bg-emerald-900/60 text-emerald-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
