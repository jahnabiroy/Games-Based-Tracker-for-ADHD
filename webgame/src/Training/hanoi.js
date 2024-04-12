import React, { useState } from 'react';
import './hanoi.css';

const TowerOfHanoi = () => {
    const [pegs, setPegs] = useState([
        [4, 3, 2, 1], // Initial tower on peg 1
        [], // Empty peg 2
        [], // Empty peg 3
        []  // Empty peg 4
    ]);
    const [selectedPeg, setSelectedPeg] = useState(null);

    // Function to handle click on a peg
    const handlePegClick = (pegIndex) => {
        if (selectedPeg === null) {
            // If no peg is selected, set the selected peg
            if (pegs[pegIndex].length > 0) {
                setSelectedPeg(pegIndex);
            }
        } else {
            // If a peg is selected, try to move the disk
            if (isValidMove(pegs[selectedPeg], pegs[pegIndex])) {
                const updatedPegs = [...pegs];
                updatedPegs[pegIndex].push(updatedPegs[selectedPeg].pop());
                setPegs(updatedPegs);
            }
            setSelectedPeg(null); // Reset selected peg
        }
    };

    // Function to check if a move is valid
    const isValidMove = (sourcePeg, targetPeg) => {
        if (sourcePeg.length === 0) return false; // Cannot move from an empty peg
        if (targetPeg.length === 0) return true; // Can move to an empty peg
        return sourcePeg[sourcePeg.length - 1] < targetPeg[targetPeg.length - 1];
    };

    return (
        <div className="tower-of-hanoi">
            {pegs.map((peg, pegIndex) => (
                <div key={pegIndex} className="peg" onClick={() => handlePegClick(pegIndex)}>
                    {peg.map((disk, diskIndex) => (
                        <div key={diskIndex} className={`disk disk-${disk}`}></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TowerOfHanoi;
