import Link from 'next/link';
import { Boxes, Briefcase, FileText, Inbox, ArrowUpRight, Plus, Eye, MessageSquare, Clock, ShieldCheck, MapPin, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function AdminDashboardPage() {
  let stats = {
    servicesCount: 0,
    projectsCount: 0,
    postsCount: 0,
    inquiriesCount: 0,
  };

  let recentInquiries: any[] = [];

  try {
    const supabase = await createClient();

    const [servicesRes, projectsRes, postsRes, inquiriesRes, recentRes] = await Promise.all([
      supabase.from('services').select('id', { count: 'exact' }),
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('blog_posts').select('id', { count: 'exact' }),
      supabase.from('project_inquiries').select('id', { count: 'exact' }),
      supabase
        .from('project_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    stats.servicesCount = servicesRes.count || 0;
    stats.projectsCount = projectsRes.count || 0;
    stats.postsCount = postsRes.count || 0;
    stats.inquiriesCount = inquiriesRes.count || 0;
    recentInquiries = recentRes.data || [];
  } catch {}

  const kpiCards = [
    {
      title: 'Services & Solutions',
      count: stats.servicesCount,
      href: '/admin/services',
      linkLabel: 'Manage Services',
      icon: Boxes,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80',
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Products & Plans',
      count: stats.projectsCount,
      href: '/admin/projects',
      linkLabel: 'Manage Products',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200/80',
      badge: 'Plans',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Blogs',
      count: stats.postsCount,
      href: '/admin/blogs',
      linkLabel: 'Manage Blogs',
      icon: FileText,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/80',
      badge: 'Blogs',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Client Inquiries',
      count: stats.inquiriesCount,
      href: '/admin/inquiries',
      linkLabel: 'View Inquiries',
      icon: Inbox,
      iconBg: 'bg-pink-50 text-[#e6005c] border border-pink-200/80',
      badge: 'Leads',
      badgeColor: 'bg-pink-100 text-[#e6005c]',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unique Fortune Traders Admin CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Real-time management of published software services, case studies, blogs, and customer inquiries.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e6005c] hover:bg-[#cc0052] text-white text-xs font-bold transition-all shadow-sm shadow-pink-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Inbox className="w-3.5 h-3.5 text-pink-400" />
            <span>View Leads ({stats.inquiriesCount})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={idx}
              className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${kpi.badgeColor}`}>
                  {kpi.badge}
                </span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${kpi.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {kpi.count}
              </div>

              <div className="text-xs font-bold text-slate-600 mt-1 truncate">
                {kpi.title}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={kpi.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-[#e6005c] transition-colors"
                >
                  <span>{kpi.linkLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Inquiries and Fast Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inquiries List (2 cols on lg) */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-7 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <h2 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h2>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-[#e6005c] hover:underline"
              >
                View All Leads →
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <Inbox className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700">No Inquiries Received Yet</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                  Customer project submissions from the website contact form will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-xl transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{inq.client_name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {inq.project_type || 'General Inquiry'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {inq.client_email} {inq.client_phone ? `• ${inq.client_phone}` : ''}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <Badge variant={inq.status === 'new' ? 'pink' : 'emerald'}>
                        {inq.status}
                      </Badge>
                      <Link
                        href={`/admin/inquiries?id=${inq.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Quick Management Shortcuts */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">System Modules</h3>
            
            <div className="space-y-2 text-xs font-semibold">
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-4 h-4 text-emerald-600" />
                  <span>Manage Core Services</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
              </Link>

              <Link
                href="/admin/blogs"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Publish Blogs</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700" />
              </Link>

              <Link
                href="/admin/offices"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Update Office Locations</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-purple-600" />
                  <span>Site &amp; SEO Configuration</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700" />
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
