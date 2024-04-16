import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export function DoughnutGraph({ score }) {
  // Dynamically update the data based on the score prop
  const data = {
    labels: ['Score', ''],
    datasets: [
      {
        label: 'Keep Going! You can do this!',
        data: [score, 100 - score],
        backgroundColor: [
          '#ffc107',
          'rgba(54, 162, 235, 0)',
        ],
        borderColor: [
          '#ffc107',
          '#ffc107',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        labels: {
          color: 'white', // Change the color of the label text here
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
