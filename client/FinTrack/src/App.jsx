// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Expenses from './components/Expense';
import Budgets from './components/Budgets';
import Insights from './components/Insights';
import { useAuth } from './Authcontext.jsx'; // Import the useAuth hook

import "./components/home.css"

const App = () => {
    const { isAuthenticated } = useAuth(); // Use the authentication status

    return (
        <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/register"
                            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
                        />
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
                        />
                        <Route path="/expenses" element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />} />
                        <Route path="/budgets" element={isAuthenticated ? <Budgets /> : <Navigate to="/login" />} />
                        <Route path="/insights" element={isAuthenticated ? <Insights /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
