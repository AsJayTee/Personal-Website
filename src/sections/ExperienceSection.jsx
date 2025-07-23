import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TitleHeader from '../components/TitleHeader';
import { experiences } from '../constants/experiences';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const experienceRefs = useRef([]);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);
  const [nodePositions, setNodePositions] = useState([]);

  // Set CSS custom properties for theming
  useEffect(() => {
    const root = document.documentElement;
    experiences.forEach((exp, index) => {
      root.style.setProperty(`--theme-primary-${index}`, exp.themeColor);
      root.style.setProperty(`--theme-secondary-${index}`, exp.secondaryColor);
    });
  }, []);

  // Calculate and cache node positions
  useEffect(() => {
    const calculateNodePositions = () => {
      const positions = [];
      experiences.forEach((_, index) => {
        const cardEl = cardRefs.current[index];
        const experienceEl = experienceRefs.current[index];
        
        if (cardEl && experienceEl) {
          const experienceOffsetTop = experienceEl.offsetTop;
          const cardOffsetTop = cardEl.offsetTop;
          const totalOffset = experienceOffsetTop + cardOffsetTop + 10;
          positions.push(totalOffset);
        }
      });
      setNodePositions(positions);
    };

    // Initial calculation after DOM is ready
    const timer = setTimeout(calculateNodePositions, 100);

    // Recalculate on resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateNodePositions, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Position nodes based on cached positions
  useEffect(() => {
    nodePositions.forEach((position, index) => {
      const nodeEl = nodeRefs.current[index];
      if (nodeEl) {
        nodeEl.style.top = `${position}px`;
      }
    });
  }, [nodePositions]);

  // Set up Intersection Observers for immediate visual feedback
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -15% 0px', // Balanced margins for better exit/enter timing
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = experienceRefs.current.findIndex(ref => ref === entry.target);
        if (index !== -1) {
          const node = nodeRefs.current[index];
          
          if (entry.isIntersecting) {
            // Element is entering viewport
            entry.target.setAttribute('data-visible', 'true');
            if (node) {
              node.setAttribute('data-visible', 'true');
              // Add glow effect after transition
              setTimeout(() => {
                node.style.boxShadow = `0 0 30px ${experiences[index].themeColor}, 0 0 60px ${experiences[index].themeColor}40`;
              }, 300);
            }
          } else {
            // Element is leaving viewport
            entry.target.setAttribute('data-visible', 'false');
            if (node) {
              node.setAttribute('data-visible', 'false');
              // Reset glow effect
              node.style.boxShadow = `0 0 20px ${experiences[index].themeColor}`;
            }
          }
        }
      });
    }, observerOptions);

    // Observe all experience cards
    experienceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Timeline animation with optimized color interpolation
  useGSAP(() => {
    // Helper function to interpolate between colors
    const interpolateColor = (color1, color2, factor) => {
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };

      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      const result = {
        r: Math.round(c1.r + factor * (c2.r - c1.r)),
        g: Math.round(c1.g + factor * (c2.g - c1.g)),
        b: Math.round(c1.b + factor * (c2.b - c1.b))
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    // Pre-calculate color stops for better performance
    const colorStops = experiences.map((exp, index) => ({
      position: index / (experiences.length - 1),
      color: exp.themeColor,
      secondary: exp.secondaryColor
    }));

    // Timeline animation - only handles the line growth and color
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Animate timeline scale
        gsap.to(timelineLineRef.current, {
          scaleY: progress,
          duration: 0.1,
          ease: "none"
        });

        // Calculate current color based on progress
        let currentColor = experiences[0].themeColor;
        
        // Find which color segment we're in
        for (let i = 0; i < colorStops.length - 1; i++) {
          const start = colorStops[i].position;
          const end = colorStops[i + 1].position;
          
          if (progress >= start && progress <= end) {
            const segmentProgress = (progress - start) / (end - start);
            currentColor = interpolateColor(
              colorStops[i].color,
              colorStops[i + 1].color,
              segmentProgress
            );
            break;
          }
        }

        // Apply gradient with current color
        const gradientStop = Math.max(20, Math.min(80, progress * 100));
        const gradient = `linear-gradient(
          0deg,
          rgba(23, 23, 32, 0) 0%,
          ${currentColor} ${gradientStop}%,
          ${currentColor} ${Math.min(100, gradientStop + 20)}%,
          rgba(23, 23, 32, 0) 100%
        )`;

        timelineLineRef.current.style.background = gradient;
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="w-full md:mt-10 mt-10 px-5 md:px-20 py-10 md:py-20"
    >
      <div className="w-full">
        <TitleHeader
          title={"Professional Work Experience"}
          sub={"Things I Did 💼"}
        />
        
        <div className="mt-32 relative timeline-container" style={{ minHeight: '100vh' }}>
          {/* Timeline */}
          <div ref={timelineRef} className="timeline-wrapper">
            <div 
              ref={timelineLineRef}
              className="timeline-line"
              style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
            />
            
            {/* Timeline Nodes */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={el => nodeRefs.current[index] = el}
                className="timeline-node"
                data-visible="false"
                style={{
                  '--node-color': exp.themeColor,
                  boxShadow: `0 0 20px ${exp.themeColor}`
                }}
              >
                <img 
                  src={exp.logoPath} 
                  alt={exp.companyName}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>

          {/* Experience Content */}
          <div className="experience-content relative z-20">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={el => experienceRefs.current[index] = el}
                className="experience-card"
                data-visible="false"
                style={{
                  marginTop: index === 0 ? '0' : '8rem'
                }}
              >
                <div 
                  ref={el => cardRefs.current[index] = el}
                  className="experience-card-content lg:ml-8"
                  style={{
                    '--theme-primary': exp.themeColor,
                    '--theme-secondary': exp.secondaryColor
                  }}
                >
                  {/* Header */}
                  <div className="experience-header">
                    <div>
                      <div className="company-badge mb-4">
                        {exp.companyName}
                      </div>
                      <h3 className="experience-title">{exp.title}</h3>
                      <p className="experience-date">📅 {exp.date}</p>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="responsibilities-section">
                    <h4 className="responsibilities-title">Key Responsibilities</h4>
                    <ul className="responsibilities-list">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="responsibility-item">
                          <div className="responsibility-bullet" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="achievements-section">
                      <h4 className="achievements-title">Key Achievements</h4>
                      <ul className="achievements-list">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="achievement-item">
                            <svg 
                              className="achievement-icon" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;