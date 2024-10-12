import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {handleAxiosError} from "./errorHandler.jsx";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', { username, password })
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                handleAxiosError(error);
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default Register;
