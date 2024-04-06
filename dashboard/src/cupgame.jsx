import React, { useState, useEffect } from 'react';
import './cupgame.css'; // Import your CSS file for styling

const CupGame = () => {
  const [cups, setCups] = useState(Array(3).fill(false)); // Initially no ball under any cup
  const [message, setMessage] = useState('');

  useEffect(() => {
    placeBall();
  }, []);

  const placeBall = () => {
    const randomIndex = Math.floor(Math.random() * cups.length);
    const updatedCups = [...cups];
    updatedCups[randomIndex] = true;
    setCups(updatedCups);
  };

  const shuffleCups = () => {
    const shuffledCups = [...cups].sort(() => Math.random() - 0.5);
    setCups(shuffledCups);
    setMessage('');
  };

  const revealCup = (index) => {
    if (cups[index]) {
      setMessage('You found the ball! 🎉');
    } else {
      setMessage('Try again! 😞');
    }
  };

  return (
    <div className="cup-game">
      <div className="cup-container">
        {cups.map((hasBall, index) => (
          <div key={index} className="cup" onClick={() => revealCup(index)}>
            {hasBall ? <div className="ball" /> : null}
          </div>
        ))}
      </div>
      <button className="shuffle-btn" onClick={shuffleCups}>Shuffle Cups</button>
      <div className="message">{message}</div>
    </div>
  );
};

export default CupGame;
