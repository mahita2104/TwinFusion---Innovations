import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to handle changes in email and password fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    // Check if both email and password are filled
    setIsFormValid(email !== "" && password !== "");
  };

  const handleLogin = () => {
    // Add your login logic here
    if (isFormValid) {
      // Only proceed with login if the form is valid
    } else {
      // Show an error message or alert indicating that both fields are required
      alert("Both email and password are required.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <Link to="/homepage">
            {" "}
            {/* Link to the homepage route */}
            <button
              type="button"
              onClick={handleLogin}
              className={`large-button ${isFormValid ? "" : "disabled"}`}
              disabled={!isFormValid}
            >
              Login
            </button>
          </Link>{" "}
          {/* Made the button larger */}
        </form>
        <p>
          Not registered? <Link to="/signup">Click here to sign up</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
