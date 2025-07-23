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

  // Mobile click animation handler
  const handleMobileClick = (e) => {
    // Only apply on mobile/touch devices
    if (window.innerWidth <= 1024) {
      const target = e.currentTarget;
      target.style.transform = 'scale(0.95)';
      target.style.opacity = '0.8';
      
      setTimeout(() => {
        target.style.transform = 'scale(1)';
        target.style.opacity = '1';
      }, 150);
    }
  };

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
        <a 
          href="#" 
          onClick={scrollToTop} 
          onTouchStart={handleMobileClick}
          className="logo"
        >
          Siah Jin Thau
        </a>
        
        {/* Desktop Navigation - Hidden on mobile */}
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
        
        {/* Contact button */}
        <a 
          href="#contact" 
          className="contact-btn"
          onTouchStart={handleMobileClick}
        >
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;