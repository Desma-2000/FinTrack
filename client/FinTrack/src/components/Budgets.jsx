import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstance';
import './home.css';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [endDate, setEndDate] = useState('');
    const [editingBudget, setEditingBudget] = useState(null);

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
            const response = await axiosInstance.get('/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchBudgets();
        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBudget) {
                await axiosInstance.put(`/budgets/${editingBudget.id}`, { amount, category, end_date: endDate });
                setEditingBudget(null);
            } else {
                await axiosInstance.post('/budgets', { amount, category, end_date: endDate });
            }
            fetchBudgets();
            setAmount('');
            setCategory('');
            setEndDate('');
        } catch (error) {
            console.error('Error saving budget:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (budget) => {
        setAmount(budget.amount);
        setCategory(budget.category);
        setEndDate(budget.end_date);
        setEditingBudget(budget);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/budgets/${id}`);
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error.response ? error.response.data : error.message);
        }
    };

    const calculateRemainingBudget = (budget) => {
        const budgetExpenses = expenses.filter(expense =>
            new Date(expense.date) >= new Date(budget.start_date) &&
            new Date(expense.date) <= new Date(budget.end_date)
        );
        const totalExpenses = budgetExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        return budget.amount - totalExpenses;
    };

    return (
        <div className="budgets-container">
            <h1>Budgets</h1>
            <div className="budget-form-card">
                <form className="budget-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Amount</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input 
                            type="text" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit">{editingBudget ? 'Update Budget' : 'Add Budget'}</button>
                </form>
            </div>
            <h2>Current Budgets</h2>
            <div className="budgets-list">
                {budgets.map((budget) => (
                    <div className="budget-card" key={budget.id}>
                        <h3>{budget.category}</h3>
                        <p>Amount: ${budget.amount}</p>
                        <p>End Date: {budget.end_date}</p>
                        <p>Remaining Budget: ${calculateRemainingBudget(budget).toFixed(2)}</p>
                        <button onClick={() => handleEdit(budget)}>Edit</button>
                        <button onClick={() => handleDelete(budget.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budgets;
