// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Expenses from './components/Expense';
import Budgets from './components/Budgets';
import Insights from './components/Insights';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/budgets" element={<Budgets />} />
                        <Route path="/insights" element={<Insights />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
