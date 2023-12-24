import { useState } from "react";
import { Link } from "react-router-dom"; // Import the CSS file for styling

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // You can add your user registration logic here, such as sending a request to your server.
    // If registration is successful, redirect to the homepage.
    // Example:
    // if (registrationSuccessful) {
    //   // Redirect to the homepage
    //   window.location.href = "/homepage";
    // }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/homepage">
            {/* Link to the homepage route */}
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          </Link>
        </form>
        <p>
          Already have an account? <Link to="/login">Click here to login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
