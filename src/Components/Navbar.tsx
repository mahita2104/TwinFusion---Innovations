import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    backgroundColor: "#3b3b39",
    padding: "10px 0", // Increase the navbar height
  };

  const linkStyle = {
    color: "#e5510d",
    fontFamily: "Times New Roman, sans-serif", // Set font to Times New Roman
    fontSize: "1.2rem", // Increase text size a bit
  };

  const brandStyle = {
    color: "white",
    fontFamily: "Times New Roman, sans-serif", // Set font to Times New Roman
    fontSize: "1.5rem", // Increase brand text size a bit
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={brandStyle}>
          TwinFusion Innovations
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about-us" className="nav-link" style={linkStyle}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/technology" className="nav-link" style={linkStyle}>
                Technology
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/CaseStudy" className="nav-link" style={linkStyle}>
                Case Study
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link" style={linkStyle}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Simulator" className="nav-link" style={linkStyle}>
                Simulator
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                backgroundColor: "black",
                color: "#e5510d",
                fontFamily: "Times New Roman, sans-serif",
              }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{
                color: "#e5510d",
                backgroundColor: "black",
                borderColor: "#e5510d",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
