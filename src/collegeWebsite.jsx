import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./college-website.css";

const CollegeWebsite = ({ onBack }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "📖" },
    { id: "departments", label: "Departments", icon: "🏛️" },
    { id: "placement", label: "Placement", icon: "💼" },
    { id: "contact", label: "Contact", icon: "📞" }
  ];

  // Social Media Links Config
  const socialLinks = [
    {
      icon: "🗺️",
      title: "Google Maps",
      url: "https://www.google.com/maps/place/V+V+College+of+Engineering/@8.3556254,77.8738753,22927m/data=!3m1!1e3!4m7!3m6!1s0x3b047ec0ad35dc71:0xa26573a4075d0cb2!4b1!8m2!3d8.367195!4d77.860868!16s%2Fg%2F1tmqk6df"
    },
    {
      icon: "📱",
      title: "Instagram", 
      url: "https://www.instagram.com/vvcoeofficial/"
    },
    {
      icon: "📺",
      title: "YouTube",
      url: "https://www.youtube.com/@vvcoeofficial/videos"
    },
    {
      icon: "📘",
      title: "Facebook",
      url: "https://www.facebook.com/vvcoeofficial"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      url: "https://in.linkedin.com/school/v.v.college-of-engineering/"
    }
  ];

  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="home-content">
            <div className="hero-section">
              <h1>Welcome to V.V. College of Engineering</h1>
              <p>Tisaiyanvilai, Tirunelveli District | Affiliated to Anna University</p>
              <div className="stats">
                <div className="stat">📚 6 Departments</div>
                <div className="stat">🎓 800+ Students</div>
                <div className="stat">💼 95% Placement</div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="about-content">
            <h2>About VVCOE</h2>
            <div className="about-grid">
              <div className="about-card">
                <h3>🏛️ Established</h3>
                <p>2010 - Approved by AICTE, Affiliated to Anna University</p>
              </div>
              <div className="about-card">
                <h3>📍 Location</h3>
                <p>Tisaiyanvilai, Tirunelveli District, Tamil Nadu - 627 817</p>
              </div>
              <div className="about-card">
                <h3>🎯 Vision</h3>
                <p>Excellence in Engineering Education & Research</p>
              </div>
              <div className="about-card">
                <h3>🏆 Achievements</h3>
                <p>NAAC Accredited | ISO Certified | NIRF Ranked</p>
              </div>
            </div>
          </div>
        );

      case "departments":
        return (
          <div className="departments-content">
            <h2>Our Departments</h2>
            <div className="dept-grid">
              <DeptCard name="CSE" title="Computer Science & Engineering" intake="90" desc="AI, ML, Data Science, Software Engineering" image="💻" />
              <DeptCard name="ECE" title="Electronics & Communication" intake="60" desc="Embedded Systems, VLSI, IoT, Signal Processing" image="📡" />
              <DeptCard name="EEE" title="Electrical & Electronics Engineering" intake="60" desc="Power Systems, Renewable Energy, Control Systems" image="⚡" />
              <DeptCard name="MECH" title="Mechanical Engineering" intake="30" desc="CAD/CAM, Robotics, Thermal Engineering, Automobile" image="🔧" />
              <DeptCard name="CIVIL" title="Civil Engineering" intake="30" desc="Structural Engineering, Construction Management" image="🏗️" />
            </div>
          </div>
        );

      case "placement":
        return (
          <div className="placement-content">
            <h2>Placement Highlights 2025</h2>
            <div className="placement-stats">
              <div className="stat-card">
                <h3>95%</h3>
                <p>Placement Rate</p>
              </div>
              <div className="stat-card">
                <h3>₹6.5 LPA</h3>
                <p>Highest Package</p>
              </div>
              <div className="stat-card">
                <h3>1500+</h3>
                <p>Companies Visited</p>
              </div>
            </div>
            <div className="companies">
              <h3>Top Recruiters:</h3>
              <div className="company-logos">
                <span>TCS</span><span>Infosys</span><span>Wipro</span>
                <span>Cognizant</span><span>Zoho</span><span>Hexaware</span>
                <span>Capgemini</span><span>HCL</span>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="contact-content">
            <h2>Contact Information</h2>
            <div className="contact-grid">
              {/* Basic Contact Info */}
              <ContactCard icon="📧" title="Email" details="principal@vvcoe.org | vvcoeplacement@gmail.com" />
              <ContactCard icon="📞" title="Phone" details="+91 94433 12345 | +91 94422 67890" />
              <ContactCard icon="📍" title="Address" details="NH-7A, Tiruchendur Road, Tisaiyanvilai, Tirunelveli - 627817" />
              
              {/* CLICKABLE SOCIAL MEDIA ICONS */}
              <div className="social-section">
                <h3>🌐 Follow Us</h3>
                <div className="social-icons-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-box"
                      title={social.title}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-title">{social.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="college-website-wrapper">
      <header className="college-header">
        <div className="header-left">
          <h1>🌟 Welcome VVCOE</h1>
        </div>
        <nav className="nav-bar">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button className="close-btn" onClick={onBack}>
          ✕ Close
        </button>
      </header>

      <main className="college-main">
        {renderPageContent()}
      </main>
    </div>
  );
};

// Department Card Component
const DeptCard = ({ name, title, intake, desc, image }) => (
  <div className="dept-card">
    <div className="dept-icon">{image}</div>
    <h3>{title}</h3>
    <p className="intake">Intake: {intake}</p>
    <p>{desc}</p>
  </div>
);

// Basic Contact Card Component
const ContactCard = ({ icon, title, details }) => (
  <div className="contact-card">
    <div className="contact-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{details}</p>
  </div>
);

export default CollegeWebsite;
