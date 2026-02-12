import { Skeleton } from "../../components/ui/skeleton";


export function DropCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      {/* Title */}
      <div className="mb-4 flex justify-center">
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Price/Number */}
      <div className="mb-6 flex justify-center">
        <Skeleton className="h-12 w-16" />
      </div>

      {/* Stock Info */}
      <div className="mb-2 flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-12" />
      </div>

      {/* Progress Bar */}
      <Skeleton className="mb-4 h-2 w-full rounded-full" />

      {/* Button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
    </div>
  );
}


export const DropsSkeleton = ({ count } : { count: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_value, index) => index).map(item => <DropCardSkeleton key={item} />)}
    </div>
  )
}