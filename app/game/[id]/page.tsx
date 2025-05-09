"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef } from "react";

function Page() {
  // Change this for 3x3, 5x5, 10x10 board
  const N = 3;

  const defaultCellValue = Array.from({ length: N }, () => Array(N).fill(""));

  const [turn, setTurn] = useState(true); // true => X's turn
  const [cells, setCells] = useState(defaultCellValue);
  const [winner, setWinner] = useState<string | null>(null);

  const moveCount = useRef<number>(0);
  const rows = useRef<number[]>(Array(N).fill(0));
  const cols = useRef<number[]>(Array(N).fill(0));
  const diagonal = useRef<number>(0);
  const antiDiagonal = useRef<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (winner) return;

    const target = e.target as HTMLElement;

    if (target.dataset.index) {
      const index = parseInt(target.dataset.index);

      const row = Math.floor(index / N);
      const col = index % N;

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
      if (row + col === N - 1) antiDiagonal.current += playerValue;

      if (
        Math.abs(rows.current[row]) === N ||
        Math.abs(cols.current[col]) === N ||
        Math.abs(diagonal.current) === N ||
        Math.abs(antiDiagonal.current) === N
      ) {
        setWinner(turn ? "X" : "O");
        console.log(`${turn ? "X" : "O"} wins!`);
        return;
      }

      if (moveCount.current === N * N) {
        setWinner("Draw");
        console.log("Game Draw!");
        return;
      }

      setTurn((prev) => !prev);
    }
  };

  const handleReset = () => {
    setCells(Array.from({ length: N }, () => Array(N).fill("")));
    setWinner(null);
    setTurn(true);
    moveCount.current = 0;
    rows.current = Array(N).fill(0);
    cols.current = Array(N).fill(0);
    diagonal.current = 0;
    antiDiagonal.current = 0;
  };

  console.log("Rendered");

  return (
    <section className="flex flex-col items-center justify-evenly h-[90vh]">
      <p className="h-9 text-2xl mb-4">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `${winner} wins!`
          : turn
          ? "Your turn (X)"
          : "Waiting for opponent (O)"}
      </p>

      <section
        className={`grid grid-cols-${N} gap-2 text-5xl text-center font-medium text-secondary text-gray-500`}
        style={{ gridTemplateColumns: `repeat(${N}, minmax(50px, 1fr))` }}
        onClick={handleClick}
      >
        {cells.flat().map((cell, index) => (
          <button
            key={index}
            disabled={cell || winner ? true : false}
            data-index={index}
            className={` ${
              N == 3 ? "size-18 laptop:size-25" : "aspect-square text-3xl"
            } flex items-center justify-center border bg-white border-gray-400 disabled:cursor-not-allowed cursor-pointer rounded-md relative overflow-hidden`}
          >
            {/* Animate presence of X or O */}
            <AnimatePresence>
              {cell && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {cell}
                </motion.span>
              )}
            </AnimatePresence>
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
