import Skeleton from '@/components/ui/skeleton';

export default function LoadingProducts() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <Skeleton className="mb-3 h-40 w-full rounded-lg" />
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="mb-2 h-5 w-32" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-4 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}