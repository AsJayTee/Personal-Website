import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { techStackImgs } from '../constants/skills';

const SkillsCarousel = () => {
  const [shuffledSkills, setShuffledSkills] = useState([]);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  // Extract and shuffle all skills from all categories
  useEffect(() => {
    const allSkills = techStackImgs.flatMap(category => 
      category.skills.map(skill => ({
        ...skill,
        category: category.name
      }))
    );

    // Fisher-Yates shuffle algorithm
    const shuffled = [...allSkills];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Duplicate the array for seamless infinite scroll
    setShuffledSkills([...shuffled, ...shuffled]);
  }, []);

  // GSAP animation for infinite scroll
  useGSAP(() => {
    if (!carouselRef.current || shuffledSkills.length === 0) return;

    const carousel = carouselRef.current;
    const totalWidth = carousel.scrollWidth / 2; // Half because we duplicated

    // Create the animation
    animationRef.current = gsap.to(carousel, {
      x: -totalWidth,
      duration: 60, // Adjust speed here
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [shuffledSkills]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return (
    <div className="skills-carousel-container">
      {/* Left fade gradient */}
      <div className="carousel-fade-left" />
      
      {/* Carousel wrapper */}
      <div className="carousel-wrapper">
        <div ref={carouselRef} className="carousel-track">
          {shuffledSkills.map((skill, index) => (
            <div
              key={`${skill.skillName}-${index}`}
              className="skill-logo-wrapper"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Logo */}
              <div className="skill-logo">
                {skill.imagePath && skill.imagePath !== "" ? (
                  <img 
                    src={skill.imagePath} 
                    alt={skill.skillName}
                    className="skill-image"
                  />
                ) : (
                  <div className="skill-fallback">
                    {skill.skillName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right fade gradient */}
      <div className="carousel-fade-right" />
    </div>
  );
};

export default SkillsCarousel;