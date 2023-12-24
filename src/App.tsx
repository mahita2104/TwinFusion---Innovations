import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Updated imports

import Navbar from "./Components/Navbar";
import AboutUs from "./Pages/AboutUs";
import Technology from "./Pages/Technology";
import Feedback from "./Pages/Feedback";
import CaseStudy from "./Pages/CaseStudy";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Footer from "./Components/Footer"; // Import the Footer component
import "./App.css"; // Correctly import the CSS file
import Simulator from "./Pages/Simulator";
import AndhraPradesh from "./Pages/AndhraPradesh";
import Maharashtra from "./Pages/Maharashtra";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Use Routes instead of Switch */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/CaseStudy" element={<CaseStudy />} />{" "}
          {/* Correct path */}
          <Route path="/Simulator" element={<Simulator />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AndhraPradesh" element={<AndhraPradesh />} />
          <Route path="/Maharashtra" element={<Maharashtra />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/homepage" element={<HomePage />} />
          {/* Include HomePage route */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Default route */}
          {/* Add more routes for other pages */}
        </Routes>

        {/* Include the Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
