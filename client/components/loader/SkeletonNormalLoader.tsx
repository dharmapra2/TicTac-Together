export default function SkeletonNormalLoader({
  count = 1,
  lineWidths = [35, 50, 75, 100],
  bgColor = "bg-gray-500",
  lineHeight = "h-5",
}) {
  return (
    <aside className="flex flex-col gap-4 w-full h-full">
      {[...Array(count)].map((_, blockIndex) => (
        <section key={blockIndex} className="flex flex-col gap-2 w-full">
          {lineWidths.map((width, lineIndex) => (
            <div
              key={lineIndex}
              className={`animate-pulse rounded-md ${bgColor} ${lineHeight}`}
              style={{ width: `${width}%` }}
            ></div>
          ))}
        </section>
      ))}
    </aside>
  );
}
