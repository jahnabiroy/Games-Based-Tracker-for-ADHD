import React, { useState } from 'react';
import './memorygame.css'; // Import corresponding CSS file

const MemoryGame = () => {
    const [cards, setCards] = useState(createDeck());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);

    // Function to create a deck of cards with pairs
    function createDeck() {
        const symbols = ['🍎', '🍌', '🍉', '🍇', '🥑', '🍓', '🍊', '🍍']; // Example symbols
        const deck = symbols.concat(symbols); // Duplicate symbols to create pairs
        return shuffle(deck.map((symbol, index) => ({ symbol, index })));
    }

    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to handle card click
    function handleCardClick(index) {
        // If the clicked card is already matched or flipped, ignore
        if (matchedIndexes.includes(index) || flippedIndexes.includes(index)) return;

        // Flip the card by adding its index to flippedIndexes
        setFlippedIndexes([...flippedIndexes, index]);

        // Check if two cards are flipped
        if (flippedIndexes.length === 1) {
            // Delay checking for matching cards to display both flipped cards
            setTimeout(() => checkForMatch(index), 1000);
        }
    }

    // Function to check if two flipped cards match
    function checkForMatch(index) {
        const firstIndex = flippedIndexes[0];
        const secondIndex = index;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        // If symbols match, mark them as matched
        if (firstCard.symbol === secondCard.symbol) {
            setMatchedIndexes([...matchedIndexes, firstIndex, secondIndex]);
        }

        // Clear flippedIndexes array
        setFlippedIndexes([]);
    }

    return (
        <div className="memory-game">
            <div className="cards-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        {flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card.symbol : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;
