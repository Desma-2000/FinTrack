// src/components/Budgets.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance'; // Import the custom Axios instance

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchBudgets = async () => {
        try {
            const response = await axiosInstance.get('/budgets');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/budgets', { amount, category,end_date:endDate });
            fetchBudgets();
            setAmount('');
            setCategory('');
            setEndDate('');
        } catch (error) {
            console.error('Error adding budget:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Budgets</h1>
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
                    <label>End Date</label>
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>
                <button type="submit">Add Budget</button>
            </form>
            <ul>
                {budgets.map((budget) => (
                    <li key={budget.id}>
                        {budget.category} - {budget.amount} - {budget.endDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Budgets;
