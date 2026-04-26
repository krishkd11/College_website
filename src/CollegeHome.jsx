// src/components/CollegeHome.jsx
import { useNavigate } from "react-router-dom";
import "./admissions.css";

export default function CollegeHome() {
  const navigate = useNavigate();

  return (
    <div className="college-home">
      <header className="navbar">
        <div className="nav-brand">🏫 VVCOE</div>
        <nav><ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#departments">Departments</a></li>
          <li><a href="#placements">Placements</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul></nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>V.V. College of Engineering</h1>
          <p className="hero-subtitle">Tirunelveli | Anna University | AICTE Approved</p>
          <p>Excellence in Technical Education Since 2010</p>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">📖 About VVCOE</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>V.V. College of Engineering, established in 2010 by VVM Educational Trust, is a premier engineering institution committed to technical excellence.</p>
              <div className="features-list">
                <div className="feature">✅ 5000+ Students</div>
                <div className="feature">✅ 250+ Faculty</div>
                <div className="feature">✅ 95% Placement</div>
                <div className="feature">✅ NBA Accredited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="floating-buttons">
        <button className="floating-btn events-btn" onClick={() => navigate("/events")}>🎪 Events</button>
        <button className="floating-btn old-site-btn" 
                onClick={() => window.open("https://www.google.com/search?q=vv+college+of+enginnering+thisaiyanvilai", "_blank")}>
          🏛️ Old Website
        </button>
      </div>
    </div>
  );
}
