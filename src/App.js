import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import  HeaderSection from "./components/HeaderSection";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/header-section" element={<HeaderSection />} />
          <Route path="/gifts" element={<div></div>} />
          <Route path="/flowers" element={<div></div>} />
          <Route path="/cakes" element={<div></div>} />
          <Route path="/about" element={<div></div>} />
          <Route path="/contact" element={<div></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
