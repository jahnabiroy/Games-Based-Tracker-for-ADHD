import React, { useState, useEffect } from 'react';
import './memorymatching.css'; // Import your CSS file for styling

const MemoryMatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create an array of pairs of cards (each card has a unique id and a matching pair)
    const initialCards = [];
    for (let i = 0; i < 8; i++) {
      initialCards.push({ id: i, value: `card-${i}`, flipped: false, matched: false });
      initialCards.push({ id: i + 100, value: `card-${i}`, flipped: false, matched: false });
    }
    // Shuffle the cards
    const shuffledCards = initialCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const flipCard = (cardId) => {
    if (selectedCards.length === 2) {
      return; // Prevent flipping more than 2 cards at a time
    }

    const updatedCards = cards.map((card) => {
      if (card.id === cardId && !card.matched) {
        return { ...card, flipped: true };
      }
      return card;
    });

    setCards(updatedCards);
    setSelectedCards([...selectedCards, cardId]);

    if (selectedCards.length === 1) {
      // Check if the two flipped cards match
      setTimeout(() => checkForMatch(), 1000);
    }
  };

  const checkForMatch = () => {
    const [firstCard, secondCard] = selectedCards;
    const firstIndex = cards.findIndex((card) => card.id === firstCard);
    const secondIndex = cards.findIndex((card) => card.id === secondCard);

    if (cards[firstIndex].value === cards[secondIndex].value) {
      // Cards match
      const updatedCards = [...cards];
      updatedCards[firstIndex].matched = true;
      updatedCards[secondIndex].matched = true;
      setCards(updatedCards);
      setMatchedPairs([...matchedPairs, cards[firstIndex].value]);
    } else {
      // Cards don't match
      const updatedCards = cards.map((card) => {
        if (card.id === firstCard || card.id === secondCard) {
          return { ...card, flipped: false };
        }
        return card;
      });
      setCards(updatedCards);
    }

    setSelectedCards([]);
    setMoves(moves + 1);
  };

  return (
    <div className="memory-matching-game">
      <div className="game-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => flipCard(card.id)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="game-info">
        <p>Moves: {moves}</p>
        <p>Matched pairs: {matchedPairs.length}</p>
      </div>
    </div>
  );
};

export default MemoryMatchingGame;
