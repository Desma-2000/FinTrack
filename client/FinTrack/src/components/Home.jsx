import "./home.css";

const Home = () => {
    return (
        <div className="full-height-container">
            <div className="tittle">
                <h1>FinTrack</h1>
                <p>Your trusted financial companion</p>
            </div>
            <div className="cards-container">
                <div className="card">
                    <h2> Track Expenses</h2>
                    <p>Track and manage your daily expenses effortlessly.</p>
                </div>
                <div className="card">
                    <h2> Manage Budgets</h2>
                    <p>Create and monitor your budgets to stay on top of your finances.</p>
                </div>
                <div className="card">
                    <h2> Get financial Insights</h2>
                    <p>Gain insights into your spending patterns with visual data.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
