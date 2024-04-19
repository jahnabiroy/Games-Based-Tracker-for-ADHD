import React, { useState, useEffect, useRef } from "react";
import "./hanoi.css";
import moveSoundFile from "./move-sound.mp3";
import Confetti from 'react-confetti';
import Tutorial from "./hanoitutorial";
import { Link } from "react-router-dom";
import congrats from '../../assets/congratulations.wav'

const App = () => {
  const [moveSound] = useState(new Audio(moveSoundFile));
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [dragId, setDragId] = useState();
  const [startGame, setStartGame] = useState(false);
  const [closeTut, setCloseTut] = useState(true);
  const winning = new Audio(congrats);
  const [tiles, setTiles] = useState([
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 5,
      color: "#f3d681", // Add color property
      border: `1px solid #f3d681`
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 7,
      color: "#ffc107", // Add color property
      border: `1px solid #ffc107`
    },
    {
      id: "Tile-3",
      column: 1,
      row: 3,
      width: 9,
      color: "#b38809", // Add color property
      border: `1px solid #b38809`
    },
    {
      id: "Tile-4",
      column: 1,
      row: 4,
      width: 11,
      color: "#826204", // Add color property
      border: `1px solid #826204`
    }
  ]);

  const contentRef = useRef(null);

  function handleStart() {
    sendDatatoserver();
    setStartGame(!startGame);
    restartGame();
  }

  useEffect(() => {
    if (startGame && contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [startGame]);

  function restartGame() {
    setGameWon(false);
    setMoveCount(0);
    setTimer(0);
    setDragId("");
    setTiles([
      {
        id: "Tile-1",
        column: 1,
        row: 1,
        width: 5,
        color: "#f3d681", // Add color property
        border: `1px solid #f3d681`
      },
      {
        id: "Tile-2",
        column: 1,
        row: 2,
        width: 7,
        color: "#ffc107", // Add color property
        border: `1px solid #ffc107`
      },
      {
        id: "Tile-3",
        column: 1,
        row: 3,
        width: 9,
        color: "#b38809", // Add color property
        border: `1px solid #b38809`
      },
      {
        id: "Tile-4",
        column: 1,
        row: 4,
        width: 11,
        color: "#826204", // Add color property
        border: `1px solid #826204`
      }
    ])
  };

 function handleClose() {
    setCloseTut(!closeTut);
  }

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
    if (isGameWon(tiles)) {
      setGameWon(true);
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles.slice();
    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
          moveSound.play();
        }

        return tile;
      });
    }

    setTiles(newTileState);
    moveSound.play();
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);

  useEffect(() => {
    let interval;
    if (!winCondition) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      winning.play();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return () => clearInterval(interval);
  }, [winCondition, timer]);

  function sendDatatoserver(){
    const sendData = async () => {
      try {
          const response = await fetch('http://localhost:8000/hanoi', {
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
    if (winCondition) {
      sendDatatoserver();
  }
}, [gameWon, moveCount, timer, winCondition]);
  return (
    <>
      <div className="container-fluid" style={{backgroundColor: `#440455`}}>
        <div className="row p-5">
          <hr style={{color: `white`}}/>
          <span className="hanoi-title" style={{fontSize: `5em`, color: `rgb(245, 187, 245)`, fontWeight: `500`}}>TOWER OF HANOI</span>
          <hr style={{color: "white"}}/>
          <div className="col-md-9">
          <div className="p-2 m-2" style={{color: `rgb(225, 187, 245)`, fontSize: `1.2em`}}>
            Tower of Hanoi is a classic mathematical puzzle game that originated in the 19th century. 
            The game consists of three pegs and a number of disks of different sizes, which can slide onto any peg.
            The game starts with all the disks stacked in ascending order of size on one peg, typically the leftmost one, 
            and the objective is to move the entire stack to another peg, following the rules above.
            <br/><br/>
            Benefits of this game for individuals with ADHD :
            <br/><br/>
            🌟 <span className="px-2" style={{fontSize: `1.15em`, textShadow: `0 0 2px #fff`, color: `yellow`}}>Attention</span> <br/>
            🌟 <span className="px-2" style={{fontSize: `1.15em`, textShadow: `0 0 2px #fff`, color: `yellow`}}>Concentration</span> <br/>
            🌟 <span className="px-2" style={{fontSize: `1.15em`, textShadow: `0 0 2px #fff`, color: `yellow`}}>Planning</span> <br/>
            🌟 <span className="px-2" style={{fontSize: `1.15em`, textShadow: `0 0 2px #fff`, color : `yellow`}}>Problem-Solving Skills</span> <br/>
            <br></br>
            However, as with any activity, its suitability may vary from person to 
            person. Some individuals with ADHD may find it engaging and enjoyable, while others may struggle to maintain 
            focus or interest due to its repetitive nature.
          </div>
          <button className="btn btn-warning m-2" onClick={handleStart} style={{fontSize: `1.2em`}}>{startGame ? 'RESTART GAME' : 'START GAME'}</button>
          <button className="btn btn-warning m-2" onClick={handleClose} style={{fontSize: `1.2em`}}>SEE TUTORIAL</button>
          </div>
        </div>
        {!closeTut && <Tutorial onClose={handleClose}/>}
        {startGame && <div className="content p-2" ref={contentRef} style={{backgroundColor: `#64067e`}}>
          <div
            className="column-container"
            id={1}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column1Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column1Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  backgroundColor: tile.color, // Apply background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // Apply Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-1-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={2}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column2Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column2Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  backgroundColor: tile.color, // Apply background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // Apply Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-2-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={3}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column3Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column3Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  backgroundColor: tile.color, // Apply background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // Apply Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(65vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-3-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
        </div>}
        {winCondition && (
          <div className="overlay">
            <Confetti />
          <div className="win-message">
            CONGRATULATIONS!
            <div className="win-subtitle">
              You did it in <span className="win-number">{moveCount}</span>{" "} moves
            </div>
            <div className="win-subtitle" style={{fontSize: `0.5em`}}>
              The ideal number of moves to complete this game is <b>15</b> moves. <br/>  Kudos to you, if you could do this! <br/><br/>
              A simple game as this, with 4 tiles, is a test of a person's <b>attention span</b> and <b>planning ability</b>.
            </div>
            <div className="win-subtitle">
              <button className="btn btn-warning btn-lg" onClick={restartGame}> Play Again </button>
              <Link to='/profile' className="btn btn-warning btn-lg">Go to Profile</Link>
            </div>
          </div>
          </div>
        )}
        {startGame && <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <button className="btn btn-warning btn-lg my-3" style={{cursor: `default`, width: '100%'}}>Move Count : {moveCount}</button>
          </div>
          <div className="col-md-5">
            <button className="btn btn-warning btn-lg my-3" style={{cursor: `default`, width: `100%`}}>Time: {timer} seconds</button>
          </div>
        </div>}
      </div>
    </>
  );
};

function isGameWon(tiles) {
  return tiles.every((tile) => tile.column === 1);
}

export default App;
