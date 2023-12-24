import { useState } from "react";
import "./CaseStudy.css"; // Make sure this path is correct

const CaseStudy: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const contentData = [
    {
      subsectionTitle: "Introduction",
      content: [
        "Our model was trained using a comprehensive dataset encompassing a wide array of critical parameters related to power generation and its associated components. This dataset spans over a period of 34 days, providing rich insights into the performance of various components within the power generation system",
      ],
    },
    {
      subsectionTitle: "Key Attributes",
      content: [
        "Daily and Total Yield of Power: Daily yield data allows us to track the system's performance on a daily basis, while total yield data provides cumulative insights into long-term power generation trends",

        "Ambient Temperature: The ambient temperature is a crucial environmental factor that can significantly influence power generation efficiency. Monitoring this parameter aids in understanding the system's response to varying weather conditions",

        "Module Temperature: The module temperature reflects the temperature of the solar panels or modules, which is another pivotal factor affecting energy generation. This data helps assess the impact of temperature variations on system performance",

        "Inverter ID: Each inverter plays a vital role in converting DC power to AC power. Tracking inverter-specific data enables us to identify potential issues and optimize inverter performance",

        "Our primary objective in utilizing this dataset is to perform in-depth analysis and generate valuable observations. By delving deeply into the components' behavior and relationships, we aim to offer actionable insights and assistance to our users",

        "This dataset serves as the foundation for our analytical efforts, allowing us to identify trends, anomalies, and optimization opportunities. Our ultimate goal is to empower users with the knowledge and tools necessary to enhance the efficiency, sustainability, and overall performance of their power generation systems",

        "As we continue to explore this data, we remain committed to delivering actionable insights and solutions that drive progress in the field of power project management. Welcome to a future where data-driven decision-making unlocks the full potential of power generation systems",
      ],
    },
  ];

  const handleButtonClick = (buttonLabel: string) => {
    setSelectedButton(buttonLabel);
  };

  return (
    <div className="energy-page">
      <h1 className="main-heading">Case Study</h1>
      {contentData.map((section, index) => (
        <div key={index} className="section">
          {section.subsectionTitle && (
            <h2 className="subsection-title">{section.subsectionTitle}</h2>
          )}
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex}>{paragraph}</p>
          ))}
        </div>
      ))}
      <div className="buttons">
        <button
          onClick={() => (window.location.href = "/AndhraPradesh")} // Replace with the correct URL for Andhra Pradesh
          className={`graph-button ${
            selectedButton === "Andhra Pradesh" ? "selected" : ""
          }`}
        >
          Andhra Pradesh
        </button>
        <button
          onClick={() => (window.location.href = "/Maharashtra")} // Replace with the correct URL for Maharashtra
          className={`graph-button ${
            selectedButton === "Maharashtra" ? "selected" : ""
          }`}
        >
          Maharashtra
        </button>
      </div>
    </div>
  );
};

export default CaseStudy;
