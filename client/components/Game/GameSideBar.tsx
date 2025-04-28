import Image from "next/image";

export default function GameSideBar() {
  return (
    <aside className="bg-card p-4 w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-3">
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
    </aside>
  );
}
