import { useState, useEffect } from "react";
import { navLinks } from "../constants/navLinks";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo">
          Siah Jin Thau
        </a>
        
        <button 
          className="lg:hidden flex items-center text-white-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden pt-20 bg-black">
            <nav className="container mx-auto px-5">
              <ul className="flex flex-col space-y-6">
                {navLinks.map(({ link, name }) => (
                  <li key={name} className="text-xl">
                    <a 
                      href={link} 
                      className="text-white-50 hover:text-white transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {name}
                    </a>
                  </li>
                ))}
                <li className="pt-6 border-t border-black-50">
                  <a 
                    href="#contact" 
                    className="text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact me
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
        
        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;