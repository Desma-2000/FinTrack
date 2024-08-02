// src/components/Insights.jsx

import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler // Import the Filler plugin
} from 'chart.js';

// Register the necessary Chart.js components including the Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler // Register the Filler plugin
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Expenses',
      data: [30, 45, 60, 70, 90, 100, 120],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Budgets',
      data: [50, 60, 80, 90, 100, 120, 140],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;
        },
      },
    },
  },
};

const Insights = () => {
  return (
    <div>
      <h1>Financial Insights</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <h2>Monthly Expenses and Budgets</h2>
        <Bar data={data} options={options} />
        <h2>Expense Distribution</h2>
        <Pie
          data={{
            labels: ['Food', 'Entertainment', 'Utilities', 'Other'],
            datasets: [
              {
                label: 'Expense Categories',
                data: [20, 15, 30, 35],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Insights;
