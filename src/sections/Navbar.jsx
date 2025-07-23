import { useState, useEffect, useLayoutEffect } from "react";
import { navLinks } from "../constants/navLinks";

const Navbar = () => {
  // Initialize scrolled state based on current scroll position
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 10;
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enableTransitions, setEnableTransitions] = useState(false);
  
  // Use useLayoutEffect to run before paint
  useLayoutEffect(() => {
    // Set initial scroll state immediately
    const isScrolled = window.scrollY > 10;
    setScrolled(isScrolled);
    
    // Enable transitions after a short delay
    const timer = setTimeout(() => {
      setEnableTransitions(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Enable transitions on first scroll if not already enabled
      if (!enableTransitions) {
        setEnableTransitions(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enableTransitions]);

  // Function to scroll to top smoothly
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <header 
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
      style={{
        transition: enableTransitions ? 'all 0.3s ease-in-out' : 'none'
      }}
    >
      <div className="inner">
        <a href="#" onClick={scrollToTop} className="logo">
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