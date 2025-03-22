import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      {/* Background pattern */}
      <div className="background-pattern"></div>
      
      {/* Green blob */}
      <div className="green-blob"></div>
      
      {/* Blue blob */}
      <div className="blue-blob"></div>

      <div className="container">
        <div className="content">
          <div className="tagline">Connecting communities for cleaner environments</div>

          <h1 className="hero-title">
            Revolutionizing Waste Management Through Community Action
          </h1>

          <p className="hero-description">
            Report collection issues, locate recycling centers, get AI-powered waste sorting
            guidance, and earn rewards for sustainable actions.
          </p>

          <div className="button-group">
            <Link to="/waste-report" className="primary-button">
              <span>Report Waste</span>
              <ArrowRight size={18} className="icon" />
            </Link>
            <Link to="/recycling-centers" className="secondary-button">
              <span>Find Recycling Centers</span>
              <ArrowRight size={18} className="icon" />
            </Link>
          </div>

          <button onClick={scrollToFeatures} className="scroll-button" aria-label="Scroll to features">
            <span className="scroll-text">Discover More</span>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
