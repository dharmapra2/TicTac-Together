"use client";

import { Suspense, useState } from "react";
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
    <Suspense fallback={<div>Loading...</div>}>
      {/* 🔔 Notification Icon for Invite Modal */}
      <button
        className="block laptop:hidden absolute top-6 right-6 p-2 bg-card rounded-full hover:bg-gray-700 transition"
        onClick={() => setShowModal(true)}
      >
        <Bell className="w-6 h-6 text-orange-400" />
      </button>

      {/* 🔔 Invites Section - only visible on small/medium screens */}
      <section className="bg-seconday p-4 rounded-xl shadow-md hidden laptop:flex flex-col gap-2">
        <h5 className="text-xl font-semibold mb-2">Invites</h5>
        {invites.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-300 max-h-[13em] overflow-y-auto pr-1">
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
      <section className="bg-seconday p-4 rounded-xl shadow-md flex flex-col gap-1">
        <h5 className="text-xl font-semibold mb-2">Recent Activity</h5>
        <ul className="text-sm text-gray-300 list-disc max-h-[13em] pl-5 overflow-y-auto pr-1">
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
                      {invite.from} invited you to
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
    </Suspense>
  );
}
