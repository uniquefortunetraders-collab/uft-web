import Link from 'next/link';
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
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {}

  // Note: For setup flexibility, unauthenticated access shows login or layout preview
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1e13] text-white flex flex-col border-r border-emerald-950 flex-shrink-0">
        
        {/* Brand */}
        <div className="p-6 border-b border-emerald-900/60 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 font-black text-white flex items-center justify-center text-lg">
            U
          </div>
          <div>
            <div className="font-bold text-sm text-white leading-none">UniqueAI CMS</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Content Management</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 text-xs font-semibold">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>Dashboard</span>
          </Link>

          <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold tracking-wider text-emerald-500">
            Content Systems
          </div>

          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <Boxes className="w-4 h-4 text-emerald-400" />
            <span>Services & Solutions</span>
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Case Studies / Work</span>
          </Link>

          <Link
            href="/admin/insights"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Blog & Insights</span>
          </Link>

          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
            <span>Testimonials</span>
          </Link>

          <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold tracking-wider text-emerald-500">
            Leads & Business
          </div>

          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <Inbox className="w-4 h-4 text-pink-400" />
            <span>Project Inquiries</span>
          </Link>

          <Link
            href="/admin/offices"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Offices</span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-900/80 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Site & SEO Settings</span>
          </Link>
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-emerald-900/60 flex items-center justify-between text-xs text-emerald-400">
          <span className="truncate max-w-[140px]">{user?.email || 'Admin'}</span>
          <Link href="/admin/login" className="hover:text-pink-400">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>

    </div>
  );
}
