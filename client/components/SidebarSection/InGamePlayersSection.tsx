"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SkeletonPlayerList } from "../loader/SkeletonPlayerList";

export default function InGamePlayersSection() {
  const inGamePlayers = useQuery(api.users.getInGamePlayers);

  return (
    <section>
      <h5 className="text-md font-bold mt-4 mb-2">In-Game Players</h5>
      <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
        {inGamePlayers === undefined ? (
          <SkeletonPlayerList />
        ) : inGamePlayers?.length > 0 ? (
          inGamePlayers.map((player) => (
            <li key={player._id} className="flex justify-between">
              {player.name}
              <span className="text-green-400 text-xs italic">Playing...</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 h-[3em]">
            No players currently in game
          </p>
        )}
      </ul>
    </section>
  );
}
