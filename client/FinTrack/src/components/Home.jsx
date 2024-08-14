import "./home.css";


const Home = () => {
    return (
        <section>
            <h1 className="tittle">FinTrack</h1>
            <div className="cards-container">
                <div className="card">
                    <h2>Expenses</h2>
                    <p>Track and manage your daily expenses effortlessly.</p>
                </div>
                <div className="card">
                    <h2>Budgets</h2>
                    <p>Create and monitor your budgets to stay on top of your finances.</p>
                </div>
                <div className="card">
                    <h2>Insights</h2>
                    <p>Gain insights into your spending patterns with visual data.</p>
                </div>
            </div>
        </section>
    );
};

export default Home;
