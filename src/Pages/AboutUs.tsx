import backgroundImg from "./Digitaltwin.webp"; // Replace with the actual path to your background image
import aboutUsContent from "./AboutUsContent";
import "./AboutUs.css"; // Import the CSS file

interface Section {
  sectionTitle: string;
  subsectionTitle: string;
  content: string[];
}
const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

function AboutUs() {
  return (
    <div>
      <div className="hero">
        <h1>About Us</h1>
      </div>
      {aboutUsContent.map((section: Section, index: number) => (
        <section key={index}>
          <h2>{section.sectionTitle}</h2>
          <p>
            <strong>{section.subsectionTitle}</strong>
          </p>
          {section.content.map((paragraph: string, pIndex: number) => (
            <p key={pIndex}>{paragraph}</p>
          ))}
        </section>
      ))}
      {/* Your content goes here */}
    </div>
  );
}

export default AboutUs;
