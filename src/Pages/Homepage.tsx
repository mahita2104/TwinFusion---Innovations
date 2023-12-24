import "./Homepage.css"; // Import the CSS file for styling
import backgroundImg from "./Digitaltwin.webp"; // Update the import path for your background image

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function Homepage() {
  return (
    <div className="homepage" style={backgroundStyle}>
      <div className="hero">
        <h1>Welcome to TwinFusion Innovations</h1>
        <p>
          Empowering Solar Efficiency with Intelligent Forecasting and Anomaly
          Detection
        </p>
        <button className="cta-button">Learn More</button>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Advanced Technology</h2>
          <p>Explore our cutting-edge solutions.</p>
        </div>
        <div className="feature">
          <h2>Innovation</h2>
          <p>We're committed to pushing boundaries.</p>
        </div>
        <div className="feature">
          <h2>Sustainability</h2>
          <p>Join us in making a greener world.</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
