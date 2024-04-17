import React, { useState, useEffect } from "react";
import "./hanoi.css";
import moveSoundFile from "./move-sound.mp3";
import Confetti from 'react-confetti';

const App = () => {
  const [moveSound] = useState(new Audio(moveSoundFile));
  const [gameWon, setGameWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 5,
      color: "rgb(175, 6, 237)", // Add color property
      border: `1px solid rgb(175, 6, 237)`
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 7,
      color: "rgb(97, 5, 130)", // Add color property
      border: `1px solid rgb(97, 5, 130)`
    },
    {
      id: "Tile-3",
      column: 1,
      row: 3,
      width: 9,
      color: "rgb(55, 4, 73)", // Add color property
      border: `1px solid rgb(55, 4, 73)`
    },
    {
      id: "Tile-4",
      column: 1,
      row: 4,
      width: 11,
      color: "rgb(26, 6, 34)", // Add color property
      border: `1px solid rgb(26, 6, 34)`
    }
  ]);

  function restartGame() {
    setGameWon(false);
    setMoveCount(0);
    setShowConfetti(false);
    setTimer(0);
    setDragId("");
    setTiles([
      {
        id: "Tile-1",
        column: 1,
        row: 1,
        width: 5,
        color: "rgb(175, 6, 237)", // Add color property
        border: `1px solid rgb(175, 6, 237)`
      },
      {
        id: "Tile-2",
        column: 1,
        row: 2,
        width: 7,
        color: "rgb(97, 5, 130)", // Add color property
        border: `1px solid rgb(97, 5, 130)`
      },
      {
        id: "Tile-3",
        column: 1,
        row: 3,
        width: 9,
        color: "rgb(55, 4, 73)", // Add color property
        border: `1px solid rgb(55, 4, 73)`
      },
      {
        id: "Tile-4",
        column: 1,
        row: 4,
        width: 11,
        color: "rgb(26, 6, 34)", // Add color property
        border: `1px solid rgb(26, 6, 34)`
      }
    ])
  };

  useEffect(() => {
    let interval;
    if (!gameWon) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameWon]);

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
            console.log('Response from server:', responseData.score); // Log response data
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    if (winCondition) {
      setShowConfetti(true);
      sendData();
  }
}, [gameWon, moveCount, timer, winCondition]);
  return (
    <>
      <div className="App">
        <div className="content">
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
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
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
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
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
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
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
        </div>
        {showConfetti && <Confetti />}
        {winCondition && (
          <div className="win-message">
            CONGRATULATIONS!
            <div className="win-subtitle">
              You did it in <span className="win-number">{moveCount}</span>{" "} moves
            </div>
            <div className="win-subtitle">
              <button className="btn btn-warning" onClick={restartGame}> Play Again </button>
              <button className="btn btn-warning">Go to Profile</button>
            </div>
          </div>
        )}
        Move count: {moveCount}
        <br />
        Time: {timer} seconds
      </div>
    </>
  );
};

function isGameWon(tiles) {
  return tiles.every((tile) => tile.column === 1);
}

export default App;
