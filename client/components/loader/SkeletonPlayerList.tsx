export function SkeletonPlayerList() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-700 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
