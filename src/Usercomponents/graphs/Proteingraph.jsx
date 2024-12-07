import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProteinGraph({ data }) {
  const { breakfastSums, dinnerSums, lunchSums, snacksSums } = data;

  const proteinData = [
    breakfastSums.protein,
    lunchSums.protein,
    dinnerSums.protein,
    snacksSums.protein
  ];

  const totalProtein = breakfastSums.protein+ snacksSums.protein+lunchSums.protein+dinnerSums.protein;

  const chartData = {
    labels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    datasets: [
      {
        label: "Protein (g)",
        data: proteinData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Protein Intake Throughout the Day',
      },
    },
  };

  const graphContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '800px',
    height: '400px',
    textAlign: 'left',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '20px',
  };

  const totalStyle = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '10px',
  };

  const graphStyle = {
    transition: 'transform 0.3s ease',
    height: '300px',
    width: '100%',
  };

  return (
    <div style={graphContainerStyle}>
      <h3 style={titleStyle}>Protein Graph</h3>
      <div style={totalStyle}>Total Protein Intake: {totalProtein} g</div>
      <div style={graphStyle}>
        <Line data={chartData} options={options} height={300} />
      </div>
    </div>
  );
}
