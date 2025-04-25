"use client";

import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function Page() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    // "use server";
    const username = formData.get("username");
    console.log(username);

    startTransition(() => {
      // Redirect after processing
      redirect("/dashboard");
    });
  }

  return (
    <section className="bg-card h-[90%] w-[90%] text-white rounded-xl p-8 flex justify-center items-center flex-col gap-6 shadow-2xl">
      <h2 className="text-4xl font-extrabold tracking-tight mb-2">
        Welcome to Tic-Tac-Toe
      </h2>
      <form
        action={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md"
      >
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your name"
          className="h-14 p-4 border border-secondary rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:ring-2 focus:ring-secondary outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl bg-secondary hover:bg-secondary/80 transition-all font-medium cursor-pointer"
        >
          {isPending ? "Loading..." : "Get Started"}
        </button>
      </form>
    </section>
  );
}
