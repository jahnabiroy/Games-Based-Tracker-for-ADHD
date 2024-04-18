import React, { useState } from 'react';
import './memorygametut.css';
import right from './right_answer.wav';
import wrong from './wrong_answer.mp3';

const MemoryGameTut = () => {
    const [cards] = useState(createDeck());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);

    const correctAudio = new Audio(right);
    const wrongAudio = new Audio(wrong);

    function createDeck() {
        const symbols = ['🍇', '🥑'];
        const deck = symbols.concat(symbols);
        return shuffle(deck.map((symbol, index) => ({ symbol, index })));
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

        setFlippedIndexes(prevFlippedIndexes => [...prevFlippedIndexes, index]);

        if (flippedIndexes.length === 1) {
            setTimeout(() => checkForMatch(index), 1000);
        }
    }

    function checkForMatch(index) {
        const firstIndex = flippedIndexes[0];
        const secondIndex = index;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.symbol === secondCard.symbol) {
            setMatchedIndexes(prevMatchedIndexes => [...prevMatchedIndexes, firstIndex, secondIndex]);
            correctAudio.play();
        } else {
            wrongAudio.play();
        }

        setFlippedIndexes([]);
    }

    return (
        <div className='container-fluid'>
            <div className="memory-game2">
                <div className="cards2-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card2 ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card.symbol : '💡💭'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemoryGameTut;
