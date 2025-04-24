import Image from "next/image";

export default function Sidebar() {
  const availablePlayers = ["Sam", "Tina", "John"];
  const inGamePlayers = ["Michael", "Ava"];
  const waitingGames = [
    { id: "#Game789", host: "Suraj" },
    { id: "#Game101", host: "Susill" },
  ];
  const inProgressGames = ["#Game123", "#Game456"];

  return (
    <aside className="bg-card p-4 w-[25%] h-full rounded-md flex flex-col text-white shadow-lg">
      {/* Player Info */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/boy-profile.png"
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full bg-orange-300 p-1"
        />
        <div>
          <h4 className="text-xl font-semibold">Alex</h4>
          <p className="text-sm text-gray-300">Player ID: #98213</p>
        </div>
      </div>

      {/* Online Players */}
      <div className="flex flex-col gap-4 grow overflow-auto pr-2">
        {/* Available Players */}
        <section>
          <h5 className="text-md font-bold mb-2">Available Players</h5>
          <ul className="text-sm space-y-1 text-gray-300">
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
          <ul className="text-sm space-y-1 text-gray-300">
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
          <ul className="text-sm space-y-1 text-gray-300">
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
      <div className="pt-4 border-t border-gray-700 text-sm text-gray-300 mt-4">
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
