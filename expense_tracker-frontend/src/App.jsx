// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Register from './Register';
import Login from './Login';
import DataOverview from './DataOverview';
import Home from './Home';
import AddExpense from './AddExpense';

function App() {
    const { token, handleLogout } = useContext(AuthContext);

    return (
        <Router>
            <div>
                <nav>
                    {!token ? (
                        <>
                            <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/expense-overview">Data Overview</Link> | <Link to="/home">Home</Link> | <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>

                <Routes>
                    <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
                    <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
                    <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />

                    {/* Protected Routes */}
                    <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                    <Route path="/add-expense" element={<RequireAuth><AddExpense /></RequireAuth>} />
                    <Route path="/expense-overview" element={<RequireAuth><DataOverview /></RequireAuth>} />

                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// Component to protect routes
function RequireAuth({ children }) {
    const { token } = useContext(AuthContext);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // New
}
