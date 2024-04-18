import React, { useState, useEffect } from 'react';
import './memorygame.css';
import right from '../right_answer.wav'
import wrong from '../wrong_answer.mp3'
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

const MemoryGame = () => {
    const [cards] = useState(createDeck());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);
    const [rightMatches, setRightMatches] = useState([]);
    const [wrongMatches, setWrongMatches] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0); // State for elapsed time
    const [winner, setWinner] = useState(false); // State to track if the game is won

    const correctAudio = new Audio(right);
    const wrongAudio = new Audio(wrong);

    function createDeck() {
        const symbols = ['🍎', '🍌', '🍉', '🍇', '🥑', '🍓', '🍊', '🍍'];
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

        if (firstCard.symbol === secondCard.symbol) {
            setMatchedIndexes([...matchedIndexes, firstIndex, secondIndex]);
            setRightMatches([...rightMatches, firstIndex, secondIndex]);
            correctAudio.play();
        } else {
            setWrongMatches([...wrongMatches, firstIndex, secondIndex]);
            wrongAudio.play();
        }

        setFlippedIndexes([]);
    }

    function restartGame() {
        setFlippedIndexes([]);
        setMatchedIndexes([]);
        setRightMatches([]);
        setWrongMatches([]);
        setElapsedTime(0);
        setWinner(false); // Reset winner state
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1); // Increment elapsed time every second
        }, 1000);

        return () => {
            clearInterval(timer); // Clean up the timer
        };
    }, []); // Runs once on component mount

    useEffect(() => {
        if (rightMatches.length / 2 === 8) {
            console.log(winner);
            setWinner(true); // Set winner state to true when the game is won
        }
    }, [rightMatches, winner]);

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
                        timetaken: elapsedTime
                    }),
                });
                const responseData = await response.json(); // Get response as text
                console.log('Response from server:', responseData.score); // Log response data
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };
        if(winner){
            sendData();
        }
    }, [rightMatches, wrongMatches, elapsedTime, winner]);

    return (
        <div className='container-fluid'>
            <h1 className='text-white mt-5' style={{fontFamily: `monospace`, fontSize: `3.5rem`}}>MEMORY GAME</h1>
            <div className="memory-game">
                <div className="cards-grid" style={{fontFamily: `monospace`}}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card.symbol : '💡💭'}
                        </div>
                    ))}
                    <button className='btn btn-warning' style={{fontFamily: `monospace`, fontSize: `1.5em`, transition: 'transform 0.2s'}} onClick={restartGame}>Restart Game</button>
                    <button className='btn btn-warning' style={{fontFamily: `monospace`, fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>✅ {rightMatches.length/2}</button>
                    <button className='btn btn-warning' style={{fontFamily: `monospace`, fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>❌ {wrongMatches.length/2}</button>
                    <button className='btn btn-warning' style={{fontFamily: `monospace`, fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>⏰ {formatTime(elapsedTime)}</button>
                </div>
            </div>
            {winner && (
                <div className="win-message">
                    Congratulations!
                <div className="win-subtitle">
                    You are on the go!
                </div>
                <div className='win-subtitle'>
                    <button onClick={restartGame}>Play Again</button>
                    <button onClick={restartGame}>Go to Profile</button>
                </div>
                </div>
                )}


        </div>
    );
};

// Function to format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default MemoryGame;
