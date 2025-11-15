import Skeleton from '@/components/ui/skeleton';

export default function LoadingProductDetail() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div>
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="mb-4 h-4 w-24" />
          <Skeleton className="mb-6 h-6 w-32" />
          <Skeleton className="mb-3 h-4 w-20" />
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-12 rounded-md" />
            ))}
          </div>
          <Skeleton className="mt-6 h-10 w-40" />
        </div>
      </div>
    </div>
  );
}