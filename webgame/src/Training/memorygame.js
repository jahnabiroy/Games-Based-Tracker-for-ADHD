import React, { useState, useEffect } from 'react';
import './memorygame.css';

const MemoryGame = () => {
    const [cards] = useState(createDeck());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);
    const [rightMatches, setRightMatches] = useState([]);
    const [wrongMatches, setWrongMatches] = useState([]);

    function createDeck() {
        // Replace symbols with image URLs
        const imageUrls = [
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
            "puzzle.png",
        ];
        return shuffle(imageUrls.map((url, index) => ({ url, index })));
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleCardClick(index) {
        if (matchedIndexes.includes(index) || flippedIndexes.includes(index)) return;

        setFlippedIndexes([...flippedIndexes, index]);

        if (flippedIndexes.length === 1) {
            setTimeout(() => checkForMatch(index), 1000);
        }
    }

    function checkForMatch(index) {
        const firstIndex = flippedIndexes[0];
        const secondIndex = index;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.url === secondCard.url) {
            setMatchedIndexes([...matchedIndexes, firstIndex, secondIndex]);
            setRightMatches([...rightMatches, firstIndex, secondIndex]);
        } else {
            setWrongMatches([...wrongMatches, firstIndex, secondIndex]);
        }

        setFlippedIndexes([]);
    }

    function restartGame() {
        setFlippedIndexes([]);
        setMatchedIndexes([]);
        setRightMatches([]);
        setWrongMatches([]);
    }

    useEffect(() => {
        const sendData = async () => {
            try {
                const response = await fetch('http://localhost:8000/memorygame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rightMatches: rightMatches.length / 2,
                        wrongMatches: wrongMatches.length / 2,
                    }),
                });
                const responseData = await response.json(); // Get response as text
                console.log('Response from server:', responseData.score); // Log response dat
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

        sendData();
    }, [rightMatches, wrongMatches]);

    return (
        <div className='container-fluid'>
            <div className="memory-game">
                <div className="cards-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {/* Replace text symbol with img element */}
                            {flippedIndexes.includes(index) || matchedIndexes.includes(index) ? (
                                <img src={card.url} alt={`Card ${index}`} />
                            ) : (
                                <img src="card-back.jpg" alt="Card Back" />
                            )}
                        </div>
                    ))}
                    <button className='btn btn-warning' onClick={restartGame}>Restart Game</button>
                </div>
            </div>
        </div>
    );
};

export default MemoryGame;
