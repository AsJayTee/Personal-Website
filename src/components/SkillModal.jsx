import React from 'react';
import Modal from './Modal';

const SkillModal = ({ isOpen, onClose, category }) => {
  if (!category) return null;

  // Get proficiency level indicator (you can customize this logic)
  const getProficiencyLevel = (skill) => {
    // This is a simple example - you could enhance this with actual proficiency data
    const experiencedSkills = ['Python', 'JavaScript', 'React', 'NumPy', 'Pandas', 'scikit-learn', 'PostgreSQL', 'Git'];
    const intermediateSkills = ['TensorFlow', 'Keras', 'AWS', 'Google Cloud Platform', 'Flask', 'FastAPI'];
    
    if (experiencedSkills.includes(skill.skillName)) return 'experienced';
    if (intermediateSkills.includes(skill.skillName)) return 'intermediate';
    return 'familiar';
  };

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'experienced': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'familiar': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProficiencyText = (level) => {
    switch (level) {
      case 'experienced': return 'Expert';
      case 'intermediate': return 'Intermediate';
      case 'familiar': return 'Familiar';
      default: return 'Learning';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category.name}
      size="large"
      className="skill-modal"
    >
      <div className="space-y-6">
        {/* Category Description */}
        <div className="flex items-center gap-4 p-4 bg-[#333333]/30 rounded-lg">
          <div className="p-3 rounded-full bg-[#43ccf7]/20">
            <img 
              src={category.iconPath} 
              alt={category.name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {category.skills.length} Skills in {category.name}
            </h3>
            <p className="text-[#d9ecff] text-sm">
              Technologies and tools I work with in this domain
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Technical Skills
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.skills.map((skill, index) => {
              const proficiencyLevel = getProficiencyLevel(skill);
              const proficiencyColor = getProficiencyColor(proficiencyLevel);
              const proficiencyText = getProficiencyText(proficiencyLevel);

              return (
                <div
                  key={index}
                  className="group relative p-4 bg-[#333333]/20 border border-[#333333] rounded-lg hover:border-[#43ccf7]/50 transition-all duration-300 hover:bg-[#43ccf7]/5"
                >
                  {/* Skill Name */}
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-white group-hover:text-[#43ccf7] transition-colors duration-300">
                      {skill.skillName}
                    </h5>
                    
                    {/* Proficiency Badge */}
                    <span className={`px-2 py-1 text-xs rounded-full border ${proficiencyColor} transition-all duration-300`}>
                      {proficiencyText}
                    </span>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="w-full bg-[#333333] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        proficiencyLevel === 'experienced' ? 'w-5/6 bg-green-500' :
                        proficiencyLevel === 'intermediate' ? 'w-3/5 bg-blue-500' :
                        'w-2/5 bg-yellow-500'
                      }`}
                    />
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#43ccf7]/30 transition-colors duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience Level Summary */}
        <div className="mt-6 p-4 bg-[#333333]/20 rounded-lg border border-[#333333]">
          <h4 className="text-sm font-semibold text-[#d9ecff] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Experience Level Breakdown
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-green-400 font-bold text-lg">
                {category.skills.filter(skill => getProficiencyLevel(skill) === 'experienced').length}
              </div>
              <div className="text-green-400/80 text-sm">Expert</div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-blue-400 font-bold text-lg">
                {category.skills.filter(skill => getProficiencyLevel(skill) === 'intermediate').length}
              </div>
              <div className="text-blue-400/80 text-sm">Intermediate</div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-yellow-400 font-bold text-lg">
                {category.skills.filter(skill => getProficiencyLevel(skill) === 'familiar').length}
              </div>
              <div className="text-yellow-400/80 text-sm">Familiar</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SkillModal;