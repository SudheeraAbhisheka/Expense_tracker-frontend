import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); // Declare navigate

    return (
        <div>
            <div>
                <button onClick={() => navigate('/add-expense')}>Add data</button>
            </div>
            <div>
                <button onClick={() => navigate('/expense-overview')}>Overview</button>
            </div>
        </div>

    );
}

export default Home;
