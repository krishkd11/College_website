import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Admission() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    percentage: "",
    department: "",
    interest: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name || form.name.length < 2) newErrors.name = "Name required (min 2 chars)";
    if (!form.qualification || form.qualification === "") newErrors.qualification = "Select qualification";
    if (!form.percentage || form.percentage < 0 || form.percentage > 100) newErrors.percentage = "Valid % (0-100) required";
    if (!form.department || form.department === "") newErrors.department = "Select department";
    if (!form.interest || form.interest === "") newErrors.interest = "Select interest";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSequentialID = () => {
    // Get last ID from localStorage or start from 95342310000
    const lastID = localStorage.getItem('lastAdmissionID');
    const baseID = lastID ? parseInt(lastID) + 1 : 95342310000;
    
    // Save new last ID
    localStorage.setItem('lastAdmissionID', baseID.toString());
    
    return `VVCE${baseID}`;
  };

  const submit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate admission process
      setTimeout(() => {
        // Generate sequential ID
        const admissionId = generateSequentialID();
        
        // Save admission data
        const admissionData = {
          ...form,
          admissionId: admissionId,
          status: "Applied Successfully ✅",
          date: new Date().toLocaleDateString('en-IN'),
          college: "V.V. College of Engineering, Tisaiyanvilai"
        };
        
        localStorage.setItem('admissionData', JSON.stringify(admissionData));
        localStorage.setItem('studentData', JSON.stringify(admissionData));
        
        // SUCCESS ALERT with sequential ID
        alert(`🎉 ADMISSION SUCCESSFUL!\n\n🆔 ID: ${admissionId}\n👤 Name: ${form.name}\n📚 Department: ${form.department}\n✅ Status: ${admissionData.status}\n📅 Date: ${admissionData.date}\n\nWelcome to VVCE Dashboard! 🚀\n*This page is one-time use for admission only please take screesshot for future use*`);
        
        // Navigate to college dashboard
        nav("/college");
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="form-header">
          <h2 className="title">🎓 VVCE New Admission 2026</h2>
          <p><strong>V.V. College of Engineering</strong><br/>Tisaiyanvilai, Tirunelveli Dist.</p>
        </div>

        <div className="field">
          <label>Full Name *</label>
          <input 
            placeholder="Enter your full name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label>Qualification *</label>
          <select
            value={form.qualification}
            onChange={e => setForm({...form, qualification: e.target.value})}
          >
            <option value="">Select Qualification</option>
            <option value="12th">12th / HSC</option>
            <option value="Diploma">Diploma</option>
            <option value="BSc">B.Sc</option>
            <option value="Other">Other</option>
          </select>
          {errors.qualification && <span className="error">{errors.qualification}</span>}
        </div>

        <div className="field">
          <label>Percentage/Grade * (%)</label>
          <input 
            type="number"
            placeholder="85.5"
            min="0"
            max="100"
            value={form.percentage}
            onChange={e => setForm({...form, percentage: e.target.value})}
          />
          {errors.percentage && <span className="error">{errors.percentage}</span>}
        </div>

        <div className="field">
          <label>Preferred Department *</label>
          <select
            value={form.department}
            onChange={e => setForm({...form, department: e.target.value})}
          >
            <option value="">Choose Department</option>
            <option value="CSE">💻 Computer Science (CSE)</option>
            <option value="IT">🤖 AI / Artificial Intelligence (AI)</option>
            <option value="ECE">📡 Electronics & Communication (ECE)</option>
            <option value="EEE">⚡ Electrical & Electronics (EEE)</option>
            <option value="MECH">🔧 Mechanical Engineering</option>
            <option value="CIVIL">🏗️ Civil Engineering</option>
          </select>
          {errors.department && <span className="error">{errors.department}</span>}
        </div>

        <div className="field">
          <label>Interest Area *</label>
          <select
            value={form.interest}
            onChange={e => setForm({...form, interest: e.target.value})}
          >
            <option value="">What interests you?</option>
            <option value="AI/ML">🤖 AI & Machine Learning</option>
            <option value="WebDev">🌐 Web Development</option>
            <option value="AppDev">📱 Mobile App Development</option>
            <option value="CyberSec">🔒 Cybersecurity</option>
            <option value="DataScience">📊 Data Science</option>
            <option value="Cloud">☁️ Cloud Computing</option>
            <option value="ps">🔌 Power Systems</option>
            <option value="EM">⚡ Electrical Machines</option>
            <option value="PE">🔋 Power Electronics</option>
            <option value="Rs">🏭 Renewable Energy Systems</option>
            <option value="pp">🐍 Python Programming</option>
            <option value="ml">💻 MATLAB</option>
            <option value="ar">🔧 Arduino / Raspberry Pi</option>
            <option value="da">📊 Data Analysis</option>
            <option value="sim">🧪 Simulation Tools</option>
            <option value="ice">🚗 IC Engines</option>
            <option value="mt">🏭 Manufacturing Technology</option>
            <option value="engd">📐 Engineering Drawing</option>
            <option value="ac">🖥️ AutoCAD</option>
            <option value="sw">🧊 SolidWorks</option>
            <option value="ca">🏗️ CATIA</option>
            <option value="anys">📊 ANSYS</option>
            <option value="cncp">🖨️ CNC Programming</option>
          </select>
          {errors.interest && <span className="error">{errors.interest}</span>}
        </div>

        <button 
          className="login-btn primary" 
          onClick={submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "🎯 Processing Admission..." : "🚀 Apply Now (ID starts from 95342310000)"}
        </button>

        <div className="form-footer">
          <button 
            className="back-btn" 
            onClick={() => nav("/")}
            disabled={isSubmitting}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
