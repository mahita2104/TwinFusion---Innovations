import React, { useState } from "react";
import "./CaseStudy.css";
import PlotlyGraphs1 from "./PlotlyGraphs1.tsx";

const AndhraPradesh: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonLabel: string) => {
    setSelectedButton(buttonLabel);
  };

  return (
    <div className="energy-page">
      <h1 className="main-heading">Andhra Pradesh</h1>
      <div className="buttons horizontal-buttons">
        <button
          onClick={() => handleButtonClick("Graph1")}
          className={`graph-button ${
            selectedButton === "Graph1" ? "selected" : ""
          }`}
        >
          Graph1
        </button>
        <button
          onClick={() => handleButtonClick("Graph2")}
          className={`graph-button ${
            selectedButton === "Graph2" ? "selected" : ""
          }`}
        >
          Graph2
        </button>
        <button
          onClick={() => handleButtonClick("Graph3")}
          className={`graph-button ${
            selectedButton === "Graph3" ? "selected" : ""
          }`}
        >
          Graph3
        </button>
      </div>
      {selectedButton && <PlotlyGraphs1 buttonLabel={selectedButton} />}
    </div>
  );
};

export default AndhraPradesh;
