import React, { useState } from "react";
import "./tutorial.css"; // Import CSS for tutorial styles
import MemoryGameTut from "./four_cards_mem";

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // State for tracking current step
  const [tutorialState, setTutorialState] = useState({}); // State for any additional tutorial-specific state

  // Function to handle advancing to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle going back to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to handle updating tutorial state
  const updateTutorialState = (newState) => {
    setTutorialState((currentState) => ({ ...currentState, ...newState }));
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <h2>Card Flip Tutorial</h2>
        {currentStep === 1 && (
          <>
            <p>Welcome to the Card Flip tutorial!</p>
            <p>In this game, your goal is to flip all the cards on the page by matching two cards at the same time.</p>
            <p>Let's get started by clicking on the first card and second card.</p>
            <MemoryGameTut updateTutorialState={updateTutorialState} currentState={tutorialState} />
            <button onClick={nextStep} className="btn btn-primary">Next</button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Great job! This is exactly how you go about playing the game.</p>
            <p>Continue choosing two cards, flipping them, and checking for a match.</p>
            <p>You can only flip two cards at a time. The trick is to remember most of your cards to match.</p>
            <MemoryGameTut updateTutorialState={updateTutorialState} currentState={tutorialState} />
            <button onClick={prevStep} className="btn btn-primary m-1">Previous</button>
            <button onClick={nextStep} className="btn btn-primary m-1">Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p>Congratulations! You've completed the Card Flip tutorial.</p>
            <p>You can now start the game and challenge yourself to solve it.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
