"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PlayerCard() {
  return (
    <section className="flex items-center justify-around gap-4 text-lg font-bold">
      {/* Player 1 */}
      <section className="relative flex flex-col items-center">
        {/* Voice Ripple */}
        <motion.span
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeOut",
          }}
          className="absolute rounded-full border-2 border-green-400 size-24"
        />
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

      {/* VS */}
      <p className="-mt-9 text-2xl">VS</p>

      {/* Player 2 */}
      <section className="relative flex flex-col items-center">
        {/* Voice Ripple */}
        <motion.span
          hidden={true}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeOut",
          }}
          className="absolute rounded-full border-2 border-green-400 size-24"
        />
        <Image
          src="/boy-profile.png"
          alt="Profile image"
          width={100}
          loading="lazy"
          height={100}
          className="rounded-full bg-seconday p-1"
        />
        <p>Suraj</p>
        <p>O</p>
      </section>
    </section>
  );
}
