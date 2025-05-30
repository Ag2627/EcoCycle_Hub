import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf, LogIn } from "lucide-react";
import clsx from "clsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/user/dashboard" className="flex items-center text-green-800 font-bold text-xl">
          <Leaf size={28} className="mr-2" />
          RecycleConnect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-800 hover:text-green-700 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/"
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <LogIn size={18} />
            Logout
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-white transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="pt-20 px-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 text-lg font-medium border-b pb-2 border-gray-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/auth"
            onClick={() => setIsMenuOpen(false)}
            className="bg-green-700 hover:bg-green-800 text-white py-3 rounded flex items-center justify-center gap-2 transition-colors"
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
