// src/components/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import './home.css'; // Import the CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://fintrack-19.onrender.com/auth/register', {
                username,
                email,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error registering:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="register-card">
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
