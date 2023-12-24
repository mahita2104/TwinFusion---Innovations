import "./Simulator.css";
import backgroundImg from "./Digitaltwin.webp";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Simulator = () => {
  return (
    <div className="app" style={backgroundStyle}>
      <h1 className="header">Simulator</h1>
      <div className="box">
        <button className="button">Button 1</button>
        <button className="button">Button 2</button>
      </div>
      <div className="box">
        <button className="button">Button 3</button>
        <button className="button">Button 4</button>
      </div>
    </div>
  );
};

export default Simulator;
