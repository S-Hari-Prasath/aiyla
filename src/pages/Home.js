// src/pages/Home.jsx
import React from "react";
import HeaderSection from "../components/HeaderSection";
 
const Home = () => {
  return (
    <main className="home-container">
      {/* Header with rotating banners & category grid */}
      <HeaderSection />

      {/* future sections: featured products, testimonials, footer etc. */}
      <section className="placeholder-section">
        {/* Add more sections below as required */}
      </section>
    </main>
  );
};

export default Home;
