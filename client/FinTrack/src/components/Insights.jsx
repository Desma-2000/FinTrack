import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import axiosInstance from '../AxiosInstance'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Insights = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axiosInstance.get('/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error.response ? error.response.data : error.message);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get('/expense');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
      }
    };

    fetchBudgets();
    fetchExpenses();
  }, []);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    setGoals([...goals, goal]);
    setGoal('');
  };

  const budgetLabels = budgets.map(b => b.category);
  const budgetData = budgets.map(b => b.amount);
  const expenseData = expenses.map(e => e.amount);

  const data = {
    labels: budgetLabels,
    datasets: [
      {
        label: 'Budgets',
        data: budgetData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expenseData,
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

  return (
    <div className="insights-container">
      <h1>Financial Insights</h1>
      <h2>Set Financial Goals</h2>
      <form onSubmit={handleGoalSubmit}>
        <label>
          Goal:
          <input 
            type="text" 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)} 
            placeholder="Enter your financial goal"
          />
        </label>
        <button type="submit">Add Goal</button>
      </form>
      <h3>Current Goals</h3>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
      <div className="chart-container">
        <div>
          <h2>Monthly Expenses and Budgets</h2>
          <Bar data={data} options={options} />
        </div>
        <div>
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
    </div>
  );
};

export default Insights;
