import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpense = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    // Use the useNavigate hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the expense data
        const expenseData = {
            category,
            amount,
            date,
            description
        };

        try {
            // Send a POST request to the Flask backend
            const response = await axios.post('http://localhost:5000/add-expense', expenseData);
            alert(response.data.message);
        } catch (error) {
            console.error('There was an error adding the expense:', error);
            alert('Failed to add the expense');
        }
    };

    return (
        <div>
            <div className="heading">
                <button onClick={() => navigate('/')}>Back</button>

                <h2>Expense Entry</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description (Optional):</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
