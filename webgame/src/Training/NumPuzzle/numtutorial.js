import React, { useState } from "react";
import "./tutorial.css"; // Import CSS for tutorial styles
import NumberPuzzleTut from "./4_grid_puzzle";

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // State for tracking current step

  // Function to handle advancing to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle going back to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <h2>Number Puzzle Tutorial</h2>
        {currentStep === 1 && (
          <>
            <p>Welcome to the Number Puzzle tutorial!</p>
            <p>In this game, your goal is to arrange the numbers in increasing order.</p>
            <p>Let's get started by clicking on the top right number. This will swap its position with the empty block.</p>
            <NumberPuzzleTut />
            <button onClick={nextStep} className="btn btn-primary">Next</button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Great job! This is exactly how you go about playing the game.</p>
            <p>Continue rearranging the blocks and get to the final arrangement needed.</p>
            <p>You can only move one block at a time. Be aware!</p>
            <NumberPuzzleTut />
            <button onClick={prevStep} className="btn btn-primary m-1">Previous</button>
            <button onClick={nextStep} className="btn btn-primary m-1">Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p>Congratulations! You've completed the Number Puzzle tutorial.</p>
            <p>You can now start the game and challenge yourself to solve the classic 15 puzzle game.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
