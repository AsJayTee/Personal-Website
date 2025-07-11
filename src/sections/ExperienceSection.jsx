import React, { useRef, useEffect } from 'react';
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

  // Set CSS custom properties for theming
  useEffect(() => {
    const root = document.documentElement;
    experiences.forEach((exp, index) => {
      root.style.setProperty(`--theme-primary-${index}`, exp.themeColor);
      root.style.setProperty(`--theme-secondary-${index}`, exp.secondaryColor);
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Function to position nodes relative to their cards
    const updateNodePositions = () => {
      experiences.forEach((_, index) => {
        const cardEl = cardRefs.current[index];
        const nodeEl = nodeRefs.current[index];
        const experienceEl = experienceRefs.current[index];
        
        if (cardEl && nodeEl && experienceEl) {
          // Calculate position based on the experience card container
          // Add the card's offset within its experience container
          const experienceOffsetTop = experienceEl.offsetTop;
          const cardOffsetTop = cardEl.offsetTop;
          const totalOffset = experienceOffsetTop + cardOffsetTop;
          
          // Position node at the top of the actual card content
          nodeEl.style.top = `${totalOffset + 10}px`;
        }
      });
    };

    // Set initial states
    gsap.set(experienceRefs.current, {
      opacity: 0,
      x: 100
    });

    gsap.set(nodeRefs.current, {
      scale: 0,
      opacity: 0
    });

    gsap.set(timelineLineRef.current, {
      scaleY: 0,
      transformOrigin: "top center"
    });

    // Initial positioning after DOM is ready
    const positionTimer = setTimeout(() => {
      updateNodePositions();
    }, 100);

    // Update positions on resize
    const handleResize = () => {
      setTimeout(updateNodePositions, 100);
    };
    window.addEventListener('resize', handleResize);

    // Function to interpolate between colors
    const interpolateColor = (color1, color2, factor) => {
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      const result = {
        r: Math.round(c1.r + factor * (c2.r - c1.r)),
        g: Math.round(c1.g + factor * (c2.g - c1.g)),
        b: Math.round(c1.b + factor * (c2.b - c1.b))
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    // Timeline line animation with dynamic color
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Scale the timeline
        gsap.to(timelineLineRef.current, {
          scaleY: progress,
          duration: 0.3,
          ease: "power2.out"
        });

        // Calculate current color based on progress and node positions
        const totalExperiences = experiences.length;
        let currentColor = experiences[0].themeColor;
        let nextColor = experiences[0].secondaryColor;
        
        // Determine which experience segment we're in
        if (totalExperiences > 1) {
          const progressPercentage = progress * 100;
          
          if (progressPercentage <= 25) {
            // First quarter - start with first experience color
            currentColor = experiences[0].themeColor;
            nextColor = experiences[1] ? experiences[1].themeColor : experiences[0].secondaryColor;
            const segmentProgress = progressPercentage / 25;
            currentColor = interpolateColor(currentColor, nextColor, segmentProgress * 0.3);
          } else if (progressPercentage <= 50 && experiences[1]) {
            // Second quarter - transition to second experience
            currentColor = experiences[0].themeColor;
            nextColor = experiences[1].themeColor;
            const segmentProgress = (progressPercentage - 25) / 25;
            currentColor = interpolateColor(currentColor, nextColor, segmentProgress);
          } else if (progressPercentage <= 75 && experiences[2]) {
            // Third quarter - transition to third experience
            currentColor = experiences[1] ? experiences[1].themeColor : experiences[0].themeColor;
            nextColor = experiences[2].themeColor;
            const segmentProgress = (progressPercentage - 50) / 25;
            currentColor = interpolateColor(currentColor, nextColor, segmentProgress);
          } else {
            // Final quarter - settle on last experience color
            const lastExp = experiences[totalExperiences - 1];
            currentColor = lastExp.themeColor;
            nextColor = lastExp.secondaryColor;
            const segmentProgress = (progressPercentage - 75) / 25;
            currentColor = interpolateColor(currentColor, nextColor, segmentProgress * 0.3);
          }
        }

        // Create dynamic gradient that grows with the timeline
        const gradientStop = Math.max(20, Math.min(80, progress * 100));
        const gradient = `linear-gradient(
          0deg,
          rgba(23, 23, 32, 0) 0%,
          ${currentColor} ${gradientStop}%,
          ${currentColor} ${Math.min(100, gradientStop + 20)}%,
          rgba(23, 23, 32, 0) 100%
        )`;

        // Apply the gradient
        timelineLineRef.current.style.background = gradient;
      }
    });

    // Animate each experience card and node
    experiences.forEach((_, index) => {
      const experienceEl = experienceRefs.current[index];
      const nodeEl = nodeRefs.current[index];

      if (experienceEl && nodeEl) {
        // Node animation with dynamic glow
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top bottom+=100", // Appear slightly before the cards
          onEnter: () => {
            updateNodePositions(); // Ensure correct positioning
            gsap.to(nodeEl, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)"
            });
            
            // Add active glow effect
            nodeEl.style.boxShadow = `0 0 30px ${experiences[index].themeColor}, 0 0 60px ${experiences[index].themeColor}40`;
          },
          onLeaveBack: () => {
            gsap.to(nodeEl, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in"
            });
            
            // Remove glow effect
            nodeEl.style.boxShadow = `0 0 20px ${experiences[index].themeColor}`;
          }
        });

        // Experience card animation
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top bottom-=100",
          onEnter: () => {
            gsap.to(experienceEl, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2
            });
          },
          onLeaveBack: () => {
            gsap.to(experienceEl, {
              opacity: 0,
              x: 100,
              duration: 0.4,
              ease: "power2.in"
            });
          }
        });
      }
    });

    // Cleanup
    return () => {
      clearTimeout(positionTimer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current || 
            experienceRefs.current.includes(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const getNodePosition = (index) => {
    // Calculate position of each node along the timeline
    const totalExperiences = experiences.length;
    const spacing = 100 / (totalExperiences + 1);
    return `${spacing * (index + 1)}%`;
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="w-full md:mt-10 mt-10 px-5 md:px-20 py-10 md:py-20"
    >
      <div className="w-full overflow-hidden">
        <TitleHeader
          title={"Professional Work Experience"}
          sub={"Things I did 💼"}
        />
        
        <div className="mt-32 relative timeline-container" style={{ minHeight: '100vh' }}>
          {/* Timeline */}
          <div ref={timelineRef} className="timeline-wrapper">
            <div 
              ref={timelineLineRef}
              className="timeline-line"
            />
            
            {/* Timeline Nodes */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={el => nodeRefs.current[index] = el}
                className="timeline-node"
                style={{
                  '--node-color': exp.themeColor
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
                style={{
                  marginTop: index === 0 ? '0' : '8rem'
                }}
              >
                <div 
                  ref={el => cardRefs.current[index] = el}
                  className="experience-card-content"
                  style={{
                    '--theme-primary': exp.themeColor,
                    '--theme-secondary': exp.secondaryColor
                  }}
                >
                  {/* Header */}
                  <div className="experience-header">
                    <div>
                      <div className="company-badge">
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