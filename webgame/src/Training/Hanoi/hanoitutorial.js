import React, { useState } from "react";
import "./tutorial.css"; // Import CSS for tutorial styles
import HanoiTut from "./two_tiled_hanoi";

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hanoiTutState, setHanoiTutState] = useState({}); // State to preserve HanoiTut state

  // Function to handle advancing to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle going back to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to handle updating HanoiTut state
  const updateHanoiTutState = (state) => {
    setHanoiTutState(state);
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <h2>Tower of Hanoi Tutorial</h2>
        {currentStep === 1 && (
          <>
            <p>Welcome to the Tower of Hanoi tutorial!</p>
            <p>In this game, your goal is to move all the disks from the first peg to the third peg.</p>
            <p>Let's get started by dragging the top disk from the first peg to the second peg.</p>
            <HanoiTut state={hanoiTutState} onUpdateState={updateHanoiTutState} />
            <button onClick={nextStep} className="btn btn-primary">Next</button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Great job! You've moved the disk to another peg.</p>
            <p>Now, you have to move the next disk to the third peg.</p>
            <p>Continue moving the disks until you complete the tower on the third peg.</p>
            <p>Remember, you can only move one disk at a time, and you cannot place a larger disk on top of a smaller one.</p>
            <HanoiTut state={hanoiTutState} onUpdateState={updateHanoiTutState} />
            <button onClick={prevStep} className="btn btn-primary m-1">Previous</button>
            <button onClick={nextStep}className="btn btn-primary m-1">Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p>Congratulations! You've completed the Tower of Hanoi tutorial.</p>
            <p>You can now start the game and challenge yourself to solve it with more disks.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
