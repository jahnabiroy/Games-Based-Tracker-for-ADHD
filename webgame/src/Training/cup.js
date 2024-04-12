import React, { useState } from 'react';
import './cup.css';

const ThreeCupSortingGame = () => {
    const [cups, setCups] = useState([
        { id: 1, color: 'red', isBallInside: true },
        { id: 2, color: 'green', isBallInside: false },
        { id: 3, color: 'blue', isBallInside: false }
    ]);

    const handleCupClick = (cupId) => {
        const updatedCups = cups.map(cup => {
            if (cup.id === cupId) {
                return { ...cup, isBallInside: !cup.isBallInside };
            }
            return cup;
        });
        setCups(updatedCups);
    };

    return (
        <div className="three-cup-sorting-game">
            <div className="cups-container">
                {cups.map(cup => (
                    <div
                        key={cup.id}
                        className={`cup ${cup.color} ${cup.isBallInside ? 'ball-inside' : ''}`}
                        onClick={() => handleCupClick(cup.id)}
                    >
                        <div className="ball"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreeCupSortingGame;
