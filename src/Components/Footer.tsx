import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa"; // Import social media icons
import "./Footer.css"; // Import the CSS file for styling

function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const handleSubscribe = () => {
    // Check if the email is empty
    if (!email) {
      setIsEmailEmpty(true);
      return;
    }

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      return;
    }

    // Perform subscription logic here
    // For this example, we'll simulate a success message by setting isSubscribed to true.
    setIsEmailEmpty(false);
    setIsEmailValid(true);
    setIsSubscribed(true);

    // Clear the email input after a successful subscription
    setEmail("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Reset validation when the email input changes
    setIsEmailEmpty(false); // Reset the email empty error
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="subscribe-connect">
          <div className="subscribe-section">
            <h3>Subscribe Us</h3>
            <p>We wouldn't dream of spamming you or selling your info.</p>
            {isSubscribed ? (
              <p className="success-message">Thank you for subscribing!</p>
            ) : (
              <>
                <div className="subscribe-box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`subscribe-input ${!isEmailValid && "invalid"} ${
                      isEmailEmpty ? "empty" : ""
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button
                    className="subscribe-button"
                    onClick={handleSubscribe}
                    // Disable the button if email is empty or invalid
                    disabled={!email || !isEmailValid}
                  >
                    <FaEnvelope className="subscribe-icon" />
                  </button>
                </div>
                {!isEmailValid && !isEmailEmpty && (
                  <p className="invalid-email">Invalid email format</p>
                )}
                {isEmailEmpty && (
                  <p className="empty-email">Please enter your email</p>
                )}
              </>
            )}
          </div>
          <div className="connect-with-us">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#">
                <FaFacebook className="social-icon orange" />
              </a>
              <a href="#">
                <FaTwitter className="social-icon orange" />
              </a>
              <a href="#">
                <FaLinkedin className="social-icon orange" />
              </a>
              <a href="#">
                <FaYoutube className="social-icon orange" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&#169; 2023 TwinFusion Innovations. All rights reserved. Privacy</p>
      </div>
    </footer>
  );
}

export default Footer;
