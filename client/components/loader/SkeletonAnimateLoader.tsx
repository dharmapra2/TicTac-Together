export default function SkeletonAnimateLoader() {
  return (
    <div className="flex space-x-1 py-2 justify-center">
      {Array.from({ length: 5 }).map((_num, index) => (
        <div className="animate-loader" key={index}></div>
      ))}
    </div>
  );
}
