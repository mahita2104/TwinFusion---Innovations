import { FaChartLine, FaCogs, FaMicrochip, FaGlobe } from "react-icons/fa"; // Import icons from Font Awesome or any other icon library
import "./Technology.css"; // Import the CSS file for styling
import backgroundImg from "./Digitaltwin.webp";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function Technology() {
  return (
    <div className="technology-page">
      <div className="hero">
        <h1>Cutting-edge Technology</h1>
      </div>

      <div className="tech-feature">
        <h2 className="tech-heading">Advanced Time Series Forecasting</h2>
        <div className="tech-icon-box">
          <FaChartLine className="tech-icon" />
        </div>
        <div className="feature-box">
          <p className="tech-description">
            Our cutting-edge algorithm excels at forecasting solar power
            generation for the upcoming 24 hours by leveraging rich historical
            data. With unparalleled precision and advanced modeling techniques,
            it intelligently extrapolates future solar energy production based
            on patterns and insights drawn from extensive historical data. This
            predictive mastery empowers you to proactively optimize energy
            utilization and enhance the efficiency of your solar assets,
            ensuring you make informed decisions and maximize your renewable
            energy potential.
          </p>
        </div>
      </div>

      <div className="tech-feature">
        <h2 className="tech-heading">Precision Anomaly Detection</h2>
        <div className="tech-icon-box">
          <FaCogs className="tech-icon" />
        </div>
        <div className="feature-box">
          <p className="tech-description">
            Our state-of-the-art anomaly detection system ensures the precision
            and reliability of your solar inverters. Using real-time monitoring
            and AI-driven fault diagnosis, we identify and rectify voltage,
            current, and temperature anomalies swiftly. This results in reduced
            downtime, enhanced asset reliability, and optimized energy
            generation, all contributing to your sustainable energy goals.
          </p>
        </div>
      </div>

      <div className="tech-feature">
        <h2 className="tech-heading">Efficient Hardware Integration</h2>
        <div className="tech-icon-box">
          <FaMicrochip className="tech-icon" />
        </div>
        <div className="feature-box">
          <p className="tech-description">
            Seamlessly integrate our technology with your solar infrastructure
            for enhanced performance and reliability. Our hardware integration
            solutions streamline operations and ensure the smooth functioning of
            your solar assets. With our efficient hardware integration, you can
            optimize energy production while maintaining the longevity of your
            equipment.
          </p>
        </div>
      </div>

      <div className="tech-feature">
        <h2 className="tech-heading">Global Scalability</h2>
        <div className="tech-icon-box">
          <FaGlobe className="tech-icon" />
        </div>
        <div className="feature-box">
          <p className="tech-description">
            Expand your solar operations worldwide with our scalable and
            adaptable solutions, supported by our partners at GlobalSolar
            Innovations. Our technology is designed to meet the demands of the
            global solar industry. Achieve international success with our global
            scalability, ensuring consistent performance and efficiency across
            diverse regions.
          </p>
        </div>
      </div>

      {/* Add similar code for other tech features here */}

      <h1 className="partners-title">Our Research Partners</h1>
      <p className="partners-description">
        These visionary organizations collaborate with us to drive innovation
        and excellence:
      </p>
      <div className="partner-grid">
        <div className="partner">
          <span className="partner-name">SolarTech Insights</span>
          <span className="partner-symbol">⚙️</span>
        </div>
        <div className="partner">
          <span className="partner-name">SunSolutions</span>
          <span className="partner-symbol">🌞</span>
        </div>
        <div className="partner">
          <span className="partner-name">EcoEnergia Labs</span>
          <span className="partner-symbol">🌿</span>
        </div>
        <div className="partner">
          <span className="partner-name">GlobalSolar Innovations</span>
          <span className="partner-symbol">🌐</span>
        </div>
      </div>
    </div>
  );
}

export default Technology;
