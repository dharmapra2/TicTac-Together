import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`h-[90%] w-[90%] text-white rounded-xl flex flex-row justify-between items-center gap-6`}
    >
      {/* left section */}
      <section className="bg-card grow w-[75%] h-full rounded-md">
        {children}
      </section>

      {/* Right section */}
      <Sidebar />
    </main>
  );
}
