"use client";

import { redirect } from "next/navigation";
import { useEffect, useTransition } from "react";
import Image from "next/image";
import { useUser } from "@/utils/context/user";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Page() {
  const [isPending, startTransition] = useTransition();

  const { setUser } = useUser();

  // Generate or retrieve user ID
  useEffect(() => {
    const storedUserId = localStorage.getItem("tictactoe_userId");
    if (!storedUserId) {
      const newUserId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("tictactoe_userId", newUserId);
    }
  }, []);

  async function handleSubmit(formData: FormData) {
    const username = formData.get("username") as string;

    setUser(username); // This will handle all socket communication

    startTransition(() => {
      redirect("/dashboard");
    });
  }

  return (
    <section className="h-full w-full flex flex-col justify-center items-center bg-card p-6">
      {/* Game Header */}
      <header className="flex flex-col items-center mb-10 mystery-quest-regular font-extralight">
        <h1 className="text-5xl md:text-6xl flex justify-center items-center text-white whitespace-nowrap">
          Tic
          <span className="text-orange-400 relative mx-1">
            <span className="text-green-300">·</span>
            <span>:</span>
          </span>
          <span className="text-white">TacToe</span>
        </h1>
        <div className="inline-block">
          <Image
            src="/multi-player.png"
            alt="Multiplayer background"
            width={230}
            height={230}
            priority={true}
            className="w-11/12 md:w-full h-auto bg-blend-color-dodge"
          />
        </div>
      </header>

      {/* Login Form */}
      <form
        action={handleSubmit}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6 w-full max-w-md shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-center text-white">
          Welcome, Player!
        </h2>

        <input
          type="text"
          name="username"
          id="username"
          autoFocus
          placeholder="Enter your name..."
          className="h-14 p-4 border border-secondary rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none text-lg"
        />

        <button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl bg-orange-400 hover:bg-orange-500 transition-all font-bold text-white text-lg"
        >
          {isPending ? "Loading..." : "Get Started"}
        </button>
      </form>

      {/* Small Footer or Extra Text */}
      <p className="text-gray-400 text-sm mt-6">
        Ready to challenge your friends?
      </p>
      <Authenticated>
        <UserButton showName />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </section>
  );
}
