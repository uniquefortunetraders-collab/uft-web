import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar } from 'lucide-react';

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    inquiries = data || [];
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Project Inquiries (Leads)</h1>
        <p className="text-xs text-gray-500 mt-1">Review contact form submissions and lead details from prospective clients.</p>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <Card className="p-12 text-center text-gray-400 bg-white">
            No inquiries recorded yet. Form submissions on the homepage will populate here automatically.
          </Card>
        ) : (
          inquiries.map((inq) => (
            <Card key={inq.id} className="p-6 bg-white border border-gray-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <div className="text-base font-bold text-gray-900">{inq.client_name}</div>
                  <div className="text-xs font-semibold text-pink-600">{inq.project_type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={inq.status === 'new' ? 'pink' : 'emerald'}>
                    {inq.status}
                  </Badge>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <a href={`mailto:${inq.client_email}`} className="hover:underline font-medium">
                    {inq.client_email}
                  </a>
                </div>
                {inq.client_phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <a href={`tel:${inq.client_phone}`} className="hover:underline font-medium">
                      {inq.client_phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-800">
                <div className="font-bold text-gray-500 uppercase text-[10px] mb-1">Project Brief</div>
                <p className="whitespace-pre-line leading-relaxed">{inq.project_brief}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
