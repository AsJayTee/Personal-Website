import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  // Social media links
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/siahjinthau/", 
      icon: "/images/footer/linkedin.png"
    },
    {
      name: "GitHub", 
      url: "https://github.com/AsJayTee", 
      icon: "/images/footer/github.png"
    },
    {
      name: "Email",
      url: "mailto:jinthauofficial@gmail.com", 
      icon: "/images/footer/email.png"
    }
  ];

  // Detect portrait tablet viewport
  const isPortraitTablet = useMediaQuery({ 
    query: "(min-width: 769px) and (max-width: 1279px) and (orientation: portrait)" 
  });

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left - Attribution */}
        <div className="flex flex-col justify-center">
          <Link to="/attributions" className="text-white-50 hover:text-white transition-colors duration-300">
            Attributions
          </Link>
        </div>
        
        {/* Middle - Social Icons */}
        <div className="socials">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label={`Visit my ${social.name}`}
            >
              <img 
                src={social.icon} 
                alt={social.name}
                className="w-5 h-5 object-contain"
              />
            </a>
          ))}
        </div>
        
        {/* Right - Copyright and Back to Top */}
        <div className="flex items-center justify-center md:justify-end gap-4">
          <p className="text-center md:text-end text-white-50">
            {isPortraitTablet ? (
              <>
                © {new Date().getFullYear()} Siah Jin Thau.<br />
                All rights reserved.
              </>
            ) : (
              <>© {new Date().getFullYear()} Siah Jin Thau. All rights reserved.</>
            )}
          </p>
          <button 
            onClick={scrollToTop}
            className="icon back-to-top"
            aria-label="Back to top"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 14l5-5 5 5" 
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;