// DataOverview.jsx
import React, { useState, useEffect } from 'react';
import DataTable from './DataTable.jsx';
import axios from 'axios';

const DataOverview = () => {
    const [data, setData] = useState({});
    const [period, setPeriod] = useState('daily');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-expenses', {
                    params: { period, category },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, [period, category]);

    return (
        <div>
            <h1>Expense Report</h1>
            <div>
                <label>
                    Period:
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
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
