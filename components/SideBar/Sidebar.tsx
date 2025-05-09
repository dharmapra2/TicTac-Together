import dynamic from "next/dynamic";
import SkeletonPlayerInfoLoader from "@/components/loader/SkeletonPlayerInfoLoader";
import { SkeletonPlayerList } from "@/components/loader/SkeletonPlayerList";

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

const AvailablePlayersSection = dynamic(
  () => import("@/components/SidebarSection/AvailablePlayersSection"),
  {
    loading: () => <SkeletonPlayerList />,
  }
);
const InGamePlayersSection = dynamic(
  () => import("@/components/SidebarSection/InGamePlayersSection"),
  {
    loading: () => <SkeletonPlayerList />,
  }
);
const WaitingGamesSection = dynamic(
  () => import("@/components/SidebarSection/WaitingGamesSection"),
  {
    loading: () => <SkeletonPlayerList />,
  }
);

export default async function Sidebar() {
  return (
    <aside className="bg-card p-4 w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-6">
      {/* Player Info */}
      <PlayerInfo />
      {/* Game Action */}
      <GameActions />

      {/* Online Players */}
      <section className="flex flex-col gap-4 grow">
        {/* Available Players */}
        <AvailablePlayersSection />

        {/* In-Game Players */}
        <InGamePlayersSection />

        {/* Games Section */}
        <WaitingGamesSection />
      </section>

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
