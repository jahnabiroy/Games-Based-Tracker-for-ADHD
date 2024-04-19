import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export function DoughnutGraph({ score, focus, patience, memory, hyperactivity }) {
  // Dynamically update the data based on the score prop
  const total = 40-score + focus + patience + memory - hyperactivity;
  const data = {
    labels: ['Quiz', 'Focus', 'Patience', 'Memory', 'Hyperactivity'],
    datasets: [
      {
        label: '',
        data: [20-score, focus, patience, memory, 20-hyperactivity, 100-total],
        backgroundColor: [
          '#fff',
          '#ebd07e',
          '#846815',
          '#ae913d',
          '#dfb846',
          '#64057e'
        ],
        borderColor: [
          '#fff',
          '#fff',
          '#fff',
          '#fff',
          '#fff',
          '#fff'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        display : false,
        labels: {
          color: 'white', // Change the color of the label text here
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
