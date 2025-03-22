import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf, LogIn } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Report Waste", path: "/waste-report" },
    { name: "Find Centers", path: "/recycling-centers" },
    { name: "Waste Guide", path: "/waste-sorting" },
    { name: "Rewards", path: "/rewards" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
        padding: isScrolled ? "12px 0" : "20px 0",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/user/dashboard" style={{ display: "flex", alignItems: "center", color: "#1B5E20", fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}>
          <Leaf size={28} style={{ marginRight: "8px" }} />
          RecycleConnect
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: "none", alignItems: "center", gap: "24px" }} className="desktop-menu">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{ color: "#333", textDecoration: "none", fontSize: "16px", fontWeight: "500" }}>
              {link.name}
            </Link>
          ))}
          <Link to="/" style={{ backgroundColor: "#1B5E20", color: "#fff", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <LogIn size={18} />
            Logout
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: "block", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
          className="mobile-menu-button"
        >
          {isMenuOpen ? <X size={24} style={{ color: "#333" }} /> : <Menu size={24} style={{ color: "#333" }} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        style={{
          position: "fixed",
          inset: "0",
          zIndex: 40,
          backgroundColor: "#fff",
          paddingTop: "80px",
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{ fontSize: "20px", fontWeight: "500", color: "#333", textDecoration: "none", paddingBottom: "8px", borderBottom: "1px solid #eee" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/auth"
            style={{ backgroundColor: "#1B5E20", color: "#fff", padding: "12px", borderRadius: "4px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn size={20} />
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
