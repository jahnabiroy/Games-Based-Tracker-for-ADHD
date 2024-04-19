import React, { useState ,useEffect, useRef} from 'react';
import './EigthQueen.css';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import Tutorial from './eighttut';
import congrats from '../../assets/congratulations.wav'
import queensound from '../../assets/eightqueenmusic.wav'

const EightQueens = () => {
  const [queens, setQueens] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [closeTut, setCloseTut] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [queensPlaced, setQueensPlaced] = useState(0); // State variable to keep track of the number of queens placed

  const winning = new Audio(congrats);
  const movemusic = new Audio(queensound);

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
      movemusic.play();
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
        className={`cell3 ${isQueen ? 'queen' : ''}`}
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
    return <div className="board3">{board}</div>;
  };

  function handleClose() {
    setCloseTut(!closeTut);
  }

  function handleStart() {
    setStartGame(!startGame);
    handleReset();
  }

  const handleReset = () => {
    sendDataToServer();
    setQueens([]);
    setGameWon(false);
    setQueensPlaced(0); // Reset the number of queens placed
  };

  const contentRef = useRef(null);
  useEffect(() => {
        if (startGame && contentRef.current) {
                        contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
  }, [startGame]);

  function sendDataToServer() {
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
            // console.log('Response from server:', responseData.score); // Log response data
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    sendData();
  }

  useEffect(() => {
    if(gameWon){
      winning.play();
      sendDataToServer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}, [queensPlaced]);
  return (
    <div>
      <div className='container-fluid' style={{backgroundColor: `#440455`}}>
      <div className='row p-5'>
        <hr style={{color: `white`}}/>
        <h1 className='text-white hanoi-title' style={{fontSize: `4rem`}}>CHESS AND QUEENS GAME</h1>
        <hr style={{color: `white`}}/>
        <div className='col-md-9'>
        <div className="p-2" style={{color: `rgb(225, 187, 245)`, fontSize: `1.2em`}}>
         The 8 queens puzzle is a classic chessboard problem that challenges players to place eight queens on a 
         standard 8x8 chessboard in such a way that no two queens threaten each other. This means that no two queens 
         can share the same row, column, or diagonal.
         <br/>
         <br/>
         Benefits of this game for individuals with ADHD : <br/><br/>
         🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Focus and Working Memory</span><br/>
         🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Impulse Control</span><br/>
         🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Problem-Solving Ability</span><br/>
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
      {startGame && 
        renderBoard()}
      {startGame && (
        <div className='row' ref={contentRef}>
          <div className='col-md-1'></div>
          <div className='col-md-5'>
            <button className='btn btn-warning btn-lg my-3' style={{cursor: `default`, width: `100%`}}>Queens Placed: {queensPlaced}</button>
          </div>
          <div className='col-md-5'>
            <button className='btn btn-warning btn-lg my-3' style={{width: `100%`}} onClick={handleReset}>Reset</button>
          </div>
        </div> 
      )}
      {gameWon && (
        <div className='overlay'>
          <Confetti />
          <div className="win-message">
            CONGRATULATIONS!
          <div className='win-subtitle px-3'>
            Look at you go, Champ!
          </div>
          <div className='win-subtitle px-3' style={{fontSize: `0.5em`}}>
            There exists 92 solutions to solve this arrangement. <br/>Kudos to you for solving it!
            <br/><br></br>
            This challenge demonstrates your <b>focus</b>, <b>working memory</b>, and <b>problem-solving ability</b>. 
          </div>
          <button className='btn btn-warning btn-lg pt-2' onClick={handleReset}>Play Again</button>
            <Link to='/profile' className='btn btn-warning btn-lg pt-2'>Go to Profile</Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default EightQueens;
