"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WaitingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    if (!gameId) {
      setTimeout(() => {
        router.replace("/dashboard");
      }, 0);
      return;
    }

    const onlineInterval = setInterval(() => {
      setOnlinePlayers((prev) => prev + Math.floor(Math.random() * 3));
    }, 1000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(onlineInterval);
      clearInterval(countdownInterval);
    };
  }, [gameId, router]);

  // To resolve the render issue we created new useEffect for countdown reaching zero
  useEffect(() => {
    if (countdown === 1 && gameId) {
      router.push(`/game/${gameId}`);
    }
  }, [countdown, gameId, router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameId || "");
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <section className="p-8 text-white text-center space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold animate-pulse">
        Waiting for opponent to join...
      </h2>

      <div className="text-sm text-gray-300 space-y-1">
        <p>
          👥 <span className="font-semibold">{onlinePlayers}</span> online
        </p>
        <p>
          ⚡ Auto-match in
          <span className="text-orange-400 font-medium"> {countdown}s</span>
        </p>
        <p className="text-orange-300 mt-2">Game ID: {gameId}</p>
        <p className="text-gray-400">
          Share the game ID or wait for auto-match
        </p>
      </div>
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-seconday hover:outline-1 px-4 py-2 rounded-xl transition"
        >
          📎 Invite Friend
        </button>
        <button className="bg-seconday hover:outline-1 px-4 py-2 rounded-xl transition">
          🎥 Watch Live Game
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-seconday p-2 rounded-2xl w-52 hover:scale-105 transition-transform cursor-pointer shadow-lg">
          <div className="grid grid-cols-3 text-5xl font-medium text-seconday">
            {[" ", " ", " ", " ", "X", "O", " ", " ", " "].map(
              (value, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-16 h-16 border-2 bg-card border-seconday rounded-md`}
                >
                  {value}
                </div>
              )
            )}
          </div>

          <p className="text-sm text-gray-200">Find the best move for X</p>
        </div>
      </div>

      {copySuccess && (
        <p className="text-green-400 text-sm animate-bounce">{copySuccess}</p>
      )}
    </section>
  );
}
