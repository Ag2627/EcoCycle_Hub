import { Trash2, Map, Brain, Award, Recycle, Users } from "lucide-react";

const featuresData = [
  {
    icon: Trash2,
    title: "Report Waste Issues",
    description: "Quickly report garbage collection problems with photo uploads and location tagging for faster resolution.",
  },
  {
    icon: Map,
    title: "Locate Recycling Centers",
    description: "Find the nearest recycling facilities based on your location and specific waste type needs.",
  },
  {
    icon: Brain,
    title: "AI Waste Sorting Guide",
    description: "Upload photos of waste items to receive instant AI-powered guidance on proper disposal methods.",
  },
  {
    icon: Award,
    title: "Earn Recycling Rewards",
    description: "Get points for sustainable actions that can be redeemed for discounts and eco-friendly products.",
  },
  {
    icon: Recycle,
    title: "Track Your Impact",
    description: "Monitor your environmental contributions and see the collective difference your community is making.",
  },
  {
    icon: Users,
    title: "NGO & Community Collaboration",
    description: "Connect with local environmental organizations and participate in community cleanup initiatives.",
  }
];

const Features = () => {
  return (
    <section id="features" style={{ padding: "80px 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 64px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#2a9d8f" }}>
            Features Designed for Sustainable Communities
          </h2>
          <p style={{ color: "#555", fontSize: "18px" }}>
            Our platform provides all the tools you need to participate in creating cleaner, greener neighborhoods while earning rewards.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: "white", 
                borderRadius: "12px", 
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                padding: "24px", 
                border: "1px solid #ddd",
                transition: "all 0.3s ease",
                textAlign: "center"
              }}
            >
              <div style={{ 
                width: "48px", 
                height: "48px", 
                borderRadius: "8px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: "16px",
                backgroundColor: "#2a9d8f",
                color: "white"
              }}>
                <feature.icon size={24} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>{feature.title}</h3>
              <p style={{ color: "#555" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
