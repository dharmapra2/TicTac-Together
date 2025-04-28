"use client";
import React, { useState } from "react";

function Page() {
  const defaultCellValue = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [turn, setTurn] = useState(true);
  const [cells, setCells] = useState(defaultCellValue);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.dataset.index) {
      const index = parseInt(target.dataset.index);

      // Calculate row and column from flattened index
      const row = Math.floor(index / 3);
      const col = index % 3;

      // If cell already filled, do nothing
      if (cells[row][col] !== "") {
        console.log("Cell already filled!");
        return;
      }

      console.log("Clicked empty cell:", index);

      // Example: fill with "X" (you can change based on player turn)
      const updatedCells = [...cells];
      updatedCells[row] = [...updatedCells[row]]; // copy the row too
      updatedCells[row][col] = turn ? "X" : "O";

      setCells(updatedCells);
      setTurn((prev) => !prev);
    }
  };
  console.log("Rendered");

  return (
    <section className="flex flex-col items-center justify-evenly h-[70%]">
      <p className="h-9 text-2xl">
        {turn ? "Your turn" : "Waiting for opponent move..."}
      </p>
      <section
        className="h-auto grid grid-cols-3 gap-2 laptop:gap-2 text-5xl text-center font-medium text-secondary text-gray-500"
        onClick={handleClick}
      >
        {cells.flat().map((cell, index) => (
          <button
            key={index}
            disabled={cell ? true : false}
            data-index={index}
            className="size-18 laptop:size-25 content-center-safe border bg-white border-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {cell}
          </button>
        ))}
      </section>
    </section>
  );
}

export default Page;
