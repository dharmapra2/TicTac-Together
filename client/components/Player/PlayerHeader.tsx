// components/PlayerHeader.tsx
"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

function PlayerHeader() {
  const me = useQuery(api.users.getMe);

  if (!me) {
    return (
      <div>
        <h4 className="text-2xl font-semibold animate-pulse">Loading...</h4>
        <p className="text-sm text-gray-300 animate-pulse">Player ID: #---</p>
        <p className="text-sm text-gray-400 mt-1 animate-pulse">
          Wins: <span className="text-white font-bold">-</span> | Losses:
          <span className="text-white font-bold">-</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-2xl font-semibold">{me.name}</h4>
      <p className="text-sm text-gray-300">
        Player ID: #<span>{me._id}</span>
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Wins: <span className="text-white font-bold">5</span> | Losses:
        <span className="text-white font-bold">3</span>
      </p>
    </div>
  );
}

export default PlayerHeader;
