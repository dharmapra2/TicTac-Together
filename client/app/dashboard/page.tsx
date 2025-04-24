import Image from "next/image";

export default async function DashboardPage() {
  return (
    <section className="text-white h-full w-full p-6 rounded-xl  shadow-xl flex flex-col gap-6">
      <h3 className="text-4xl text-center">Create or Join Game</h3>

      <section className="bg-seconday p-4 rounded-xl flex justify-between flex-col h-full">
        <div className="flex items-center gap-3 h-1/2">
          <Image
            src="/boy-profile.png"
            alt="Profile image"
            width={100}
            height={100}
            className="rounded-full bg-orange-300 m-1 p-1"
          />
          <span className="text-2xl font-medium">Alex</span>
        </div>
        <div className=" flex  justify-between text-md text-gray-300 text-right">
          <p className="">Online players</p>
          <p className="text-white font-semibold text-sm">34</p>
        </div>
      </section>

      <button className="bg-orange-400 hover:bg-orange-500 transition-colors text-white py-2 rounded-lg text-sm font-medium">
        Create Game
      </button>
    </section>
  );
}
