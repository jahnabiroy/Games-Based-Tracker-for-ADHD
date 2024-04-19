import React, { useEffect } from "react";

const Score = ({ totalPoints, onNextQuestion }) => {
  useEffect(() => {
    // Define the data to be sent to the backend
    const data = { totalPoints };

    // Send a POST request to the backend
    fetch('http://localhost:8000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }
      return response.json();
    })
    .then(data => {
      // console.log('Data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending data to the server:', error.message);
    });
  }, [totalPoints]); // Execute the effect whenever totalPoints changes

  return (
    <div>
      <h2>Thanks for taking the test. You are Getting there! ツ</h2>
    </div>
  );
};

export default Score;
