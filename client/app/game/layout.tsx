import Image from "next/image";
import React from "react";
import GameSideBar from "@/components/Game/GameSideBar";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[90%] w-[90%] text-white rounded-xl flex flex-row justify-between items-center gap-6">
      {/* Left Section */}
      <section className="bg-card grow w-[75%] h-full rounded-md">
        <section className="text-white h-full w-full p-6 rounded-xl shadow-xl flex flex-col gap-6 relative">
          {/* Header Section */}
          <header className="flex flex-col items-center mystery-quest-regular font-extralight">
            {/* Wrapper to align text and image */}
            {/* Tic:TacToe title */}
            <h1 className="text-5xl flex justify-center items-center text-white whitespace-nowrap">
              Tic
              <span className="text-orange-400 relative">
                <span className="text-green-300">·</span>
                <span>:</span>
              </span>
              <span className="text-white">TacToe</span>
            </h1>
            <div className="inline-block ml-6">
              {/* Multiplayer image - should match the width of text */}
              <Image
                src="/multi-player.png"
                alt="Multiplayer background"
                loading="eager"
                width={230}
                height={230}
                className="w-11/12 h-auto bg-blend-color-dodge"
              />
            </div>
          </header>

          {/* Player Card */}
          <section className="flex items-center-safe justify-around gap-4 text-lg font-bold">
            <section className="flex flex-col items-center-safe justify-center-safe">
              <Image
                src="/boy-profile.png"
                alt="Profile image"
                width={100}
                loading="lazy"
                height={100}
                className="rounded-full bg-seconday p-1"
              />
              <p>Nikhil</p>
              <p>X</p>
            </section>
            <p className="-mt-9">Wrisus</p>
            <section className="flex flex-col items-center-safe justify-center-safe">
              <Image
                src="/boy-profile.png"
                alt="Profile image"
                width={100}
                loading="lazy"
                height={100}
                className="rounded-full bg-seconday p-1"
              />
              <p>Suraj</p>
              <p>X</p>
            </section>
          </section>

          {/* Main children content */}
          {children}
        </section>
      </section>

      {/* Right section */}
      <GameSideBar />
    </main>
  );
}
