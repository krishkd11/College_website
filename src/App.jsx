import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup"; 
import Admissions from "./Admissions";
import Home from "./Home"; 
import CollegeHome from "./collegeWebsite";

// ROMBA MUKKIYAM: Intha import line-ai check pannunga
import ExamRegistrationForm from "./ExamRegistrationForm"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/college" element={<CollegeHome />} />
        
        {/* Ippo ithu work aagum */}
        <Route path="/exam-registration" element={<ExamRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;