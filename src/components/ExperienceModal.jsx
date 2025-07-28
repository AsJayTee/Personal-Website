import React from 'react';
import Modal from './Modal';

const ExperienceModal = ({ isOpen, onClose, experience }) => {
  if (!experience) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={experience.title}
      size="large"
      className="experience-modal"
    >
      <div className="space-y-6">
        {/* Company and Date Info */}
        <div className="border-b border-[#333333] pb-4">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={experience.logoPath} 
              alt={experience.companyName}
              className="w-12 h-12 rounded-full object-contain"
            />
            <div>
              <div 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-1"
                style={{
                  background: `linear-gradient(135deg, ${experience.themeColor}, ${experience.secondaryColor})`
                }}
              >
                {experience.companyName}
              </div>
              <p className="text-[#d9ecff] text-sm">📅 {experience.date}</p>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Key Responsibilities
          </h3>
          <ul className="space-y-2">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start text-[#d9ecff]">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                  style={{ backgroundColor: experience.themeColor }}
                />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="pt-4 border-t border-[#333333]">
            <h3 className="text-lg font-semibold text-white mb-3">
              Key Achievements
            </h3>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start text-[#d9ecff]">
                  <svg 
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    style={{ color: experience.themeColor }}
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
    </Modal>
  );
};

export default ExperienceModal;