import React from "react";

function Page() {
  const cells = [
    ["X", "", ""],
    ["", "X", "O"],
    ["", "", "O"],
  ];

  return (
    <section className="flex flex-col items-center justify-evenly h-[70%]">
      <p className="h-9 text-2xl">Waiting for opponent move...</p>
      <section className="h-auto grid grid-cols-3 gap-2 text-5xl text-center font-medium text-secondary text-gray-500">
        {cells.flat().map((cell, index) => (
          <div
            key={index}
            className="size-25 content-center-safe border bg-white border-gray-400"
          >
            {cell}
          </div>
        ))}
      </section>
    </section>
  );
}

export default Page;
