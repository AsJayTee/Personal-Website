import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { techStackImgs } from '../constants/skills';
import SkillModal from './SkillModal';

gsap.registerPlugin(ScrollTrigger);

const SkillCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modal handlers
  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Animation setup - Inspired by the tech stack animation
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        // Initial values
        y: 50, // Move the cards down by 50px
        opacity: 0, // Set the opacity to 0
      },
      {
        // Final values
        y: 0, // Move the cards back to the top
        opacity: 1, // Set the opacity to 1
        duration: 1, // Duration of the animation
        ease: "power2.inOut", // Ease of the animation
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        force3D: true,  // GPU ACCELERATION OPTIMIZATION
        scrollTrigger: {
          trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
          start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
        },
      }
    );
  }, []);

  return (
    <>
      <div className="tech-grid">
        {/* Loop through the techStackImgs array and create a component for each item */}
        {techStackImgs.map((category, index) => (
          <div
            key={category.name}
            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg cursor-pointer"
            onClick={() => handleCardClick(category)}
          >
            {/* The tech-card-animated-bg div is used to create a background animation when the 
                component is hovered. */}
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
              {/* The tech-icon-wrapper div contains the skill category icon */}
              <div className={`tech-icon-wrapper ${index === 1 ? 'second-icon-adjustment' : ''}`}>
                <img 
                  src={category.iconPath} 
                  alt={category.name}
                  className="w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: 'brightness(0.8)' }}
                />
              </div>
              {/* The padding-x and w-full classes are used to add horizontal padding to the 
                  text and make it take up the full width of the component. */}
              <div className="padding-x w-full skill-text-container">
                {/* The p tag contains the name of the skill category. */}
                <p>{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Modal */}
      <SkillModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </>
  );
};

export default SkillCards;