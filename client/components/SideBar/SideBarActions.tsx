"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useRef } from "react";

function GameActions() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");

  function handleCreateGame() {
    console.log("handleCreateGame");
    const gameId = crypto.randomUUID(); // or use generateShortId()
    router.push(`/dashboard/waiting?gameId=${gameId}`);
  }

  function handleJoinGameById() {
    const inputVal = inputRef.current;
    if (inputVal) {
      const enteredId = inputVal?.value?.trim();
      router.push(`/dashboard/waiting?gameId=${enteredId}`);
    } else {
      alert("Please enter a valid Game ID.");
    }
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
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Game ID"
            className="border p-2 rounded-lg text-sm"
          />
          <button
            className="bg-gray-500 hover:bg-gray-600 transition-colors text-white py-2 rounded-lg text-sm font-medium"
            onClick={handleJoinGameById}
          >
            Join Game by ID
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
