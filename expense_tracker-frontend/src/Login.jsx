import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import {handleAxiosError} from "./errorHandler.jsx"; // Make sure to import AuthContext

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogin } = useContext(AuthContext); // Access handleLogin from context

    // Get the location the user was trying to access before being redirected to login
    const from = location.state?.from?.pathname || '/hello';

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/login', { username, password })
            .then((response) => {
                handleLogin(response.data.token); // Use handleLogin to set the token
                navigate(from, { replace: true }); // Navigate back to the original page
            })
            .catch((error) => {
                handleAxiosError(error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;
