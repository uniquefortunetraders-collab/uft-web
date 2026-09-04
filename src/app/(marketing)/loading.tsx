import { CardSkeleton } from '@/components/ui/loading-skeleton';

export default function Loading() {
  return (
    <div className="py-20 bg-[#f1f8f3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-xl">
          <div className="h-12 bg-emerald-100/80 rounded-2xl animate-pulse" />
          <div className="h-6 bg-emerald-100/60 rounded-xl animate-pulse w-3/4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
