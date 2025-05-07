import dynamic from "next/dynamic";
import SkeletonPlayerInfoLoader from "../loader/SkeletonPlayerInfoLoader";

const GameActions = dynamic(
  () => import("@/components/SideBar/SideBarActions"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const PlayerInfo = dynamic(() => import("@/components/Player/PlayerInfo"), {
  loading: () => <SkeletonPlayerInfoLoader />,
  ssr: true,
});

export default async function Sidebar() {
  const availablePlayers = ["Sam", "Tina", "John"];
  const inGamePlayers = ["Michael", "Ava"];
  const waitingGames = [
    { id: "#Game789", host: "Suraj" },
    { id: "#Game101", host: "Susill" },
  ];
  const inProgressGames = ["#Game123", "#Game456"];

  return (
    <aside className="bg-card p-4 w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-6">
      {/* Player Info */}
      <PlayerInfo />
      {/* Game Action */}
      <GameActions />

      {/* Online Players */}
      <div className="flex flex-col gap-4 grow">
        {/* Available Players */}
        <section>
          <h5 className="text-md font-bold mb-2">Available Players</h5>
          <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
            {availablePlayers.map((player) => (
              <li key={player} className="flex justify-between">
                {player}
                <button className="text-orange-400 hover:underline">
                  Invite
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* In-Game Players */}
        <section>
          <h5 className="text-md font-bold mt-4 mb-2">In-Game Players</h5>
          <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
            {inGamePlayers.map((player) => (
              <li key={player} className="flex justify-between">
                {player}
                <span className="text-green-400 text-xs italic">
                  Playing...
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Games Section */}
        <section>
          <h5 className="text-md font-bold mt-4 mb-2">Games</h5>
          <ul className="text-sm space-y-1 text-gray-300 max-h-[8em] overflow-y-auto pr-2">
            {waitingGames.map((game) => (
              <li key={game.id} className="flex justify-between">
                <span>{game.host} waiting</span>
                <button className="text-orange-400 hover:underline">
                  Join
                </button>
              </li>
            ))}
            {inProgressGames.map((gameId) => (
              <li key={gameId} className="flex justify-between">
                {gameId}
                <button className="text-orange-400 hover:underline">
                  Join to view
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Player Stats */}
      <div className="pt-4 border-t border-gray-700 text-sm text-gray-300">
        <p>
          Wins: <span className="text-white font-semibold">5</span>
        </p>
        <p>
          Losses: <span className="text-white font-semibold">3</span>
        </p>
      </div>
    </aside>
  );
}
