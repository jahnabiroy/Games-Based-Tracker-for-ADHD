import React, { useState } from 'react';
import './betterAim.css';

const BetterAim = () => {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({
    x: Math.random() * 400, // Initial random x-coordinate within a 400x400 area
    y: Math.random() * 400, // Initial random y-coordinate within a 400x400 area
  });

  const handleShot = (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Calculate distance between click point and target position
    const distance = Math.sqrt(
      Math.pow(clickX - targetPosition.x, 2) +
      Math.pow(clickY - targetPosition.y, 2)
    );

    // If distance is within a certain threshold, count it as a hit
    if (distance < 30) {
      setScore(score + 1);
      setTargetPosition({
        x: Math.random() * 400, // Randomize new x-coordinate for target
        y: Math.random() * 400, // Randomize new y-coordinate for target
      });
    }
  };

  return (
    <div className="betterAim" onClick={handleShot}>
      <h1>Better Aim Game</h1>
      <div className="target" style={{ left: targetPosition.x, top: targetPosition.y }} onClick={handleShot}></div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default BetterAim;
