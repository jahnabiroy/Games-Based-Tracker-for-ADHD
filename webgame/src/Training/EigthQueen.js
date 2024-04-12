import React, { useState } from 'react';
import './EigthQueen.css';

const EightQueens = () => {
  const [queens, setQueens] = useState([]);

  const handleCellClick = (row, col) => {
    const isValidMove = queens.every(
      (queen) =>
        queen.row !== row &&
        queen.col !== col &&
        Math.abs(queen.row - row) !== Math.abs(queen.col - col)
    );

    if (isValidMove) {
      setQueens([...queens, { row, col }]);
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

  return (
    <div>
      <h1>8 Queens Game</h1>
      {renderBoard()}
    </div>
  );
};

export default EightQueens;
