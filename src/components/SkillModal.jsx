import React from 'react';
import Modal from './Modal';

const SkillModal = ({ isOpen, onClose, category }) => {
  if (!category) return null;

  // Helper function to generate fallback logos from skill names
  const generateFallbackLogo = (skillName) => {
    // Get initials (first 1-2 characters)
    const words = skillName.split(' ');
    let initials;
    
    if (words.length > 1) {
      // Multi-word: take first letter of first two words
      initials = words.slice(0, 2).map(word => word[0]).join('');
    } else {
      // Single word: take first 1-2 characters
      initials = skillName.slice(0, 2);
    }
    
    return initials.toUpperCase();
  };

  // Helper function to get logo colors based on category
  const getLogoColors = (categoryName, index) => {
    const colorSchemes = {
      'Programming Languages': {
        bg: 'from-blue-500 to-purple-600',
        text: 'text-white'
      },
      'Data Science & AI': {
        bg: 'from-green-500 to-emerald-600', 
        text: 'text-white'
      },
      'Web Development': {
        bg: 'from-orange-500 to-red-600',
        text: 'text-white'
      },
      'Database Infrastructure': {
        bg: 'from-indigo-500 to-blue-600',
        text: 'text-white'
      },
      'Cloud & Deployment': {
        bg: 'from-purple-500 to-pink-600',
        text: 'text-white'
      }
    };

    // Fallback gradient if category not found
    const fallback = {
      bg: 'from-gray-500 to-gray-700',
      text: 'text-white'
    };

    return colorSchemes[categoryName] || fallback;
  };

  const categoryColors = getLogoColors(category.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category.name}
      size="large"
      className="skill-modal"
    >
      <div>
        {/* Skills Grid */}
        <div className="skills-logo-grid">
          {category.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-logo-item group"
            >
              {/* Logo Container */}
              <div className="skill-logo-container">
                {skill.imagePath && skill.imagePath !== "" ? (
                  // Real logo if available
                  <img 
                    src={skill.imagePath} 
                    alt={skill.skillName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  // Fallback text-based logo
                  <div className={`skill-fallback-logo bg-gradient-to-br ${categoryColors.bg} ${categoryColors.text}`}>
                    {generateFallbackLogo(skill.skillName)}
                  </div>
                )}
              </div>

              {/* Skill Name Overlay - Hidden by default, shown on hover */}
              <div className="skill-name-overlay">
                <span className="skill-name-text">
                  {skill.skillName}
                </span>
              </div>

              {/* Hover Glow Effect */}
              <div className="skill-hover-glow" />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SkillModal;