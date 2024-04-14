import React, { useState } from 'react';
import './EigthQueen.css';

const EightQueens = () => {
  const [queens, setQueens] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const handleCellClick = (row, col) => {
    if (gameWon) return; // Prevent placing queens after winning the game

    const isValidMove = queens.every(
      (queen) =>
        queen.row !== row &&
        queen.col !== col &&
        Math.abs(queen.row - row) !== Math.abs(queen.col - col)
    );

    if (isValidMove) {
      const newQueens = [...queens, { row, col }];
      setQueens(newQueens);
      if (newQueens.length === 8) {
        setGameWon(true);
      }
    } else {
      alert('Invalid move! Queens cannot attack each other.');
    }
  };

  const renderCell = (row, col) => {
    const isQueen = queens.some(
      (queen) => queen.row === row && queen.col === col
    );
    return (
      <div
        key={`${row}-${col}`}
        className={`cell ${isQueen ? 'queen' : ''}`}
        onClick={() => handleCellClick(row, col)}
      ></div>
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        board.push(renderCell(row, col));
      }
    }
    return <div className="board">{board}</div>;
  };

  const handleReset = () => {
    setQueens([]);
    setGameWon(false);
  };

  return (
    <div>
      <h1>8 Queens Game</h1>
      {gameWon ? <div>You won!</div> : null}
      {renderBoard()}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default EightQueens;
