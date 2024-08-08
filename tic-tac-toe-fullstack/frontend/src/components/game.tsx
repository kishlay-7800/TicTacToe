import { useState } from 'react';
import Board from './board';

export default function Game({
  initialHistory,
  updateGameHistoryInDB,
}: {
  initialHistory?: (string | null)[][],
  updateGameHistoryInDB: (arg: (string | null)[][]) => void
}) {
  const history = initialHistory ?? [Array(9).fill(null)];
  const currentMove = 
    initialHistory
      ? initialHistory.length - 1
      : 0
  ;
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    updateGameHistoryInDB(nextHistory)
    // setHistory(nextHistory);
    // setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

