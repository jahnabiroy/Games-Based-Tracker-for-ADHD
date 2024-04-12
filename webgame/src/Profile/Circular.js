import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const CircularGraph = ({ score }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const updatedData = {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: ['green', 'lightgrey']
      }]
    };

    setChartData(updatedData);

    // Clean up chart instance when component unmounts
    return () => {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    };
  }, [score]);

  return (
    <div>
      <h2>Circular Graph</h2>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }}
        redraw={true} // Force redraw to avoid canvas error
        onElementsClick={(elems) => {
          // Handle click events on chart elements
          console.log(elems);
        }}
      />
    </div>
  );
};

export default CircularGraph;
