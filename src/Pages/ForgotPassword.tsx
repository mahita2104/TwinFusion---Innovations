// ForgotPassword.tsx
import { useState } from "react";
import "./ForgotPassword.css"; // Import the CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    // Implement password reset logic here
    // You can send a reset link to the provided email address
    // and display a confirmation message
    setMessage("Password reset link sent to your email address.");
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
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
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </form>
      <p className="reset-message">{message}</p>
    </div>
  );
};

export default ForgotPassword;
