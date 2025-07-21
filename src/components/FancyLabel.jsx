import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const FancyLabel = ({ text = "Professional Collaboration", position = "top-right" }) => {
  const labelRef = useRef(null);
  const shimmerRef = useRef(null);
  const iconRef = useRef(null);

  // Position classes mapping
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  useGSAP(() => {
    // Initial setup
    gsap.set(labelRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -20
    });

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(labelRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    // Continuous shimmer effect
    gsap.to(shimmerRef.current, {
      x: "300%",
      duration: 3,
      repeat: -1,
      ease: "power2.inOut"
    });

    // Icon rotation
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Hover animation setup
    const labelEl = labelRef.current;
    
    labelEl.addEventListener('mouseenter', () => {
      gsap.to(labelEl, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    labelEl.addEventListener('mouseleave', () => {
      gsap.to(labelEl, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <div 
      ref={labelRef}
      className={`absolute ${positionClasses[position]} z-10 group cursor-default`}
    >
      <div className="relative overflow-hidden rounded-full">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7209b7]/20 to-[#43ccf7]/20 backdrop-blur-md rounded-full" />
        
        {/* Border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7209b7] to-[#43ccf7] rounded-full p-[1px]">
          <div className="w-full h-full bg-[#171720]/80 rounded-full" />
        </div>

        {/* Content container */}
        <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 z-10">
          {/* Icon */}
          <div className="relative w-5 h-5 md:w-6 md:h-6">
            <svg 
              ref={iconRef}
              className="w-full h-full text-[#43ccf7]"
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M5 5L6 8L9 9L6 10L5 13L4 10L1 9L4 8L5 5Z" 
                fill="currentColor"
                opacity="0.5"
              />
              <path 
                d="M19 5L20 8L23 9L20 10L19 13L18 10L15 9L18 8L19 5Z" 
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Text */}
          <span className="text-[#d9ecff] text-xs md:text-sm font-semibold whitespace-nowrap select-none">
            {text}
          </span>
        </div>

        {/* Shimmer effect - now properly contained by the rounded overflow-hidden parent */}
        <div 
          ref={shimmerRef}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full pointer-events-none"
        />

        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7209b7]/20 to-[#43ccf7]/20 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default FancyLabel;