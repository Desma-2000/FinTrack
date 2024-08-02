// src/components/Expenses.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance'; // Corrected import path

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/expense', { amount, category, description });
            fetchExpenses();
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Expenses</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Expense</button>
            </form>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.description} - {expense.amount} - {expense.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
