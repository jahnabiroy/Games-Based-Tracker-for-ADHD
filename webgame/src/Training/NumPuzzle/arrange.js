import React, { useState, useEffect, useRef } from 'react';
import './arrange.css';
import moveSoundFile from './move-sound.mp3';
import Confetti from 'react-confetti';
import Tutorial from './numtutorial';
import { Link } from 'react-router-dom';
import congrats from '../../assets/congratulations.wav'

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [startGame, setStartGame] = useState(false);
  const [closeTut, setCloseTut] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const moveSound = new Audio(moveSoundFile);
  const winning = new Audio(congrats);

  function handleClose() {
    setCloseTut(!closeTut);
  }

  function handleStart() {
    setStartGame(!startGame);
    restartGame();
  }

  function restartGame() {
    sendDatatoserver();
    setNumbers(generateNumbers());
    setGameWon(false);
    setMoveCount(0);
    setTimer(0);
  }

  const contentRef = useRef(null);
  useEffect(() => {
        if (startGame && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [startGame]);

  useEffect(() => {
    let interval;
    if (!gameWon) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    else {
      winning.play();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  function sendDatatoserver(){
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
          // console.log('Response from server:', responseData.score); // Log response data
      } catch (error) {
          console.error('Error sending data:', error);
      }
    };
    sendData();
  }
  useEffect(() => {
    if (gameWon) {
      sendDatatoserver();
  }
}, [gameWon, moveCount, timer]);


  return (
    <div>
      <div className='container-fluid' style={{backgroundColor: `#440455`}}>
      <div className='row p-5'>
        <hr style={{color: 'white'}}/>
        <h1 className='text-white hanoi-title' style={{fontSize: `5rem`}}>NUMBER PUZZLE GAME</h1>
        <hr style={{color: `white`}}/>
        <div className='col-md-9'>
        <div className="p-2" style={{color: `rgb(225, 187, 245)`, fontSize: `1.2em`}}>
          The 15 Puzzle consists of a square grid divided into 4 rows and 4 columns, totaling 15 tiles, each numbered from 1 to 15, arranged randomly.<br/><br/>
          The objective of the game is to rearrange the tiles into numerical order (from 1 to 15) by sliding them around the grid.
          There is one empty space on the grid, usually positioned at the bottom right corner, which allows tiles to be moved into it.
          <br/> <br/>
          Benefits of the game for individuals with ADHD :<br/><br/>
          🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Concentration</span><br/>
          🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Attention</span><br/>
          🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color : `yellow`}}>Problem-Solving Ability</span><br/>
          <br/>
          However, as with any activity, its suitability may vary from person to 
          person. Some individuals with ADHD may find it engaging and enjoyable, while others may struggle to maintain 
          focus or interest due to its frustrating nature.
        </div>
        <button className="btn btn-warning m-2" onClick={handleStart} style={{fontSize: `1.2em`}}>{startGame ? 'RESTART GAME' : 'START GAME'}</button>
        <button className="btn btn-warning m-2" onClick={handleClose} style={{fontSize: `1.2em`}}>SEE TUTORIAL</button> 
        </div>
      </div>
      {!closeTut && <Tutorial onClose={handleClose}/>}
      {startGame && <div className='board p-5' ref={contentRef} style={{fontFamily: `Montserrat`}}>
      <div className="puzzle-board m-5 p-5">
        {numbers.map((number, index) => renderCell(number, index))}
      </div>
      </div>}
      {startGame && <div className='row p-5'>
        <div className='col-md-1'></div>
        <div className='col-md-5'>
          <button className='btn btn-warning btn-lg' style={{width: `100%`}}>Move Count : {moveCount}</button>
        </div>
        <div className='col-md-5'>
          <button className='btn btn-warning btn-lg' style={{width: `100%`}}>Timer : {timer} seconds </button>
        </div>
      </div>}
      {/* <div className="game-info">
        <button className='btn btn-warning btn-lg' onClick={handleCheatCode}>Cheat Code</button>
      </div> */}
      {gameWon && (
        <div className='overlay'>
          <Confetti />
          <div className="win-message">
            CONGRATULATIONS!
          <div className='win-subtitle px-3'>
            You completed the challenge in {moveCount} moves!
          </div>
          <div className='win-subtitle px-3' style={{fontSize: `0.5em`}}>
            Ideally, the moves should lie in the range of 0 to 80. You should be proud of yourself if you managed to do that!
            <br/><br></br>
            This challenge demonstrates your <b>focus</b>, <b>patience</b>, and <b>problem-solving ability</b>. 
            <button className='btn btn-warning btn-lg pt-2' onClick={restartGame}>Play Again</button>
            <Link to='/profile' className='btn btn-warning btn-lg pt-2'>Go to Profile</Link>
          </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default NumberPuzzle;