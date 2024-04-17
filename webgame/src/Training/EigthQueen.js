import React, { useState ,useEffect} from 'react';
import './EigthQueen.css';

const EightQueens = () => {
  const [queens, setQueens] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [queensPlaced, setQueensPlaced] = useState(0); // State variable to keep track of the number of queens placed

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
      setQueensPlaced(newQueens.length); // Update the number of queens placed
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
    setQueensPlaced(0); // Reset the number of queens placed
  };
  useEffect(() => {
    const sendData = async () => {
        try {
            const response = await fetch('http://localhost:8000/EightQueen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  queensPlaced: queensPlaced
                }),
            });
            const responseData = await response.json(); // Get response as text
            console.log('Response from server:', responseData.score); // Log response data
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    if(gameWon){
      sendData();
    }
}, [queensPlaced]);
  return (
    <div>
      <h1>8 Queens Game</h1>
      {gameWon ? <div>You won!</div> : null}
      <div>Queens Placed: {queensPlaced}</div> {/* Display the number of queens placed */}
      {renderBoard()}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default EightQueens;
