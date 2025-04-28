import Image from "next/image";
import React from "react";
import GameSideBar from "@/components/Game/GameSideBar";
import PlayerCard from "@/components/Player/PlayerCard";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
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
          <PlayerCard />

          {/* Main children content */}
          {children}
        </section>
      </section>

      {/* Right section */}
      <GameSideBar />
    </React.Fragment>
  );
}
