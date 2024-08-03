import React from "react";
import Navbar from "./Navbar";

const Home = () => {
    console.log("Home component rendered");
    return (
      <>
      <Navbar />
        <section className="hero">
          <div className="homepage">
            <h1>Welcome to FinTrack</h1>
            <p> Manage your money smarter and achieve your financial goals effortlessly.</p>
          </div>
        </section>
      </>
    );
  };
  
  export default Home;
  
