import Image from "next/image";

export default function GameSideBar() {
  return (
    <aside className="bg-card p-4 w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-5">
      {/* Player Info */}
      <section className="flex items-center gap-4">
        <Image
          src="/boy-profile.png"
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full bg-orange-300 p-1"
        />
        <article>
          <h4 className="text-xl font-semibold">Alex</h4>
          <p className="text-sm text-gray-300">Player ID: #98213</p>
        </article>
      </section>

      <hr className="bg-gray-700" />

      {/* Viewer Count */}
      <section className="flex items-center justify-between">
        <h5 className="text-md font-medium">Viewers</h5>
        <p className="text-lg font-bold text-green-400">12 👥</p>
      </section>

      {/* Chat Area */}
      <section className="flex flex-col flex-grow bg-muted rounded-md p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        {/* Example messages */}
        <div className="text-sm mb-2">
          <span className="text-orange-400">Sam:</span> Wow what a move!
        </div>
        <div className="text-sm mb-2">
          <span className="text-purple-400">Lisa:</span> Let&apos;s gooo 🔥
        </div>
        {/* Scrollable chat area */}
      </section>

      {/* Leave Room Button */}
      <button className="mt-4 bg-red-500 hover:bg-red-600 transition text-white font-bold py-2 rounded-lg">
        Leave Room
      </button>
    </aside>
  );
}
