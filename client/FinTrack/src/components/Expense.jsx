import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [editExpense, setEditExpense] = useState(null);

    // Fetch expenses from the backend
    const fetchExpenses = async () => {
        try {
            const response = await axiosInstance.get('/expense');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle form submission to add or update an expense
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editExpense) {
                // Update expense
                await axiosInstance.put(`/expense/${editExpense.id}`, { amount, category, description });
                setEditExpense(null);
            } else {
                // Add new expense
                await axiosInstance.post('/expense', { amount, category, description });
            }
            fetchExpenses();
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            console.error('Error saving expense:', error.response ? error.response.data : error.message);
        }
    };

    // Handle edit click
    const handleEdit = (expense) => {
        setAmount(expense.amount);
        setCategory(expense.category);
        setDescription(expense.description);
        setEditExpense(expense);
    };

    // Handle delete click
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/expense/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error.response ? error.response.data : error.message);
        }
    };

    // Prepare data for charts
    const expenseCategories = {};
    expenses.forEach(expense => {
        if (!expenseCategories[expense.category]) {
            expenseCategories[expense.category] = 0;
        }
        expenseCategories[expense.category] += expense.amount;
    });

    const categoryData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expenseCategories),
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
    };

    const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'short' }));
    const monthlyExpenses = Array(12).fill(0);

    expenses.forEach(expense => {
        const month = new Date(expense.date).getMonth();
        monthlyExpenses[month] += expense.amount;
    });

    const monthlyData = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Monthly Expenses',
                data: monthlyExpenses,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Expenses</h1>
            <form onSubmit={handleSubmit} className='expense-form'>
                <div>
                    <label>Amount</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <button type="submit">{editExpense ? 'Update Expense' : 'Add Expense'}</button>
                {editExpense && <button type="button" onClick={() => setEditExpense(null)}>Cancel Edit</button>}
            </form>
            <h2>Expense Overview</h2>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h3>Expenses by Category</h3>
                <Pie data={categoryData} />
                <h3>Monthly Expenses</h3>
                <Bar data={monthlyData} />
            </div>
            <h2>Current Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount} - {expense.category}
                        <button onClick={() => handleEdit(expense)}>Edit</button>
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
