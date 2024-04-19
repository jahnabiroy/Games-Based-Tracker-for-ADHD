import React, { useState, useEffect, useRef } from 'react';
import './memorygame.css';
import right from './right_answer.wav'
import wrong from './wrong_answer.mp3'
import Tutorial from './memgametut';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import congrats from '../../assets/congratulations.wav'

const MemoryGame = () => {
    const [cards] = useState(createDeck());
    const [startGame, setStartGame] = useState(false);
    const [closeTut, setCloseTut] = useState(true);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);
    const [rightMatches, setRightMatches] = useState([]);
    const [wrongMatches, setWrongMatches] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [winner, setWinner] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const correctAudio = new Audio(right);
    const wrongAudio = new Audio(wrong);
    const winning = new Audio(congrats);

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

    function handleClose() {
        setCloseTut(!closeTut);
    }

    function handleStart() {
        sendDatatoserver();
        setStartGame(!startGame);
        restartGame();
    }

    const contentRef = useRef(null);
    useEffect(() => {
        if (startGame && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [startGame]);

    useEffect(() => {
        if (rightMatches.length / 2 === 8) {
            setWinner(true);
            setGameOver(true); // Set game over state to true
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [rightMatches, winner]);

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
        sendDatatoserver();
        setFlippedIndexes([]);
        setMatchedIndexes([]);
        setRightMatches([]);
        setWrongMatches([]);
        setElapsedTime(0);
        setWinner(false);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
    useEffect(() => {
        const timer = setInterval(() => {
            if (!gameOver) {
                setElapsedTime(prevTime => prevTime + 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [gameOver]);
    useEffect(() => {
        if (rightMatches.length / 2 === 8) {
            setWinner(true);
            winning.play();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [rightMatches, winner]);

    function sendDatatoserver(){
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
                const responseData = await response.json();
                // ('Response from server:', responseData.score);console.log
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };
        sendData();
    }
    useEffect(() => {
        if(winner){
            sendDatatoserver();
        }
    }, [rightMatches, wrongMatches, elapsedTime, winner]);

    return (
        <div className='container-fluid' style={{backgroundColor: `#440455`}}>
            <div className='row p-5'>
                <hr style={{color: `white`}}/>
                <h1 className='text-white hanoi-title' style={{fontSize: `5rem`}}>CARD FLIP GAME</h1>
                <hr style={{color: `white`}}/>
                <div className='col-md-9'>
                    <div className="p-2" style={{color: `rgb(225, 187, 245)`, fontSize: `1.2em`}}>
                        The card flip game is a variation of the classic memory game, also known as Concentration, Match Match, 
                        or Pairs. It involves flipping over pairs of cards to find matching pairs. Game starts with all the cards
                        flipped out. The player can only see two cards at the same time. The objective is to flip all the cards 
                        by correcty matching two cards.
                        <br/><br/>
                        Benefits of this game for individuals with ADHD : <br/><br/>
                        🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Memory</span> <br/>
                        🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Focus and Attention</span> <br/>
                        🌟 <span className='px-2' style={{fontSize: `1.2em`, textShadow: `0 0 3px #fff`, color: `yellow`}}>Hyperactivity Regulation</span> <br/>
                        <br/>
                        However, as with any activity, its suitability may vary from person to 
                        person. Some individuals with ADHD may find it engaging and enjoyable, while others may struggle to maintain 
                        focus or interest due to its frustrating nature.
                    </div>
                    <button className="btn btn-warning m-2" onClick={handleStart} style={{fontSize: `1.2em`}}>{startGame ? 'RESTART GAME' : 'START GAME'}</button>
                    <button className="btn btn-warning m-2" onClick={handleClose} style={{fontSize: `1.2em`}}>SEE TUTORIAL</button> 
                </div>
            </div>
            {!closeTut && <Tutorial  onClose={handleClose}/>}
            { startGame && <div className="memory-game" ref={contentRef}>
                <div className="cards-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            {flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card.symbol : '💡💭'}
                        </div>
                    ))}
                    <button className='btn btn-warning' style={{fontSize: `1.5em`, transition: 'transform 0.2s'}} onClick={restartGame}>Restart Game</button>
                    <button className='btn btn-warning' style={{fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>✅ {rightMatches.length/2}</button>
                    <button className='btn btn-warning' style={{fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>❌ {wrongMatches.length/2}</button>
                    <button className='btn btn-warning' style={{fontSize: `1.5em`, cursor: `default`, transition: 'transform 0.2s'}}>⏰ {formatTime(elapsedTime)}</button>
                </div>
            </div>}
            {winner && (
                <div className="overlay">
                    <Confetti />
                <div className="win-message">
                    CONGRATULATIONS!
                <div className="win-subtitle">
                    You are on the go!
                </div>
                <div className="win-subtitle p-1" style={{fontSize: `0.45em`}}>
                    There is no ideal solution to this since luck is also a factor into this game. But optimisation can be made
                    by remembering exact where the unmatched pair lies on the deck. This game aims to improve <b>memory</b> and  
                    <b> attention/focus</b>.
                </div>
                <div className='win-subtitle'>
                    <button className='btn btn-warning btn-lg' onClick={restartGame}>Play Again</button>
                    <Link to='/profile' className='btn btn-warning btn-lg'>Go to Profile</Link>
                </div>
                </div>
                </div>
                )}


        </div>
    );
};

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default MemoryGame;
