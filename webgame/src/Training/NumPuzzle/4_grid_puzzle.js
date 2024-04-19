import React, { useState, useEffect } from 'react';
import './numtut.css';
import moveSoundFile from './move-sound.mp3';

const NumberPuzzleTut = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [gameWon, setGameWon] = useState(false);
  const moveSound = new Audio(moveSoundFile);

  useEffect(() => {
    let interval;
    if (!gameWon) {
      interval = setInterval(() => {
        // setTimer((prevTimer) => prevTimer + 1); // Timer logic can be added later if needed
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameWon]);

  function generateNumbers() {
    let nums = [];
    for (let i = 1; i <= 3; i++) {
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

  const renderCell = (number, index) => {
    return (
      <div
        key={index}
        className={`cell2 ${number === null ? 'empty' : ''}`}
        onClick={() => handleCellClick(index)}
      >
        {number}
      </div>
    );
  };

  const handleCellClick = (index) => {
    const emptyIndex = numbers.indexOf(null);
    if (isValidMove(index, emptyIndex)) {
      swapCells(index, emptyIndex);
    }
  };

  const isValidMove = (index, emptyIndex) => {
    const row = Math.floor(index / 2); // Changed from 4 to 2
    const col = index % 2; // Changed from 4 to 2
    const emptyRow = Math.floor(emptyIndex / 2); // Changed from 4 to 2
    const emptyCol = emptyIndex % 2; // Changed from 4 to 2

    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow);
  };

  return (
    <div>
      <div className='container-fluid'>
        <div className='board2 p-5' style={{fontFamily: `Montserrat`}}>
          <div className="puzzle-board2 m-5 p-5">
            {numbers.map((number, index) => renderCell(number, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberPuzzleTut;
