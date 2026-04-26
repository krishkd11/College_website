// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showCampusTourModal, setShowCampusTourModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [username, setUsername] = useState("");
  const [regNumber, setRegNumber] = useState("");

  useEffect(() => {
    const data = localStorage.getItem('studentData');
    if (data) {
      const parsedData = JSON.parse(data);
      setStudentData(parsedData);
      setUsername(parsedData.name || "");
      setRegNumber(parsedData.reg || "");
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyNow = () => navigate("/exam-registration");
  const handleLogout = () => {
    localStorage.removeItem('studentData');
    localStorage.removeItem('mycamuCredentials');
    setStudentData(null);
    navigate("/");
  };
  const handleCampusTourClick = () => setShowCampusTourModal(true);
  const closeModal = () => setShowCampusTourModal(false);

  const handleMyCamuClick = async () => {
    const email = username.toLowerCase().replace(/\s+/g, '') + '@vvce.ac.in';
    const password = regNumber;
    const myCamuUrl = "https://www.mycamu.co.in/#/";    
    localStorage.setItem('mycamuCredentials', JSON.stringify({email, password}));
    window.open(myCamuUrl, '_blank');
  };

  const handleDownloadProspectus = () => {
    setIsDownloading(true);
    window.open("https://vvce.ac.in/wp-content/uploads/2023/07/Prospectus-2023.pdf", "_blank");
    setTimeout(() => {
      setIsDownloading(false);
      alert("📚 Prospectus downloaded!");
    }, 1000);
  };

  return (
    <>
      <div className="home-wrapper">
        <div className="vvcoe-bg-clear">
          <div className="campus-image vvcoe-img"></div>
          <div className="campus-image vv-img"></div>
          <div className="campus-image mal-img"></div>
          <div className="campus-image hall-img"></div>
          <div className="campus-image library-img"></div>
          <div className="bg-overlay-light"></div>
        </div>

        <div className="container">
          {studentData && (
            <div className="welcome-card">
              <h2>👋 Welcome back, {studentData.name}!</h2>
              <div className="student-info">
                <p>🆔 Reg No: <strong>{studentData.reg}</strong></p>
                <p>📧 MyCamu: <strong>{username.toLowerCase().replace(/\s+/g, '')}@vvce.ac.in</strong></p>
              </div>
            </div>
          )}

          <div className="hero-section">
            <div className="hero-content">
              <h2>🎓 VVCOE Student Portal</h2>
              <p>Exam Registration • MyCamu • Campus Tour • Prospectus</p>
            </div>
            <div className="hero-actions">
              <button className="cta-btn primary exam-reg-btn" onClick={handleApplyNow}>
                📝 Exam Registration 2026
              </button>
              <button className="cta-btn secondary" onClick={handleCampusTourClick}>🏫 Campus Tour</button>
              <button className="cta-btn secondary download-btn" onClick={handleDownloadProspectus} disabled={isDownloading}>
                {isDownloading ? "📥 Downloading..." : "📚 Prospectus"}
              </button>
              <button className="cta-btn mycamu-btn large" onClick={handleMyCamuClick}>🔐 MyCamu Login</button>
            </div>
          </div>
          <div className="logout-section">
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </div>

      {showCampusTourModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="campus-tour-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>🏫 Campus Tour</h2>
            <form className="tour-form">
              <input type="text" placeholder="Full Name *" required />
              <input type="tel" placeholder="Phone *" required />
              <input type="email" placeholder="Email *" required />
              <button type="submit" className="submit-tour">Book Tour</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
