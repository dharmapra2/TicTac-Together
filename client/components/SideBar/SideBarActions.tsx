"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function GameActions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  function handleCreateGame() {
    const gameId = crypto.randomUUID(); // or use generateShortId()
    router.push(`/dashboard/waiting?gameId=${gameId}`);
  }

  function handleCancelGame() {
    router.push(`/dashboard`);
  }
  return (
    <section className="bg-seconday p-4 rounded-xl shadow-md flex flex-col gap-4">
      <h5 className="text-xl font-semibold">Game Actions</h5>
      {gameId ? (
        <button
          className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-2 rounded-lg text-sm font-medium"
          onClick={handleCancelGame}
        >
          Cancel Game
        </button>
      ) : (
        <>
          <button
            className="bg-orange-400 hover:bg-orange-500 transition-colors text-white py-2 rounded-lg text-sm font-medium"
            onClick={handleCreateGame}
          >
            Create Game
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-2 rounded-lg text-sm font-medium">
            Join Random Game
          </button>
        </>
      )}
    </section>
  );
}

export default GameActions;
