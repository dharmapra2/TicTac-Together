"use client";
import React, { useState } from "react";

function Page() {
  const defaultCellValue = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [turn, setTurn] = useState(true); // true => X's turn
  const [cells, setCells] = useState(defaultCellValue);
  const [winner, setWinner] = useState<string | null>(null);

  // DSA optimization: counters
  const rows = React.useRef<number[]>([0, 0, 0]);
  const cols = React.useRef<number[]>([0, 0, 0]);
  const diagonal = React.useRef<number>(0);
  const antiDiagonal = React.useRef<number>(0);
  const moveCount = React.useRef<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (winner) return;

    const target = e.target as HTMLElement;

    if (target.dataset.index) {
      const index = parseInt(target.dataset.index);
      const row = Math.floor(index / 3);
      const col = index % 3;

      if (cells[row][col] !== "") {
        console.log("Cell already filled!");
        return;
      }

      const updatedCells = cells.map((r) => [...r]);
      const playerValue = turn ? 1 : -1; // X => 1, O => -1

      updatedCells[row][col] = turn ? "X" : "O";
      setCells(updatedCells);
      moveCount.current += 1;

      // Update counters
      rows.current[row] += playerValue;
      cols.current[col] += playerValue;
      if (row === col) diagonal.current += playerValue;
      if (row + col === 2) antiDiagonal.current += playerValue;

      console.log(index, rows, cols, diagonal, antiDiagonal);

      // Check if current move wins
      if (
        Math.abs(rows.current[row]) === 3 ||
        Math.abs(cols.current[col]) === 3 ||
        Math.abs(diagonal.current) === 3 ||
        Math.abs(antiDiagonal.current) === 3
      ) {
        setWinner(turn ? "X" : "O");
        console.log(`${turn ? "X" : "O"} wins!`);
        return;
      }

      // Check draw
      if (moveCount.current + 1 === 9) {
        setWinner("Draw");
        console.log("Game Draw!");
        return;
      }

      // Switch turn
      setTurn((prev) => !prev);
    }
  };

  const handleReset = () => {
    setCells(defaultCellValue);
    setWinner(null);
    setTurn(true);
    moveCount.current = 0;
    rows.current = [0, 0, 0];
    cols.current = [0, 0, 0];
    diagonal.current = 0;
    antiDiagonal.current = 0;
  };

  console.log("Rendered");

  return (
    <section className="flex flex-col items-center justify-evenly h-[70%]">
      <p className="h-9 text-2xl">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `${winner} wins!`
          : turn
          ? "Your turn (X)"
          : "Waiting for opponent (O)"}
      </p>

      <section
        className="h-auto grid grid-cols-3 gap-2 laptop:gap-2 text-5xl text-center font-medium text-secondary text-gray-500"
        onClick={handleClick}
      >
        {cells.flat().map((cell, index) => (
          <button
            key={index}
            disabled={cell || winner ? true : false}
            data-index={index}
            className="size-18 laptop:size-25 flex items-center justify-center border bg-white border-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {cell}
          </button>
        ))}
      </section>

      {winner && (
        <button
          onClick={handleReset}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Restart Game
        </button>
      )}
    </section>
  );
}

export default Page;
