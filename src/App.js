import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HeaderSection from "./components/HeaderSection";
import AdminBannerUpload from "./pages/AdminBannerUpload";

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
          <Route path="/frames" element={<div></div>} />
          <Route path="/about" element={<div></div>} />
          <Route path="/contact" element={<div></div>} />
          {/* 🛠 Admin Routes */}
          <Route path="/admin/banner-upload" element={<AdminBannerUpload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
