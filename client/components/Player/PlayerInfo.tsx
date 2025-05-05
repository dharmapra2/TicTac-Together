"use client";
import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import Image from "next/image";
import React, { useRef } from "react";

function PlayerInfo() {
  const { isAuthenticated } = useConvexAuth();
  const me = useQuery(api.users.getMe, isAuthenticated ? undefined : "skip");

  const imageUrl: string =
    me?.has_image && me?.image ? me.image : "/boy-profile.png";

  // Ref to trigger the UserButton click
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // Simulate a click on the invisible UserButton trigger
    buttonRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative w-16 h-16 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src={imageUrl}
          alt="Profile"
          fill
          className={`rounded-full object-cover bg-orange-300 ${!me?.has_image && "p-1"}`}
        />
        <div className="absolute inset-0 opacity-0" ref={buttonRef}>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-full h-full",
              },
            }}
          />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold">{me?.name ?? "Alex"}</h4>
        <p className="text-sm text-gray-300">Player ID: #{me?._id ?? 98213}</p>
      </div>
    </div>
  );
}

export default PlayerInfo;
