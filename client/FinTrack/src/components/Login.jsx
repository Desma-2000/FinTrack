// src/components/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../Authcontext.jsx'; // Import useAuth to manage authentication

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const { login } = useAuth(); // Get the login function from the context

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5555/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.access_token); // Store the token
            login(); // Set the user as logged in
            navigate('/'); // Redirect to home or any other route
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
