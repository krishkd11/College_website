// ExamRegistrationForm.jsx - COMPLETE + FIXED (All Bugs Resolved)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./exam-registration.css";

export default function ExamRegistrationForm() {
  const navigate = useNavigate();
  
  // Fixed: Added ALL missing fields to initial state
  const [formData, setFormData] = useState({
    regNumber: "",
    semester: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
    dob: "",
    examDate: "",  
    semesterFee: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change - unchanged, works fine
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Fixed: Complete validation for ALL fields
  const validateForm = () => {
    const newErrors = {};

    // Reg number: Anna Univ 12-digit format
    if (!formData.regNumber) newErrors.regNumber = "Registration number required";
    else if (!/^\d{12}$/.test(formData.regNumber)) newErrors.regNumber = "Enter valid 12-digit Reg No (eg: 912322460001)";

    if (!formData.semester) newErrors.semester = "Semester required";

    if (!formData.subject1) newErrors.subject1 = "At least 1 subject required";

    // DOB validation
    if (!formData.dob) newErrors.dob = "Date of birth required";
    else if (new Date(formData.dob) > new Date()) newErrors.dob = "DOB cannot be future date";

    // Exam date validation
    if (!formData.examDate) newErrors.examDate = "Exam start date required";
    else if (new Date(formData.examDate) < new Date()) newErrors.examDate = "Exam date must be future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit - unchanged logic, now works with fixed state
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("⚠️ Please fill required fields!");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Save to localStorage
      localStorage.setItem('examRegistration', JSON.stringify({
        ...formData,
        status: "SUCCESS",
        timestamp: new Date().toISOString()
      }));
      
      alert("✅ Exam Registration Successful!\n\nDetails saved. Print receipt below.");
    }, 2000);
  };

  const handleBack = () => {
    navigate("/");
  };

  if (isSubmitted) {
    // Fixed: Use actual formData values, not hardcoded or missing
    const subjects = [formData.subject1, formData.subject2, formData.subject3, formData.subject4, formData.subject5]
      .filter(s => s.trim()).join(", ") || "No subjects added";

    return (
      <div className="success-wrapper">
        <div className="success-container">
          <div className="success-tick">✅</div>
          <h1>Exam Registration Successful!</h1>
          <div className="receipt">
            <h3>📄 Exam Registration Receipt</h3>
            <div className="receipt-details">
              <p><strong>Reg No:</strong> {formData.regNumber}</p>
              <p><strong>Semester:</strong> {formData.semester}</p>
              <p><strong>Subjects:</strong> {subjects}</p>
              <p><strong>Exam Date:</strong> {new Date(formData.examDate).toLocaleDateString()}</p>
              <p><strong>DOB:</strong> {new Date(formData.dob).toLocaleDateString()}</p>
              <p><strong>Fee:</strong> ₹{formData.semesterFee || "2000"}</p>
            </div>
            <button className="print-btn" onClick={() => window.print()}>
              🖨️ Print Receipt
            </button>
          </div>
          <div className="success-actions">
            <button className="btn-primary" onClick={handleBack}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-reg-wrapper">
      <div className="exam-reg-container">
        {/* Header */}
        <div className="exam-header">
          <button className="back-btn" onClick={handleBack}>← Back</button>
          <h1>📝 Exam Registration 2026</h1>
          <p>Fill details to register for exams</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="exam-form">
          <div className="form-row">
            <div className="form-group">
              <label>🆔 Registration Number *</label>
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleInputChange}
                placeholder="Enter 12-digit Reg No (eg: 953422460001)"
                maxLength="12"
              />
              {errors.regNumber && <span className="error">{errors.regNumber}</span>}
            </div>

            <div className="form-group">
              <label>📚 Semester *</label>
              <select name="semester" value={formData.semester} onChange={handleInputChange}>
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
              {errors.semester && <span className="error">{errors.semester}</span>}
            </div>
          </div>

          {/* Subjects - Added subject5, fixed grid */}
          <div className="subjects-section">
            <h3>📖 Subjects to Register</h3>
            <div className="subject-grid">
              <div className="form-group">
                <label>Subject 1 *</label>
                <input
                  type="text"
                  name="subject1"
                  value={formData.subject1}
                  onChange={handleInputChange}
                  placeholder="eg: Data Structures"
                />
                {errors.subject1 && <span className="error">{errors.subject1}</span>}
              </div>
              
              <div className="form-group">
                <label>Subject 2</label>
                <input
                  type="text"
                  name="subject2"
                  value={formData.subject2}
                  onChange={handleInputChange}
                  placeholder="eg: Database Management"
                />
              </div>
              
              <div className="form-group">
                <label>Subject 3</label>
                <input
                  type="text"
                  name="subject3"
                  value={formData.subject3}
                  onChange={handleInputChange}
                  placeholder="eg: Operating Systems"
                />
              </div>
              
              <div className="form-group">
                <label>Subject 4</label>
                <input
                  type="text"
                  name="subject4"
                  value={formData.subject4}
                  onChange={handleInputChange}
                  placeholder="eg: Computer Networks"
                />
              </div>

              <div className="form-group">
                <label>Subject 5</label>
                <input
                  type="text"
                  name="subject5"
                  value={formData.subject5}
                  onChange={handleInputChange}
                  placeholder="eg: Software Engineering"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>📅 Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>

            <div className="form-group">
              <label>📅 Exam Start Date *</label>
              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleInputChange}
              />
              {errors.examDate && <span className="error">{errors.examDate}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>💰 Semester Fee</label>
              <input
                type="number"
                name="semesterFee"
                value={formData.semesterFee}
                onChange={handleInputChange}
                placeholder="eg: 2000"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-exam-btn"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Registering..." : "✅ Register for Exams"}
          </button>
        </form>

        <div className="exam-info">
          <h4>ℹ️ Instructions:</h4>
          <ul>
            <li>Enter valid 12-digit registration number (VVCOE format)</li>
            <li>Select correct semester</li>
            <li>Add minimum 1 subject (Subject 1 mandatory)</li>
            <li>Exam fee will be collected during exam week</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
