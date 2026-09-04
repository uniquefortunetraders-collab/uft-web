import Link from 'next/link';
import { Boxes, Briefcase, FileText, Inbox, ArrowUpRight } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-black text-gray-900">UniqueAI Management Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">Manage content, services, portfolio, blog posts, and lead inquiries.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Services</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">{stats.servicesCount}</div>
          <Link href="/admin/services" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold mt-4 hover:underline">
            <span>Manage Services</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Projects</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">{stats.projectsCount}</div>
          <Link href="/admin/projects" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold mt-4 hover:underline">
            <span>Manage Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Blog Posts</span>
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">{stats.postsCount}</div>
          <Link href="/admin/insights" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold mt-4 hover:underline">
            <span>Manage Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Inquiries</span>
            <div className="p-2 bg-pink-100 rounded-xl text-pink-700">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">{stats.inquiriesCount}</div>
          <Link href="/admin/inquiries" className="inline-flex items-center gap-1 text-xs text-pink-700 font-bold mt-4 hover:underline">
            <span>View Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

      </div>

      {/* Recent Inquiries */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Recent Project Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs font-bold text-pink-600 hover:underline">
            View All
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">
            No inquiries received yet. Submissions from the website contact form will appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-900">{inq.client_name}</div>
                  <div className="text-xs text-gray-500">{inq.client_email} • {inq.project_type}</div>
                </div>
                <Badge variant={inq.status === 'new' ? 'pink' : 'emerald'}>
                  {inq.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

    </div>
  );
}
