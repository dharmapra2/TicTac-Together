// components/PlayerHeader.tsx
"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import SkeletonNormalLoader from "../loader/SkeletonNormalLoader";

function PlayerHeader() {
  const me = useQuery(api.users.getMe);

  if (!me) {
    return <SkeletonNormalLoader lineWidths={[35, 50, 75]} />;
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
