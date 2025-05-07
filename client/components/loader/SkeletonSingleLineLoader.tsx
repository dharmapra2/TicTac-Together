export default function SkeletonSingleLineLoader({
  bgColor = "bg-grey-15",
  height = 4,
}) {
  return (
    <div
      className={`w-full h-${height} ${bgColor} animate-pulse rounded-sm`}
    ></div>
  );
}
