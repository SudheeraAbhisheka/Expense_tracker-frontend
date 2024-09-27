// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExpense from "./AddExpense.jsx";
import Home from "./Home.jsx";
import DataOverview from "./DataOverview.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/expense-overview" element={<DataOverview />} />
            </Routes>
        </Router>
    );
}

export default App;
