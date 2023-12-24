import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./PlotlyGraphs.css"; // Import the CSS file

interface PlotlyGraphsProps {
  buttonLabel: string;
}

const PlotlyGraphs1: React.FC<PlotlyGraphsProps> = ({ buttonLabel }) => {
  const [graphData, setGraphData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let dataFilePath = "";

        // Determine the data file path based on the buttonLabel
        if (buttonLabel === "Graph1") {
          dataFilePath = "./graph_plant2_prophet24hr.json"; // Update with the actual file path for Graph1
        } else if (buttonLabel === "Graph2") {
          dataFilePath = "./graph_plant2_prophetvs actual.json"; // Update with the actual file path for Graph2
        } else if (buttonLabel === "Graph3") {
          dataFilePath = "./graph2_plant2_timestampac.json"; // Update with the actual file path for Graph3
        }

        // Fetch the data file using dynamic import
        const response = await import(dataFilePath);

        // Assuming the data structure in your JSON files includes data and layout properties
        setGraphData(response);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    }

    fetchData();
  }, [buttonLabel]);

  return (
    <div className="plotly-graphs">
      {graphData ? (
        <div className="graph">
          <Plot
            data={graphData.data}
            layout={graphData.layout}
            style={{ width: "100%", height: "400px" }} // Adjust the size here
          />
        </div>
      ) : (
        <div>Error loading data. Check the console for details.</div>
      )}
    </div>
  );
};

export default PlotlyGraphs1;
