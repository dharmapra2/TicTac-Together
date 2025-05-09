"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SkeletonPlayerList } from "../loader/SkeletonPlayerList";

export default function AvailablePlayersSection() {
  const availablePlayers = useQuery(api.users.getAvilablePlayers);

  return (
    <section>
      <h5 className="text-md font-bold mb-2">Available Players</h5>
      <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
        {availablePlayers === undefined ? (
          <SkeletonPlayerList />
        ) : availablePlayers?.length > 0 ? (
          availablePlayers.map((player) => (
            <li key={player._id} className="flex justify-between">
              {player.name}
              <button className="text-orange-400 hover:underline">
                Invite
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 h-[3em]">
            No players currently available
          </p>
        )}
      </ul>
    </section>
  );
}
