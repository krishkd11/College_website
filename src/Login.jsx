import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    reg: "",
    dept: "",
    year: "",
    gmail: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.reg || form.reg.toString().length < 12) newErrors.reg = "Valid Reg No required";
    if (!form.gmail || !form.gmail.includes("@gmail.com")) newErrors.gmail = "Valid Gmail required";
    if (!form.phone || form.phone.length < 10) newErrors.phone = "Valid Phone required";
    if (!form.dept) newErrors.dept = "Select Department";
    if (!form.year) newErrors.year = "Select Year";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (validateForm()) {
      nav("/home");
    } else {
      alert("Please fix the errors above");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="title">Student Login</h2>

        <div className="field">
          <label>Full Name</label>
          <input 
            placeholder="Enter your name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>

        <div className="field">
          <label>Register Number</label>
          <input 
            type="number"
            placeholder="Reg No"
            value={form.reg}
            onChange={e => setForm({...form, reg: e.target.value})}
          />
          {errors.reg && <span className="error">{errors.reg}</span>}
        </div>

        <div className="field">
          <label>Department</label>
          <select
            value={form.dept}
            onChange={e => setForm({ ...form, dept: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          {errors.dept && <span className="error">{errors.dept}</span>}
        </div>

        <div className="field">
          <label>Year</label>
          <select
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {errors.year && <span className="error">{errors.year}</span>}
        </div>

        <div className="field">
          <label>Gmail</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={form.gmail}
            onChange={e => setForm({...form, gmail: e.target.value})}
          />
          {errors.gmail && <span className="error">{errors.gmail}</span>}
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="1234567890"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <button className="login-btn" onClick={submit}>
          Submit & Login
        </button>
      </div>
    </div>
  );
}
