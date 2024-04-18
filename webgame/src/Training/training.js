import React from 'react';
import './training.css';
import { Link } from 'react-router-dom';

export default function Training() {
    const handleFlip = (event) => {
        const target = event.currentTarget;
        target.classList.toggle('flipped');
    };

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: `#440455` }}>
                <div className='row'>
                    <div className='text-white text-center' style={{ fontSize: `3em` }}>TRAINING CENTER</div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `#ffc107` }} onClick={handleFlip}>
                        <div className="front">MemoryGame</div>
                        <div className="back">
                            <div>Instructions to the game</div>
                            <div><Link to='/memorygame' className='btn btn-warning'>Go to memory</Link></div>
                        </div>
                    </div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `purple` }} onClick={handleFlip}>
                        <div className="front">Hanoi</div>
                        <div className="back">
                            <div>Instructions to the game</div>
                            <div><Link to='/hanoi' className='btn btn-warning'>Go to hanoi</Link></div>
                        </div>
                    </div>
                </div>
                <div className="row pb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `purple` }} onClick={handleFlip}>
                        <div className="front">15Puzzle</div>
                        <div className="back">
                            <div>Instructions to the game</div>
                            <div><Link to='/numberpuzzle' className='btn btn-warning'>Go to 15puzzle</Link></div>
                        </div>
                    </div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `#ffc107` }} onClick={handleFlip}>
                        <div className="front">8Queens</div>
                        <div className="back">
                            <div>Instructions to the game</div>
                            <div><Link to='/eightQueen' className='btn btn-warning'>Go to 8queens</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
