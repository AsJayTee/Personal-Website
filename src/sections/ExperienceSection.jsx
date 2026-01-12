import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import TitleHeader from '../components/TitleHeader';
import ExperienceModal from '../components/ExperienceModal';
import { experiences } from '../constants/experiences';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const experienceRefs = useRef([]);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);
  
  // Track which nodes have been revealed (permanent visibility)
  const revealedNodes = useRef(new Set());
  
  // Track maximum scroll progress (high water mark)
  const maxProgressRef = useRef(0);
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  
  // Mobile detection
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Pre-compute the gradient CSS string once
  const gradientColors = useMemo(() => {
    return experiences.map((exp, index) => {
      const position = (index / (experiences.length - 1)) * 100;
      return `${exp.themeColor} ${position}%`;
    }).join(', ');
  }, []);

  // Modal handlers
  const handleExperienceClick = (experience) => {
    if (isMobile) {
      setSelectedExperience(experience);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  // Set CSS custom properties for theming - ONCE on mount
  useEffect(() => {
    const root = document.documentElement;
    experiences.forEach((exp, index) => {
      root.style.setProperty(`--theme-primary-${index}`, exp.themeColor);
      root.style.setProperty(`--theme-secondary-${index}`, exp.secondaryColor);
    });
    root.style.setProperty('--timeline-gradient', gradientColors);
  }, [gradientColors]);

  // Calculate and set node positions
  useEffect(() => {
    const positionNodes = () => {
      experiences.forEach((_, index) => {
        const cardEl = cardRefs.current[index];
        const experienceEl = experienceRefs.current[index];
        const nodeEl = nodeRefs.current[index];
        
        if (cardEl && experienceEl && nodeEl) {
          const totalOffset = experienceEl.offsetTop + cardEl.offsetTop + 10;
          nodeEl.style.top = `${totalOffset}px`;
        }
      });
    };

    requestAnimationFrame(positionNodes);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(positionNodes, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Intersection Observer - nodes stay visible permanently once revealed
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -15% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = experienceRefs.current.findIndex(ref => ref === entry.target);
        if (index === -1) return;
        
        const node = nodeRefs.current[index];
        
        if (entry.isIntersecting) {
          revealedNodes.current.add(index);
          
          requestAnimationFrame(() => {
            entry.target.setAttribute('data-visible', 'true');
            if (node) {
              node.setAttribute('data-visible', 'true');
            }
          });
        } else if (!revealedNodes.current.has(index)) {
          // Only hide if never revealed before
          requestAnimationFrame(() => {
            entry.target.setAttribute('data-visible', 'false');
            if (node) {
              node.setAttribute('data-visible', 'false');
            }
          });
        }
      });
    }, observerOptions);

    experienceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Optimized timeline animation - only updates on forward progress
  useGSAP(() => {
    if (!timelineLineRef.current || !sectionRef.current) return;

    const setProgress = gsap.quickSetter(timelineLineRef.current, '--scroll-progress');
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
      onUpdate: (self) => {
        const currentProgress = self.progress;
        
        // Only update if we've scrolled further than before
        if (currentProgress > maxProgressRef.current) {
          maxProgressRef.current = currentProgress;
          setProgress(currentProgress);
        }
        // On scroll-up: do nothing - timeline stays at max
      }
    });

    return () => trigger.kill();
  }, []);

  // Render mobile card
  const renderMobileCard = (exp, index) => (
    <div
      ref={el => cardRefs.current[index] = el}
      className="experience-card-mobile"
      onClick={() => handleExperienceClick(exp)}
      style={{
        '--theme-primary': exp.themeColor,
        '--theme-secondary': exp.secondaryColor
      }}
    >
      <div 
        className="company-badge-mobile"
        style={{
          background: `linear-gradient(135deg, ${exp.themeColor}, ${exp.secondaryColor})`
        }}
      >
        {exp.companyName}
      </div>
      <h3 className="role-title-mobile">{exp.title}</h3>
      <p className="date-mobile">📅 {exp.date}</p>
      <div className="show-more-indicator">
        <span>Tap for details</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  // Render desktop card
  const renderDesktopCard = (exp, index) => (
    <div 
      ref={el => cardRefs.current[index] = el}
      className="experience-card-content lg:ml-8"
      style={{
        '--theme-primary': exp.themeColor,
        '--theme-secondary': exp.secondaryColor
      }}
    >
      <div className="experience-header">
        <div>
          <div className="company-badge mb-4">
            {exp.companyName}
          </div>
          <h3 className="experience-title">{exp.title}</h3>
          <p className="experience-date">📅 {exp.date}</p>
        </div>
      </div>

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
  );

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="w-full md:mt-10 mt-10 px-5 md:px-20 pt-10 md:pt-20 pb-5 md:pb-10"
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
              className="timeline-line-optimized"
              style={{ '--scroll-progress': 0 }}
            />
            
            {/* Timeline Nodes */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={el => nodeRefs.current[index] = el}
                className="timeline-node"
                data-visible="false"
                style={{ '--node-color': exp.themeColor }}
              >
                <img 
                  src={exp.logoPath} 
                  alt={exp.companyName}
                  className="rounded-full"
                  loading="lazy"
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
                style={{ marginTop: index === 0 ? '0' : '8rem' }}
              >
                {isMobile ? renderMobileCard(exp, index) : renderDesktopCard(exp, index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExperienceModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        experience={selectedExperience}
      />
    </section>
  );
};

export default ExperienceSection;