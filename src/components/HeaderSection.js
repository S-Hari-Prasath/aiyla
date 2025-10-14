// src/components/HeaderSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../styles/HeaderSection.css";

// Small category card (2 columns)
const CategoryCard = ({ category, onClick }) => (
  <div className="category-card" onClick={() => onClick(category.id)}>
    <div className="category-image-wrap">
      <img src={category.imageUrl} alt={category.name} loading="lazy" />
    </div>
    <div className="category-name">{category.name}</div>
  </div>
);

const HeaderSection = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Fetch banners and categories from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannersQ = query(collection(db, "banners"), orderBy("order", "asc"));
        const catQ = query(collection(db, "categories"), orderBy("name", "asc"));

        const [bSnap, cSnap] = await Promise.all([getDocs(bannersQ), getDocs(catQ)]);

        const bData = bSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const cData = cSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setBanners(bData);
        setCategories(cData);
      } catch (err) {
        console.error("Error fetching header data:", err);
      }
    };

    fetchData();
  }, []);

  // Rotate banners every 5 seconds
  useEffect(() => {
    if (!banners || banners.length === 0) return;
    // clear old
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [banners]);

  const handleBannerClick = banner => {
    if (banner?.targetCategoryId) {
      navigate(`/category/${banner.targetCategoryId}`);
    }
  };

  const handleCategoryClick = catId => {
    navigate(`/category/${catId}`);
  };

  return (
    <header className="header-section">
      <div className="banner-area">
        {banners.length > 0 ? (
          banners.map((b, i) => (
            <div
              key={b.id}
              className={`banner-item ${i === activeIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${b.imageUrl})` }}
              role="button"
              onClick={() => handleBannerClick(b)}
            >
              <div className="banner-overlay">
                <h2 className="banner-title">{b.title}</h2>
                <button
                  className="banner-cta"
                  onClick={e => {
                    e.stopPropagation();
                    handleBannerClick(b);
                  }}
                >
                  Shop {b.title}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="banner-placeholder">No offers right now</div>
        )}

        {/* small pager */}
        {banners.length > 1 && (
          <div className="banner-pager">
            {banners.map((_, idx) => (
              <button
                key={idx}
                className={`pager-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show banner ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="categories-grid">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} onClick={handleCategoryClick} />
        ))}
      </div>
    </header>
  );
};

export default HeaderSection;
