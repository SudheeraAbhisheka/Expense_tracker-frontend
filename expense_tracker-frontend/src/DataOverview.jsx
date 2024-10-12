// DataOverview.js
import React, { useState, useEffect, useContext } from 'react';
import DataTable from './DataTable.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "./errorHandler.jsx";
import { AuthContext } from './AuthContext';

const DataOverview = () => {
    const [data, setData] = useState({});
    const [period, setPeriod] = useState('daily');
    const [category, setCategory] = useState('');
    const { token, handleLogout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-expenses', {
                    params: { period, category },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                handleAxiosError(error, handleLogout);
            }
        };

        fetchExpenses();
    }, [period, category, token, handleLogout]);

    return (
        <div>
            <div className="heading">
                <button onClick={() => navigate('/')}>Back</button>
                <h2>Expense Overview</h2>
            </div>
            <div>
                <label>
                    Period:
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>
                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>
            <DataTable data={data} />
        </div>
    );
};

export default DataOverview;
