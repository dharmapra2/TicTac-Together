import Sidebar from "@/components/SideBar/Sidebar";
import { getServerUserData } from "@/utils/actions/user-server";
import Image from "next/image";
import React from "react";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    userId,
    username,
  }: { userId: string | null; username: string | null } =
    await getServerUserData();
  console.log(userId, username);

  console.log("rerender DashboardLayout");

  return (
    <React.Fragment>
      {/* left section */}
      <section className="bg-card grow w-[75%] h-full rounded-md">
        <section className="text-white h-full w-full p-6 rounded-xl shadow-xl flex flex-col gap-6 relative">
          <h3 className="text-4xl text-center font-bold">
            Welcome, {username ?? "Alex"} <span className="">👋</span>
          </h3>
          {/* Player Card */}
          <section className="bg-seconday p-4 rounded-xl flex items-center gap-4 shadow-md">
            <Image
              src="/boy-profile.png"
              alt="Profile image"
              width={80}
              height={80}
              className="rounded-full bg-orange-300 p-1"
            />
            <div>
              <h4 className="text-2xl font-semibold">{username ?? "Alex"}</h4>
              <p className="text-sm text-gray-300">
                Player ID: #<span>{userId ?? 98213}</span>
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
