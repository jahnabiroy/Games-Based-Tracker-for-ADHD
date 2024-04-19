import React, { useState } from "react";
import "./tutorial.css"; // Import CSS for tutorial styles
import EightQueensTut from "./four_tut";

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // State for tracking current step

  // State for tracking queens placement
  const [queensPlaced, setQueensPlaced] = useState(0);

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
        <h2>Chess and Queens Tutorial</h2>
        {currentStep === 1 && (
          <>
            <p>Welcome to the Chess and Queens tutorial!</p>
            <p>In this game, your goal is to arrange the specified number of queens on the board such that they don't attack each other.</p>
            <p>Let's get started with 4 queens first. Start by placing our first dot in one of the columns of the first row.</p>
            <EightQueensTut queensPlaced={queensPlaced} setQueensPlaced={setQueensPlaced} />
            <button onClick={nextStep} className="btn btn-primary">Next</button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Great job! This is exactly how you go about playing the game.</p>
            <p>Continue placing the queens and get to the final arrangement needed.</p>
            <p>Be aware of the queens attacking each other!</p>
            <EightQueensTut queensPlaced={queensPlaced} setQueensPlaced={setQueensPlaced} />
            <button onClick={prevStep} className="btn btn-primary m-1">Previous</button>
            <button onClick={nextStep} className="btn btn-primary m-1">Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p>Congratulations! You've completed the Chess and Queens tutorial.</p>
            <p>You can now start the game and challenge yourself to solve the classic 8 queens game.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
