import React, { useState, useEffect } from "react";
import "./hanoitutorial.css";
import moveSoundFile from "./move-sound.mp3";

const HanoiTut = ({ state, onUpdateState }) => { // Receive state and onUpdateState as props
  const [moveSound] = useState(new Audio(moveSoundFile));
  const [moveCount, setMoveCount] = useState(state.moveCount || 0); // Initialize moveCount with state.moveCount if available
  const [timer, setTimer] = useState(state.timer || 0); // Initialize timer with state.timer if available
  const [dragId, setDragId] = useState(state.dragId || ""); // Initialize dragId with state.dragId if available
  const [tiles, setTiles] = useState(state.tiles || [ // Initialize tiles with state.tiles if available
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 3,
      color: "#ffc107", // Add color property
      border: `1px solid #ffc107`
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 5,
      color: "#ae8815", // Add color property
      border: `1px solid #ae8815`
    }
  ]);

  useEffect(() => {
    let interval;
    const winCondition = tiles.every((tile) => tile.column === 3);
    if (!winCondition) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [tiles]);

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
    onUpdateState({ moveCount, timer, dragId, tiles }); // Update the state in the parent component
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  return (
    <>
      <div className="container-fluid">
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
                  backgroundColor: tile.color, // HanoiTutly background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // HanoiTutly Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(25vh - ${tileCount * 20 + 10}px)` : "0";
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
                  backgroundColor: tile.color, // HanoiTutly background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // HanoiTutly Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(25vh - ${tileCount * 20 + 10}px)` : "0";
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
                  backgroundColor: tile.color, // HanoiTutly background color based on the color property
                  border: tile.border,
                  transform: `translateZ(${index * 2}px)`, // HanoiTutly Z-axis translation for 3D effect
                  transition: "transform 0.5s ease" // Add transition for smooth animation
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(25vh - ${tileCount * 20 + 10}px)` : "0";
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
      </div>
    </>
  );
};

export default HanoiTut;
