import Image from "next/image";

export default function GameSideBar() {
  const messages = Array.from({ length: 23 }, (_, index) => ({
    userName: `Xyz${index + 1}`,
    msg: "Hi, this is a test message.",
    side: index % 2 === 0 ? "left" : "right", // Alternate sides
    imgUrl: "/boy-profile.png", // Same image for now, you can make different if you want
  }));

  return (
    <aside className="bg-card p-4 w-full md:w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-2">
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

      <hr className="border-gray-700" />

      {/* Viewer Count */}
      <section className="flex items-center justify-between">
        <h5 className="text-md font-medium">Viewers</h5>
        <p className="text-lg font-bold text-green-400">12 👥</p>
      </section>

      {/* Chat Area */}
      <section className="flex flex-col bg-transparent flex-grow gap-2 overflow-hidden">
        {/* Chat Messages */}
        <div className="flex flex-col gap-3 p-3 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map(({ userName, msg, side, imgUrl }, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                side === "right" ? "justify-end" : "justify-start"
              }`}
            >
              {side === "left" && (
                <Image
                  src={imgUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full bg-gray-500 p-0.5"
                />
              )}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  side === "left"
                    ? "bg-gray-700 text-white"
                    : "bg-orange-400 text-black"
                }`}
              >
                <p className="text-xs font-semibold">{userName}</p>
                <p className="text-sm">{msg}</p>
              </div>

              {side === "right" && (
                <Image
                  src={imgUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full bg-gray-500 p-0.5"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-700 flex items-center gap-2">
          <input
            name="msg"
            id="msg"
            placeholder="Say something..."
            className="flex-grow bg-transparent border border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-400"
          />
          <button className="bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-full text-sm font-bold">
            Send
          </button>
        </div>
      </section>

      {/* Leave Room Button */}
      <button className="bg-red-500 hover:bg-red-600 transition text-white font-bold py-2 rounded-lg">
        Leave Room
      </button>
    </aside>
  );
}
