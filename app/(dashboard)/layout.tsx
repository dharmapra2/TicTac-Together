import PlayerHeader from "@/components/Player/PlayerHeader";
import Sidebar from "@/components/SideBar/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await currentUser();
  // const imageUrl: string = me?.hasImage && me?.imageUrl ? me.imageUrl : "/boy-profile.png";

  return (
    <React.Fragment>
      {/* left section */}
      <section className="bg-card grow w-[75%] h-full rounded-md">
        <section className="text-white h-full w-full p-6 rounded-xl shadow-xl flex flex-col gap-6 relative">
          <h3 className="text-4xl text-center font-bold">
            Welcome, {me?.fullName ?? "To Game"} <span className="">👋</span>
          </h3>
          {/* Player Card */}
          <section className="bg-seconday p-4 rounded-xl flex items-center gap-4 shadow-md">
            <Image
              src={"/boy-profile.png"}
              alt="Profile image"
              width={70}
              height={70}
              className={`rounded-full object-cover bg-orange-300 p-1`}
            />
            <PlayerHeader />
          </section>
          {children}
        </section>
      </section>

      {/* Right section */}
      <Sidebar />
    </React.Fragment>
  );
}
