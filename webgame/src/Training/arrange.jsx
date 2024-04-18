import React, { useState, useEffect } from 'react';
import './arrange.css';
import moveSoundFile from './move-sound.mp3';

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const moveSound = new Audio(moveSoundFile);

  useEffect(() => {
    let interval;
    if (!gameWon) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameWon]);

  function generateNumbers() {
    let nums = [];
    for (let i = 1; i <= 15; i++) {
      nums.push(i);
    }
    nums = shuffleArray(nums);
    nums.push(null); // null represents the empty space
    return nums;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function swapCells(index1, index2) {
    const newNumbers = [...numbers];
    [newNumbers[index1], newNumbers[index2]] = [newNumbers[index2], newNumbers[index1]];
    setNumbers(newNumbers);
    moveSound.play();
    setMoveCount((prevCount) => prevCount + 1);
    if (isGameWon(newNumbers)) {
      setGameWon(true);
    }
  }

  function isGameWon(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  function handleReset() {
    setNumbers(generateNumbers());
    setGameWon(false);
    setMoveCount(0);
    setTimer(0);
  }
  function handleCheatCode() {
    const correctOrder = Array.from({ length: 15 }, (_, index) => index + 1);
    correctOrder.push(null);
    setNumbers(correctOrder);
    setGameWon(true);
  }

  const renderCell = (number, index) => {
    return (
      <div
        key={index}
        className={`cell ${number === null ? 'empty' : ''}`}
        onClick={() => handleCellClick(index)}
      >
        {number}
      </div>
    );
  };

  const handleCellClick = (index) => {
    if (!gameWon) {
      const emptyIndex = numbers.indexOf(null);
      if (isValidMove(index, emptyIndex)) {
        swapCells(index, emptyIndex);
      }
    }
  };

  const isValidMove = (index, emptyIndex) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow);
  };
  useEffect(() => {
    const sendData = async () => {
        try {
            const response = await fetch('http://localhost:8000/numberpuzzle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    moves: moveCount,
                    timeTaken: timer,
                }),
            });
            const responseData = await response.json(); // Get response as text
            console.log('Response from server:', responseData.score); // Log response data
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    if (gameWon) {
      sendData();
  }
}, [gameWon, moveCount, timer]);

  return (
    <div>
      <div className="puzzle-board">
        {numbers.map((number, index) => renderCell(number, index))}
      </div>
      <div className="game-info">
        <div>Move Count: {moveCount}</div>
        <div>Timer: {timer} seconds</div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCheatCode}>Cheat Code</button>
      </div>
      {gameWon && (
        <div className="win-modal">
          <div className="win-message">Congratulations! You win!</div>
        </div>
      )}
    </div>
  );
};

export default NumberPuzzle;