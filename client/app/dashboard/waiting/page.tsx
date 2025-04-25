"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WaitingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  useEffect(() => {
    if (!gameId) {
      // Redirect if no game ID is found
      router.replace("/dashboard");
    }

    // Simulate waiting - replace with WebSocket or polling logic
    // const timer = setTimeout(() => {
    //   router.push(`/game/${gameId}`);
    // }, 5000); // e.g., pretend opponent joins in 5s

    // return () => clearTimeout(timer);
  }, [gameId]);

  return (
    <section className="p-8 text-white text-center space-y-4">
      <h2 className="text-3xl font-bold">Waiting for opponent to join...</h2>
      <p className="text-orange-300">Game ID: {gameId}</p>
      <p className="text-gray-400">Share the game ID or wait for auto-match</p>
    </section>
  );
}
