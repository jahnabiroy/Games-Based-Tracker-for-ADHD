import React, { useState } from 'react';
import './four_tut_style.css';

const EightQueensTut = ({ queensPlaced, setQueensPlaced }) => { // Receive queensPlaced and setQueensPlaced as props
  const [queens, setQueens] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const handleCellClick = (row, col) => {
    if (gameWon) return;

    const isValidMove = queens.every(
      (queen) =>
        queen.row !== row &&
        queen.col !== col &&
        Math.abs(queen.row - row) !== Math.abs(queen.col - col)
    );

    if (isValidMove) {
      const newQueens = [...queens, { row, col }];
      setQueens(newQueens);
      setQueensPlaced(newQueens.length);
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
        className={`cell4 ${isQueen ? 'queen2' : ''}`}
        onClick={() => handleCellClick(row, col)}
      ></div>
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        board.push(renderCell(row, col));
      }
    }
    return <div className="board4">{board}</div>;
  };

  return (
    <div>
      <div className='container-fluid'>
        {renderBoard()}
      </div>
    </div>
  );
};

export default EightQueensTut;
