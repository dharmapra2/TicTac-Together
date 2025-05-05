import Sidebar from "@/components/SideBar/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await currentUser();
  console.log("rrotme", me);

  const imageUrl: string =
    me?.hasImage && me?.imageUrl ? me.imageUrl : "/boy-profile.png";

  console.log("rerender DashboardLayout");

  return (
    <React.Fragment>
      {/* left section */}
      <section className="bg-card grow w-[75%] h-full rounded-md">
        <section className="text-white h-full w-full p-6 rounded-xl shadow-xl flex flex-col gap-6 relative">
          <h3 className="text-4xl text-center font-bold">
            Welcome, {me?.fullName ?? "Alex"} <span className="">👋</span>
          </h3>
          {/* Player Card */}
          <section className="bg-seconday p-4 rounded-xl flex items-center gap-4 shadow-md">
            <Image
              src={imageUrl}
              alt="Profile image"
              width={80}
              height={80}
              className={`rounded-full object-cover bg-orange-300 ${!me?.hasImage && "p-1"}`}
            />

            <div>
              <h4 className="text-2xl font-semibold">
                {me?.username ?? "Alex"}
              </h4>
              <p className="text-sm text-gray-300">
                Player ID: #<span>{me?.id ?? 98213}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Wins: <span className="text-white font-bold">5</span> | Losses:
                <span className="text-white font-bold">3</span>
              </p>
            </div>
          </section>
          {children}
        </section>
      </section>

      {/* Right section */}
      <Sidebar />
    </React.Fragment>
  );
}
