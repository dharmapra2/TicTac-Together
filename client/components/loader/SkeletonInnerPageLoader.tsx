export default function SkeletonInnerPageLoader() {
  return (
    <div className="flex flex-row gap-6 h-full animate-pulse">
      <div className="flex flex-row w-full h-full gap-6">
        <div className="w-1/2 rounded-lg bg-white animate-pulse h-full"></div>
        <div className="w-1/2 h-full relative flex flex-col gap-6">
          <div className="w-full flex flex-row gap-6 h-full">
            <div className="w-1/2 h-full rounded-lg bg-white animate-pulse"></div>
            <div className="w-1/2 h-full rounded-lg bg-white animate-pulse"></div>
          </div>
          <div className="h-[70%] rounded-lg bg-white animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
