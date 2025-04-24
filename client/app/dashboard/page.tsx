"use client";

import Image from "next/image";
import { useState } from "react";
import { Bell } from "lucide-react"; // or use Heroicons/FontAwesome

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const recentActivities = [
    "You joined Game #54321",
    "Sam invited you to a game",
    "You won against Tina 🎉",
  ];

  const invites = [
    { from: "Ravi", gameId: "#TTT987" },
    { from: "Nina", gameId: "#TTT654" },
    { from: "Nina5", gameId: "#TTT6544" },
  ];

  return (
    <section className="text-white h-full w-full p-6 rounded-xl shadow-xl flex flex-col gap-6 relative">
      {/* 🔔 Notification Icon for Invite Modal */}
      <button
        className="absolute top-6 right-6 hidden md:block p-2 bg-card rounded-full hover:bg-gray-700 transition"
        onClick={() => setShowModal(true)}
      >
        <Bell className="w-6 h-6 text-orange-400" />
      </button>

      <h3 className="text-4xl text-center font-bold">Welcome, Alex 👋</h3>

      {/* Player Card */}
      <section className="bg-seconday p-4 rounded-xl flex items-center gap-4 shadow-md">
        <Image
          src="/boy-profile.png"
          alt="Profile image"
          width={80}
          height={80}
          className="rounded-full bg-orange-300 p-1"
        />
        <div>
          <h4 className="text-2xl font-semibold">Alex</h4>
          <p className="text-sm text-gray-300">Player ID: #98213</p>
          <p className="text-sm text-gray-400 mt-1">
            Wins: <span className="text-white font-bold">5</span> | Losses:{" "}
            <span className="text-white font-bold">3</span>
          </p>
        </div>
      </section>

      {/* Game Actions */}
      <section className="bg-seconday p-4 rounded-xl shadow-md flex flex-col gap-4">
        <h5 className="text-xl font-semibold">Game Actions</h5>
        <button className="bg-orange-400 hover:bg-orange-500 transition-colors text-white py-2 rounded-lg text-sm font-medium">
          Create Game
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-2 rounded-lg text-sm font-medium">
          Join Random Game
        </button>
      </section>

      {/* 🔔 Invites Section - only visible on small/medium screens */}
      <section className="bg-seconday p-4 rounded-xl shadow-md flex lg:hidden flex-col gap-2">
        <h5 className="text-xl font-semibold mb-2">Invites</h5>
        {invites.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-300 h-[6em] overflow-y-auto">
            {invites.map((invite, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {invite.from} invited you to <strong>{invite.gameId}</strong>
                </span>
                <button className="text-orange-400 hover:underline text-xs">
                  Join
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No new invites</p>
        )}
      </section>

      {/* Recent Activity Feed */}
      <section className="bg-seconday p-4 rounded-xl shadow-md flex flex-col gap-2">
        <h5 className="text-xl font-semibold mb-2">Recent Activity</h5>
        <ul className="text-sm text-gray-300 list-disc pl-5">
          {recentActivities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </section>

      {/* Tip / Quote */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-xl shadow-md text-sm italic">
        💡 Tip: Playing more games helps you climb the leaderboard faster!
      </div>

      {/* Modal for Invites (Large Screens Only) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-card w-[90%] max-w-md p-6 rounded-xl shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-white text-lg"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h5 className="text-xl font-semibold mb-4">Game Invites</h5>
            {invites.length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-300 max-h-[200px] overflow-y-auto">
                {invites.map((invite, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {invite.from} invited you to{" "}
                      <strong>{invite.gameId}</strong>
                    </span>
                    <button className="text-orange-400 hover:underline text-xs">
                      Join
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No new invites</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
