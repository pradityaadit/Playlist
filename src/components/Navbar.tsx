import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Home, Info, Menu, X } from "lucide-react";

interface NavbarProps {
  setCurrentSection: (section: string) => void;
  currentSection: string;
}

const Navbar: React.FC<NavbarProps> = ({
  setCurrentSection,
  currentSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <Info size={18} /> },
    { id: "music", label: "Music", icon: <Music size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary-950/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="text-gold-400 text-2xl font-serif font-bold tracking-wider cursor-pointer"
            onClick={() => setCurrentSection("home")}
          >
            Harmonia
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => setCurrentSection(link.id)}
              className={`flex items-center space-x-2 font-medium text-sm ${
                currentSection === link.id
                  ? "text-gold-400"
                  : "text-white/80 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              <span>{link.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-secondary-950/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => {
                  setCurrentSection(link.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 py-2 px-4 rounded-md ${
                  currentSection === link.id
                    ? "text-gold-400 bg-secondary-900"
                    : "text-white/80 hover:text-white hover:bg-secondary-900/50"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
