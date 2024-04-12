import React, { useState, useEffect } from 'react';
import bkg from '../assets/adhdback.png'
import pfp from '../assets/profile.jpg'
import { Link } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState({ message: "", username: "", age: "" });

    useEffect(() => {
        fetch("http://localhost:8000/profile")
            .then((res) => res.json())
            .then((data) => setUserData({ message: data.message, username: data.username, age: data.age, score: data.score }));
    }, []);

    return (
        <div>
            <div className="container-fluid" style={{ backgroundImage: `url(${bkg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <div className='row p-5'>
                    <h1 className='text-white' style={{fontFamily: `monospace`}}>USER PROFILE</h1>
                    <Link to='/tictactoe'>TicTacToe</Link>
                    <Link to='/eightQueen'>EightQueensGame</Link>
                    <Link to='/betterAim'>BetterAim </Link>
                    <Link to='/jigsaw'>Jigsaw </Link>
                    <div className='col-md-3'></div>
                    <div className='col-md-6 text-white' style={{border: '1px solid #fff', borderRadius: '10px', background: 'transparent', backdropFilter: 'blur(15px)'}}>
                        <div className='row'>
                            <div className='col-md-5'>
                                <img src={pfp} alt='lol' width={'70%'} style={{margin: `20px`, borderRadius: `75px`, marginTop: `25px`}}/>
                                <h1 className='mx-3 mb-4' style={{fontFamily: 'monospace'}}>{userData.username}</h1>
                            </div>
                            <div className='col-md-7'>
                                <div className='mx-1'>
                                    <p className='mt-5' data-bs-toggle="tooltip" title="Your Real Age">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                                        </svg>
                                        <span style={{ marginLeft: '10px' , fontFamily: `monospace`, fontSize: `23px`, fontWeight: `700`}}>{userData.age}</span>
                                    </p>
                                    <hr/>
                                    <p data-bs-toggle="tooltip" title="Your ADHD Score">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                            <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z"/>
                                        </svg>
                                        <span style={{ marginLeft: '10px' , fontFamily: `monospace`, fontSize: `23px`, fontWeight: `700`}}>{userData.score}</span>
                                    </p>
                                    <hr/>
                                    <p style={{fontFamily:`monospace`, textAlign:`right`}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-right-heart-fill" viewBox="0 0 16 16">
                                            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                                        </svg>
                                        <span style={{ marginLeft: '10px' , fontFamily: `monospace`, fontSize: `15px`, fontWeight: `700`}}>{userData.message}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        </div>
    );
}
