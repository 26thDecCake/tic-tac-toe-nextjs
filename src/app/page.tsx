'use client'

import { useState } from "react";

function Square({ value, handleClickSquare }: { value: string; handleClickSquare: () => void }) {

  return <>
    <button id="square" className="h-12 bg-black border-2 border-cyan-200 text-white active:scale-95" onClick={handleClickSquare}>{value}</button>
  </>
}

function calculateWinner(data: { square: string[] } | string[]) {
  const square = Array.isArray(data) ? data : data.square;
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}


export default function Board() {
  const [square, setSquare] = useState<string[]>(Array(9).fill(null));
  const [isXTurnNext, setIsXTurnNext] = useState(true);

  function handleClickSquare(i: number) {
    if (square[i] || calculateWinner(square)) return;

    const nextSquares = square.slice();

    if(isXTurnNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquare(nextSquares);
    setIsXTurnNext(!isXTurnNext);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXTurnNext ? "X" : "O");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div id="status">{status}</div>
      <div id="board" className="grid grid-cols-3 grid-rows-3 gap-1 bg-slate-800 rounded w-64 h-64 p-10 mt-20">
        {square.map((value, index) => (
          <Square key={index} value={value} handleClickSquare={() => handleClickSquare(index)} />
        ))}
        {/* <Square value={square[0]} handleClickSquare={() => handleClickSquare(0)} /> */}
      </div>
      
    </main>
  );
}
