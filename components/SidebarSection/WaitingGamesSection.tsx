"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SkeletonPlayerList } from "../loader/SkeletonPlayerList";

export default function WaitingGamesSection() {
  const waitingGames = useQuery(api.users.getWaitingPlayers);
  return (
    <section>
      <h5 className="text-md font-bold mt-4 mb-2">Games</h5>
      <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
        {waitingGames === undefined ? (
          <SkeletonPlayerList />
        ) : waitingGames.length > 0 ? (
          waitingGames.map((game, index) => (
            <li key={`${game._id}-${index}`} className="flex justify-between">
              <span>{game.name} waiting</span>
              <button className="text-orange-400 hover:underline">Join</button>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 h-[3em]">
            No waiting games available
          </p>
        )}
      </ul>
    </section>
  );
}
