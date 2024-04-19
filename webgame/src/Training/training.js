import React from 'react';
import './training.css';
import { Link } from 'react-router-dom';

export default function Training() {
    const handleFlip = (event) => {
        const target = event.currentTarget;
        target.classList.toggle('flipped');
    };

    const handleScrollDown = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: `#440455` }}>
                <div className='row p-5'>
                    <div className='text-center hanoi-title' style={{ fontSize: `4.25em`, color: `rgb(225, 187, 245)` }}>
                        TRAINING CENTER
                    </div>
                    <div className='text-center mt-5' style={{color: `rgb(225, 187, 245)`, fontSize: `1.25em`}}>
                        This might just be your most favorite place or your sworn enemy! <br/><br/> The training center consists of 4 carefully
                        picked and curated according <br/> to the needs of individuals with ADHD, to ensure their progress and <br/> betterment 
                        in their daily life.
                    </div>
                    <div className='text-center mt-5' style={{color: `rgb(225, 187, 245)`, fontSize: `1.25em`}}>
                        Click on any game to get started with your journey!<br/><br/> 
                        <span className="hover-scroll" onMouseEnter={handleScrollDown}>All the best, Champ!</span>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `#ffc107` }} onClick={handleFlip}>
                        <div className="front">
                            <div className='row'>
                                <div style={{fontSize: `3em`}}>🀧𓍢ִ໋🀦</div>
                                <div>CARD FLIP GAME</div>
                            </div>
                        </div>
                        <div className="back">
                            <div className='row p-4'>
                                <div className='mb-2'>GAME OVERVIEW <span style={{fontSize: `1.75em`}}>🀧𓍢ִ໋🀦</span></div>
                                <div style={{fontSize: `0.5em`}}>
                                    This is a classic cognitive exercise where you have to match cards by remembering their
                                    location on the grid. You can only view two cards at the same time. This game challenges your
                                    working memory, attention to detail and visual processing skills.
                                </div>
                                <div className='mt-2'><Link to='/memorygame' className='btn btn-dark'>Let's Play</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 turns text-white" style={{ backgroundColor: `purple` }} onClick={handleFlip}>
                        <div className="front">
                        <div className='row'>
                            <div style={{fontSize: `3em`}}>🛕</div>
                            <div>TOWER OF HANOI</div>
                        </div>
                        </div>
                        <div className="back">
                            <div className='row p-4'>
                                <div className='mb-2'>GAME OVERVIEW <span style={{fontSize: `1.75em`}}>🛕</span></div>
                                <div style={{fontSize: `0.5em`}}>
                                The Tower of Hanoi is a mathematical puzzle where you move a stack of
                                disks from one peg to another, following specific rules. This game challenges
                                spatial reasoning, planning, and sequential processing skills. It improves attention span and 
                                organisation skills as well.
                                </div>
                                <div className='mt-2'><Link to='/hanoi' className='btn btn-light'>Let's Play</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-5 turns text-white" style={{ backgroundColor: `purple` }} onClick={handleFlip}>
                        <div className="front">
                        <div className='row p-3'>
                            <div style={{fontSize: `3em`}}>🔢</div>
                            <div>NUMBER PUZZLE GAME</div>
                        </div>
                        </div>
                        <div className="back">
                            <div className='row p-4'>
                                <div className='mb-2'>GAME OVERVIEW <span style={{fontSize: `1.75em`}}>🔢</span></div>
                                <div style={{fontSize: `0.5em`}}>
                                The 1-15 number puzzle, also known as the sliding puzzle, is a classic game where
                                you have to rearrange numbered tiles on a grid to form a sequential order. This
                                game promotes problem-solving skills, spatial reasoning, and concentration. It helps improve 
                                attention and cognitive skills.
                                </div>
                                <div className='mt-2'><Link to='/numberpuzzle' className='btn btn-light'>Let's Play</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 turns" style={{ backgroundColor: `#ffc107` }} onClick={handleFlip}>
                        <div className="front">
                        <div className='row p-3'>
                            <div style={{fontSize: `3em`}}>♛</div>
                            <div>CHESS & QUEENS GAME</div>
                        </div>
                        </div>
                        <div className="back">
                            <div className='row p-4'>
                                <div className='mb-2'>GAME OVERVIEW <span style={{fontSize: `1.75em`}}>♛</span></div>
                                <div style={{fontSize: `0.5em`}}>
                                The 8 Queens game is a puzzle that involves placing eight chess queens on an
                                8×8 chessboard in a way that no two queens threaten each other. This game
                                requires careful planning, problem-solving, and spatial awareness. It helps improve
                                impulse control and concentration.
                                </div>
                                <div className='mt-2'><Link to='/eightQueen' className='btn btn-dark'>Let's Play</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
