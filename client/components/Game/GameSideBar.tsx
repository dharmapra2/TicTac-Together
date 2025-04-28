"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GameSideBar() {
  const router = useRouter();
  const [messages, setMessages] = useState(
    Array.from({ length: 23 }, (_, index) => ({
      userName: `Xyz${index + 1}`,
      msg: "Hi, this is a test message.",
      side: index % 2 === 0 ? "left" : "right",
      imgUrl: "/boy-profile.png",
    }))
  );
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        userName: "You",
        msg: newMessage,
        side: "right",
        imgUrl: "/boy-profile.png",
      },
    ]);
    setNewMessage("");
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  function handleLeaveRoom() {
    router.push(`/dashboard`);
  }

  return (
    <aside className="bg-card p-4 w-full md:w-[25%] h-full rounded-md flex flex-col text-white shadow-lg gap-2">
      {/* Player Info */}
      <section className="flex items-center gap-4">
        <Image
          src="/boy-profile.png"
          alt="Profile"
          width={64}
          loading="lazy"
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
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-3 p-3 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-700"
        >
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
                  loading="lazy"
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
                  loading="lazy"
                  height={32}
                  className="rounded-full bg-gray-500 p-0.5"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-700 flex items-center gap-2">
          <textarea
            name="msg"
            id="msg"
            placeholder="Type your message..."
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border border-gray-600 rounded-2xl px-4 py-2 text-sm resize-none focus:outline-none focus:border-orange-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            Send
          </button>
        </div>
      </section>

      {/* Leave Room Button */}
      <button
        className="bg-red-500 hover:bg-red-600 transition text-white font-bold py-2 rounded-lg cursor-pointer"
        onClick={handleLeaveRoom}
      >
        Leave Room
      </button>
    </aside>
  );
}
