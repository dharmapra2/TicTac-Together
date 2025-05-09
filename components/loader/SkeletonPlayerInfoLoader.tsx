import React from "react";

export default function SkeletonPlayerInfoLoader() {
  return (
    <aside className="flex items-center gap-4">
      <div className="w-19 h-16 rounded-full bg-gray-700 animate-pulse p-1"></div>
      <section className="space-y-2 w-full">
        <div className="w-36 h-5 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-full h-5 bg-gray-600 rounded animate-pulse"></div>
      </section>
    </aside>
  );
}
